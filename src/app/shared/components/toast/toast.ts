import { Component, ChangeDetectionStrategy, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ToastService } from "./services/toast.service"

@Component({
  selector: "app-toast",
  styleUrls: ["./toast.scss"],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type">
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="toastService.removeToast(toast.id)">×</button>
        </div>
      }
    </div>
  `,
})
export class Toast {
  toastService = inject(ToastService);
}
