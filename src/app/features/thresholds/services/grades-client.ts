import { Injectable, signal, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import { Grade, GradeCreate, GradeModify } from "../../../shared/models/grade.model"
import { ToastService } from "../../../shared/components/toast/services/toast.service"
import { ToastType } from "../../../shared/components/toast/model/toast.config"

@Injectable({
  providedIn: "root",
})
export class GradesClient {
  private httpClient = inject(HttpClient);
  private toastService = inject(ToastService);

  grades = signal<Grade[]>([]);

  private readonly apiUrl = "/api/grades";
  private gradesSubject = new BehaviorSubject<Grade[]>([]);

  constructor() {
    this.gradesSubject.subscribe((grades) => {
      this.grades.set(grades)
    });
  }

  getGrades(): Observable<Grade[]> {
    return this.httpClient.get<Grade[]>(this.apiUrl).pipe(
      tap((grades) => {
        this.gradesSubject.next(grades);
      }),
      catchError((error) => {
        this.toastService.showToast("Error:" + error, ToastType.ERROR);
        throw error;
      }),
    );
  }

  createGrade(gradeData: GradeCreate): Observable<Grade> {
    return this.httpClient.post<Grade>(this.apiUrl, gradeData).pipe(
      tap(() => this.refreshGrades())
    );
  }

  updateGrade(id: string, gradeData: GradeModify): Observable<void> {
    return this.httpClient.patch<void>(`${this.apiUrl}/${id}`, gradeData).pipe(
      tap(() => this.refreshGrades())
    );
  }

  deleteGrade(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshGrades())
    );
  }

  // daley to update Data
  private refreshGrades(): void {
    setTimeout(() => {
      this.getGrades().subscribe();
    })
  }
}
