import { Component, ChangeDetectionStrategy, signal, inject, computed, OnInit, ViewChild, ElementRef, effect } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Grade, GradeCreate, GradeModify } from "../../shared/models/grade.model"
import { GradeList } from "./components/grade-list/grade-list"
import { GradeDetails } from "./components/grade-details/grade-details"
import { GradesClient } from "./services/grades-client"
import { ToastService } from "../../shared/components/toast/services/toast.service"
import { Modal } from "../../shared/components/modal/modal"
import { Toast } from "../../shared/components/toast/toast"
import { ToastType } from "../../shared/components/toast/model/toast.config"

@Component({
  selector: "app-thresholds",
  templateUrl: "./thresholds.html",
  styleUrls: ["./thresholds.scss"],
  imports: [CommonModule, GradeList, GradeDetails, Modal, Toast],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Thresholds implements OnInit {
  private gradesClient = inject(GradesClient);
  private toastService = inject(ToastService);

  @ViewChild("gradeDetailsElement", { static: false }) gradeDetailsElement!: ElementRef;
  
  grades = this.gradesClient.grades;

  isLoading = signal<boolean>(false);
  showDetails = signal<boolean>(false);
  gradeToDelete = signal<Grade | null>(null);
  selectedGradeId = signal<string | null>(null);
  showDeleteConfirmation = signal<boolean>(false);

  sortedGrades = computed(() => {
    return [...this.grades()].sort((a, b) => a.minPercentage - b.minPercentage);
  })

  selectedGrade = computed(() => {
    const id = this.selectedGradeId();

    return id ? this.grades().find((grade) => grade.id === id) || null : null;
  })

  constructor() {
    effect(() => {
      if (this.showDetails()) {
        setTimeout(() => {
          this.scrollToGradeDetails();
        }, 100)
      }
    })
  }

  ngOnInit() {
    this.loadGrades();
  }

  onGradeSelect(id: string) {
    this.selectedGradeId.set(id);
    this.showDetails.set(true);
  }

  onAddGrade() {
    this.selectedGradeId.set(null);
    this.showDetails.set(true);
  }

  onDetailsClose() {
    this.showDetails.set(false);
    this.selectedGradeId.set(null);
  }

  onGradeSave(event: GradeCreate | { id: string; data: GradeModify }) {
    this.isLoading.set(true)

    if ("id" in event) {
      this.gradesClient.updateGrade(event.id, event.data).subscribe({
        next: () => {
          this.toastService.showToast("Grade updated succes", ToastType.SUCCESS);
          this.onDetailsClose();
          this.isLoading.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.toastService.showToast(error.status === 409 ? error.error.errorMessage : "Failed to create grade", ToastType.ERROR);
        },
      })
    } else {
      this.gradesClient.createGrade(event).subscribe({
        next: () => {
          this.toastService.showToast("Grade created succes", ToastType.SUCCESS);
          this.onDetailsClose();
          this.isLoading.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.toastService.showToast(error.status === 409 ? error.error.errorMessage : "Failed to create grade", ToastType.ERROR);

        },
      })
    }
  }

  onGradeDeleteRequest(gradeId: string) {
    const grade = this.grades().find((g) => g.id === gradeId);

    if (grade) {
      this.gradeToDelete.set(grade);
      this.showDeleteConfirmation.set(true);
    }
  }

  handleDeleteConfirm() {
    const grade = this.gradeToDelete();

    if (grade) {
      this.isLoading.set(true);
      this.gradesClient.deleteGrade(grade.id).subscribe({
        next: () => {
          this.toastService.showToast("Grade deleted successfully", ToastType.SUCCESS);

          if (this.selectedGradeId() === grade.id) {
            this.onDetailsClose();
          }
          this.isLoading.set(false);
        },
        error: (error) => {
          this.toastService.showToast(`Failed to delete grade ${error}`, ToastType.ERROR);
          this.isLoading.set(false);
        },
      })
    }

    this.handleDeleteCancel();
  }

  handleDeleteCancel() {
    this.showDeleteConfirmation.set(false);
    this.gradeToDelete.set(null);
  }

  private loadGrades() {
    this.isLoading.set(true);
    this.gradesClient.getGrades().subscribe({
      next: (grades) => {
        this.gradesClient.grades.set(grades);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.toastService.showToast("Failed to load grades", ToastType.ERROR);
        this.isLoading.set(false);
      },
    })
  }

  private scrollToGradeDetails() {
    if (this.gradeDetailsElement?.nativeElement) {
      this.gradeDetailsElement.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }
}
