import { Injectable, inject } from "@angular/core"
import {
  type HttpInterceptor,
  type HttpRequest,
  type HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http"
import { type Observable, of, throwError } from "rxjs"
import { MockGradesData } from "../features/thresholds/services/mock-grades-data"
import { ConflictResponse, Grade, GradeCreate } from "../shared/models/grade.model"

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  private mockDataService = inject(MockGradesData);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const { url, method, body } = request;

    if (!url.includes("/grades")) {
      return next.handle(request);
    }

    console.log('METHOD:', method);
    console.log('URL:', url);
    console.log('BODY:', body);

    // GET grades
    if (method === "GET" && url.endsWith("/grades")) {
      const grades = this.mockDataService.getAllGrades();
      console.log("GET /grades", grades);

      return of(
        new HttpResponse({
          status: 200,
          body: grades,
        }),
      );
    }

    // GET gared by id
    if (method === "GET" && url.includes("/grades/")) {
      const gradeId = url.split("/grades/")[1];
      const grade = this.mockDataService.getGrade(gradeId);

      if (!grade) {
        console.log('get grade by id ERROR:', gradeId, '- 404 Not Found');

        return throwError(
          () => new HttpErrorResponse({
            status: 404,
            error: { message: "Grade not found" },
          }),
        )
      }

      console.log('get grade by id OK: gradeId - ', gradeId, 'grade - ', grade);

      return of(
        new HttpResponse({
          status: 200,
          body: { ...grade },
        }),
      )
    }

    // POST grades
    if (method === "POST" && url.endsWith("/grades")) {
      const gradeData: GradeCreate = body

      if (this.mockDataService.hasPercentageConflict(gradeData.minPercentage)) {
        const error: ConflictResponse = {
          errorCode: "AS014",
          errorMessage: "Minimum percentage value is already used!",
        };

        console.log("POST grades - 409 Conflict", error);

        return throwError(
          () => new HttpErrorResponse({
              status: 409,
              error,
            }),
        )
      }

      const newGrade: Grade = {
        id: `ungr-${Date.now()}-${Math.random().toString(36)}`,
        ...gradeData,
      };

      this.mockDataService.addGrade(newGrade);
      console.log("Mock API Response: POST /grades - 201 Created", newGrade)

      return of(
        new HttpResponse({
          status: 201,
          body: { ...newGrade },
        }),
      )
    }

    // PATCH change existing grade
    if (method === "PATCH" && url.includes("/grades/")) {
      const gradeId = url.split("/grades/")[1];
      const updateData = body;

      if (!this.mockDataService.getGrade(gradeId)) {
        console.log('PATCH /grades/', gradeId, ' - 404 Not Found'); 

        return throwError(
          () => new HttpErrorResponse({
              status: 404,
              error: { message: "Not found" },
            }),
        )
      }

      if (updateData.minPercentage !== undefined) {
        if (this.mockDataService.hasPercentageConflict(updateData.minPercentage, gradeId)) {
          const error: ConflictResponse = {
            errorCode: "AS014",
            errorMessage: "Minimum percentage value is already used!",
          };

          console.log('PATCH /grades/', gradeId, ' - 409 Conflict`, error');

          return throwError(
            () => new HttpErrorResponse({
                status: 409,
                error,
              }),
          )
        }
      }

      this.mockDataService.updateGrade(gradeId, updateData);

      console.log('PATCH /grades/', gradeId, ' - 204 Success');

      return of(
        new HttpResponse({
          status: 204,
          body: null,
        }),
      )
    }

    // DELETE grade
    if (method === "DELETE" && url.includes("/grades/")) {
      const gradeId = url.split("/grades/")[1];

      if (!this.mockDataService.deleteGrade(gradeId)) {
        console.log('DELETE /grades/', gradeId, ' - 404 Not Found');
        return throwError(
          () => new HttpErrorResponse({
              status: 404,
              error: { message: "Grade not found" },
            }),
          );
      }

      console.log('DELETE /grades/', gradeId, ' - 204 Success');

      return of(
        new HttpResponse({
          status: 204,
          body: null,
        }),
      )
    }

    return next.handle(request);
  }
}
