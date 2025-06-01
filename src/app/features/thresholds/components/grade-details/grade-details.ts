import { Component, ChangeDetectionStrategy, input, output, signal, effect } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { Grade, GradeCreate, GradeModify } from "../../../../shared/models/grade.model"

@Component({
  selector: "app-grade-details",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./grade-details.html",
  styleUrls: ["./grade-details.scss"],
})
export class GradeDetails {
  isVisible = input<boolean>(false);
  grade = input<Grade | null>(null);
  isLoading = input<boolean>(false);

  save = output<GradeCreate | { id: string; data: GradeModify }>();
  close = output<void>();

  gradeForm: FormGroup;
  isEditing = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    this.gradeForm = this.fb.group({
      minPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      symbolicGrade: ['', [Validators.required, Validators.maxLength(32)]],
      descriptiveGrade: ['']
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

  onSubmit() {
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

  onClose() {
    this.close.emit();
  }
}
