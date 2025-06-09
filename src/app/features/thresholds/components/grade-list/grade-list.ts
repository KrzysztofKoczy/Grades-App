import { Component, ChangeDetectionStrategy, input, output, signal, effect, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Grade } from "../../../../shared/models/grade.model"
import { Icon } from "../../../../shared/icon/icon";

@Component({
  selector: "app-grade-list",
  templateUrl: "./grade-list.html",
  styleUrls: ["./grade-list.scss"],
  imports: [CommonModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeList implements OnInit {
  grades = input.required<Grade[]>();
  selectedGradeId = input<string | null>(null);
  loading = input<boolean>(true);

  gradeSelect = output<string>();
  gradeDelete = output<string>();
  addGrade = output<void>();

  isMobileView = signal<boolean>(false);

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener("resize", () => this.checkScreenSize());
  }

  onGradeSelect(id: string) {
    this.gradeSelect.emit(id);
  }

  onGradeDelete(event: Event, id: string) {
    event.stopPropagation();
    this.gradeDelete.emit(id);
  }

  onAddGrade() {
    this.addGrade.emit();
  }

  getMaxPercentage(index: number): number {
    const grades = this.grades();

    if (index === grades.length - 1) {
      return 100;
    }

    return grades[index + 1].minPercentage - 1;
  }
  
  private checkScreenSize() {
    this.isMobileView.set(window.innerWidth <= 768);
  }
}
