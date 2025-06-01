import { Injectable } from "@angular/core"
import { Grade } from "../shared/models/grade.model"

@Injectable({
  providedIn: "root",
})
export class MockGradesData {
  private mockGrades: Grade[] = [
    {
      id: "ungr-0e0668e7-e907-4c7d-8af9-a0a4a37f6d82",
      minPercentage: 0,
      symbolicGrade: "F",
      descriptiveGrade: "Insufficient knowledge and skills. Significant gaps in understanding basic concepts.",
    },
    {
      id: "ungr-2ebf3a08-6246-4005-a2b4-6d8b3d9349c2",
      minPercentage: 31,
      symbolicGrade: "E",
      descriptiveGrade: "Below average performance with some understanding of basic concepts.",
    },
    {
      id: "ungr-3ebf3a08-6246-4005-a2b4-6d8b3d9349c3",
      minPercentage: 50,
      symbolicGrade: "D",
      descriptiveGrade: "Average performance meeting minimum requirements.",
    },
    {
      id: "ungr-4ebf3a08-6246-4005-a2b4-6d8b3d9349c4",
      minPercentage: 73,
      symbolicGrade: "C",
      descriptiveGrade: "Good performance with solid understanding of concepts.",
    },
    {
      id: "ungr-5ebf3a08-6246-4005-a2b4-6d8b3d9349c5",
      minPercentage: 90,
      symbolicGrade: "B",
      descriptiveGrade: "Very good performance with comprehensive understanding.",
    },
    {
      id: "ungr-6ebf3a08-6246-4005-a2b4-6d8b3d9349c6",
      minPercentage: 100,
      symbolicGrade: "A",
      descriptiveGrade: "Excellent performance demonstrating mastery of all concepts.",
    },
  ];

  getAllGrades(): Grade[] {
    return [...this.mockGrades];
  }

  getGrade(id: string): Grade | undefined {
    return this.mockGrades.find((g) => g.id === id);
  }

  addGrade(grade: Grade): void {
    this.mockGrades.push(grade);
    this.sortGrades();
  }

  updateGrade(id: string, updateData: Partial<Grade>): boolean {
    const index = this.mockGrades.findIndex((g) => g.id === id);

    this.mockGrades[index] = { ...this.mockGrades[index], ...updateData };
    this.sortGrades();

    return true;
  }

  deleteGrade(id: string): boolean {
    const index = this.mockGrades.findIndex((g) => g.id === id);

    this.mockGrades.splice(index, 1);

    return true;
  }

  hasPercentageConflict(percentage: number, excludeId?: string): boolean {
    return this.mockGrades.some((g) => g.minPercentage === percentage && g.id !== excludeId);
  }

  private sortGrades(): void {
    this.mockGrades.sort((a, b) => a.minPercentage - b.minPercentage);
  }
}
