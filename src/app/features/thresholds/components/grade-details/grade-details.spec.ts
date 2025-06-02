import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { GradeCreate } from '../../../../shared/models/grade.model';
import { GradeDetails } from './grade-details';

describe('GradeDetails', () => {
  let component: GradeDetails;
  let fixture: ComponentFixture<GradeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form properly', () => {
    expect(component.gradeForm).toBeDefined();
    expect(component.gradeForm.value).toEqual({
      minPercentage: 0,
      symbolicGrade: '',
      descriptiveGrade: '',
    });
  });

  describe('Form Validation', () => {
    describe('minPercentage', () => {
      it('should be required', () => {
        component.gradeForm.get('minPercentage')?.setValue(null);

        expect(component.gradeForm.get('minPercentage')?.hasError('required')).toBe(true);
      });

      it('should not be less than 0', () => {
        component.gradeForm.get('minPercentage')?.setValue(-1);

        expect(component.gradeForm.get('minPercentage')?.hasError('min')).toBe(true);
      });

      it('should not be greater than 100', () => {
        component.gradeForm.get('minPercentage')?.setValue(101);

        expect(component.gradeForm.get('minPercentage')?.hasError('max')).toBe(true);
      });

      it('should be valid for values between 0 and 100', () => {
        component.gradeForm.get('minPercentage')?.setValue(50);

        expect(component.gradeForm.get('minPercentage')?.valid).toBe(true);
      });
    });

    describe('symbolicGrade', () => {
      it('should be required', () => {
        component.gradeForm.get('symbolicGrade')?.setValue('');

        expect(component.gradeForm.get('symbolicGrade')?.hasError('required')).toBe(true);
      });

      it('should not exceed 32 characters', () => {
        component.gradeForm.get('symbolicGrade')?.setValue('A'.repeat(33));

        expect(component.gradeForm.get('symbolicGrade')?.hasError('maxlength')).toBe(true);
      });

      it('should be valid with up to 32 characters', () => {
        component.gradeForm.get('symbolicGrade')?.setValue('Valid Grade');

        expect(component.gradeForm.get('symbolicGrade')?.valid).toBe(true);
      });
    });

    it('descriptiveGrade should be optional', () => {
        component.gradeForm.get('descriptiveGrade')?.setValue('Some description');

        expect(component.gradeForm.get('descriptiveGrade')?.valid).toBe(true);
        component.gradeForm.get('descriptiveGrade')?.setValue('');

        expect(component.gradeForm.get('descriptiveGrade')?.valid).toBe(true);
    });
  });

  describe('onSubmit Method', () => {
    let saveSpy: jasmine.Spy;

    beforeEach(() => {
      saveSpy = spyOn(component.save, 'emit');
    });

    it('should not emit save event if form is invalid', () => {
      component.gradeForm.invalid;
      component.onSubmit();

      expect(saveSpy).not.toHaveBeenCalled();
    });

    it('should emit GradeCreate when creating a new grade', fakeAsync(() => {
      const newGradeData: GradeCreate = {
        minPercentage: 90,
        symbolicGrade: 'A',
        descriptiveGrade: 'Excellent work',
      };

      component.gradeForm.setValue(newGradeData);
      component.onSubmit();

      expect(saveSpy).toHaveBeenCalledWith(newGradeData);
    }));
  });
});