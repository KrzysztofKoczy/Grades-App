import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Grade, GradeCreate, GradeModify } from '../../../shared/models/grade.model';
import { GradesClient } from './grades-client';

describe('GradesClient', () => {
  let service: GradesClient;
  let httpMock: HttpTestingController;

  const apiUrl = '/api/grades';
  const mockGrades: Grade[] = [
    { id: 'id1', minPercentage: 0, symbolicGrade: 'F' },
    { id: 'id2', minPercentage: 50, symbolicGrade: 'D', descriptiveGrade: 'Pass' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GradesClient],
    });
    service = TestBed.inject(GradesClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should grades array by empty on initialization', () => {
    expect(service.grades()).toEqual([]);
  });

  describe('getGrades', () => {
    it('should fetch grades', () => {
      service.getGrades().subscribe(grades => expect(grades).toEqual(mockGrades));

      const req = httpMock.expectOne(apiUrl);

      expect(req.request.method).toBe('GET');

      req.flush(mockGrades);

      expect(service.grades()).toEqual(mockGrades);
    });
  });

  describe('createGrade', () => {
    it('should create a grade and then refresh grades', fakeAsync(() => {
      const newGradeData: GradeCreate = { minPercentage: 90, symbolicGrade: 'A' };
      const createdGrade: Grade = { id: 'id3', ...newGradeData };
      
      let responseGrade: Grade | undefined;

      service.createGrade(newGradeData).subscribe(grade => {
        responseGrade = grade;
      });

      const createReq = httpMock.expectOne(apiUrl);

      expect(createReq.request.method).toBe('POST');
      expect(createReq.request.body).toEqual(newGradeData);

      createReq.flush(createdGrade);

      expect(responseGrade).toEqual(createdGrade);

      tick(300); 

      const refreshReq = httpMock.expectOne(apiUrl);

      expect(refreshReq.request.method).toBe('GET');

      refreshReq.flush(mockGrades);

      expect(service.grades()).toEqual(mockGrades);
    }));
  });

  describe('updateGrade', () => {
    it('should update a grade and then refresh grades', fakeAsync(() => {
      const gradeIdToUpdate = 'id1';
      const updatedGradeData: GradeModify = { symbolicGrade: 'E' };

      service.updateGrade(gradeIdToUpdate, updatedGradeData).subscribe();

      const updateReq = httpMock.expectOne(`${apiUrl}/${gradeIdToUpdate}`);

      expect(updateReq.request.method).toBe('PATCH');
      expect(updateReq.request.body).toEqual(updatedGradeData);

      updateReq.flush(null); 

      tick(300);
      const refreshReq = httpMock.expectOne(apiUrl);

      expect(refreshReq.request.method).toBe('GET');

      refreshReq.flush([...mockGrades, {id: 'updated', minPercentage: 10, symbolicGrade: 'U'}]);

      expect(service.grades().some(grade => grade.id === 'updated')).toBeTrue();
    }));
  });

  describe('deleteGrade', () => {
    it('should delete a grade and then refresh grades', fakeAsync(() => {
      const gradeIdToDelete = 'id1';

      service.deleteGrade(gradeIdToDelete).subscribe();

      const deleteReq = httpMock.expectOne(`${apiUrl}/${gradeIdToDelete}`);

      expect(deleteReq.request.method).toBe('DELETE');

      deleteReq.flush(null); 

      tick(300);
      const refreshReq = httpMock.expectOne(apiUrl);

      expect(refreshReq.request.method).toBe('GET');

      const refreshedGrades = mockGrades.filter(grade => grade.id !== gradeIdToDelete);
      refreshReq.flush(refreshedGrades);

      expect(service.grades()).toEqual(refreshedGrades);
      expect(service.grades().find(g => g.id === gradeIdToDelete)).toBeUndefined();
    }));
  });
});