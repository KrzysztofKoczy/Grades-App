import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Grade } from '../../../../shared/models/grade.model';
import { GradeList } from './grade-list';

describe('GradeList', () => {
  let component: GradeList;
  let fixture: ComponentFixture<GradeList>;

  const mockGrades: Grade[] = [
    { id: '1', minPercentage: 0, symbolicGrade: 'F', descriptiveGrade: 'Fail' },
    { id: '2', minPercentage: 50, symbolicGrade: 'D', descriptiveGrade: 'Passable' },
    { id: '3', minPercentage: 70, symbolicGrade: 'C', descriptiveGrade: 'Average' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeList],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeList);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('grades', [...mockGrades]);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Outputs', () => {
    it('should emit outpust properlu', () => {
      spyOn(component.gradeSelect, 'emit');
      spyOn(component.gradeDelete, 'emit');
      spyOn(component.addGrade, 'emit');

      const testId = 'test-id';
      const mockEvent = jasmine.createSpyObj<Event>('Event', ['stopPropagation']);

      component.onGradeSelect(testId);
      expect(component.gradeSelect.emit).toHaveBeenCalledWith(testId);

      component.onAddGrade();
      expect(component.addGrade.emit).toHaveBeenCalled();

      component.onGradeDelete(mockEvent, testId);
      expect(component.gradeDelete.emit).toHaveBeenCalledWith(testId);
    });
  });

  describe('getMaxPercentage', () => {
    it('should return 100 for the last grade in the list', () => {
      const lastIndex = mockGrades.length - 1;

      expect(component.getMaxPercentage(lastIndex)).toBe(100);
    });

     it('should handle a single grade in the list', () => {
        const singleGrade = [{ id: '1', minPercentage: 0, symbolicGrade: 'S' }];

        fixture.componentRef.setInput('grades', singleGrade);
        fixture.detectChanges();
        
        expect(component.getMaxPercentage(0)).toBe(100);
    });
  });
});