import { Component, ChangeDetectionStrategy, input, output, signal, effect, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { Grade, GradeCreate, GradeModify } from "../../../../shared/models/grade.model"
import { GradesClient } from "../../services/grades-client";

@Component({
  selector: "app-grade-details",
  templateUrl: "./grade-details.html",
  styleUrls: ["./grade-details.scss"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeDetails {
  private formBuilder = inject(FormBuilder);
  private gradesClient = inject(GradesClient);
  
  grade = input<Grade | null>(null);

  save = output<GradeCreate | { id: string; data: GradeModify }>();
  close = output<void>();

  gradeForm: FormGroup;
  isEditing = signal<boolean>(false);
  maxPercentage = signal<number | null>(null);

  constructor() {
    this.gradeForm = this.formBuilder.group({
      minPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      symbolicGrade: ['', [Validators.required, Validators.maxLength(32)]],
      descriptiveGrade: ['']
    });

    this.gradeForm.get('minPercentage')?.valueChanges.subscribe(() => {
      this.calculateMaxPercentage();
    });


    effect(() => {
      const currentGrade = this.grade();

      if (currentGrade) {
        this.isEditing.set(true);
        this.gradeForm.patchValue({
          minPercentage: currentGrade.minPercentage,
          symbolicGrade: currentGrade.symbolicGrade,
          descriptiveGrade: currentGrade.descriptiveGrade || "",
        })
      } else {
        this.isEditing.set(false)
        this.gradeForm.reset({
          minPercentage: 0,
          symbolicGrade: "",
          descriptiveGrade: "",
        })
      }
    })
  }

  onSubmit(): void {
    if (this.gradeForm.invalid) {
      return;
    }

    const formValue = this.gradeForm.value;

    if (this.isEditing()) {
      const currentGrade = this.grade();

      if (currentGrade) {
        this.save.emit({
          id: currentGrade.id,
          data: {
            minPercentage: formValue.minPercentage,
            symbolicGrade: formValue.symbolicGrade,
            descriptiveGrade: formValue.descriptiveGrade,
          },
        })
      }
    } else {
      this.save.emit({
        minPercentage: formValue.minPercentage,
        symbolicGrade: formValue.symbolicGrade,
        descriptiveGrade: formValue.descriptiveGrade,
      })
    }
  }

  calculateMaxPercentage(): void {
    const minPercentage = this.gradeForm.get('minPercentage')?.value;
  
    if (minPercentage === 0 && this.isEditing()) {
      this.maxPercentage.set(0);
      return;
    }
  
    const allGrades = this.gradesClient.grades();
    const sortedGrades = [...allGrades].sort((a, b) => a.minPercentage - b.minPercentage);
    const nextGrade = sortedGrades.find(grade => grade.minPercentage > minPercentage);
  
    this.maxPercentage.set(nextGrade ? nextGrade.minPercentage - 1 : 100)
  }

  onClose(): void {
    this.close.emit();
  }
}
