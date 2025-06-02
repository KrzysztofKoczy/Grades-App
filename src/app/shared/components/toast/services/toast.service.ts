import { Injectable, signal } from "@angular/core"
import { Toast, ToastType } from "../model/toast.config";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  showToast(message: string, type: ToastType, duration = 3000) {
    const toast: Toast = {
      id: Date.now().toString(),
      message,
      type,
      duration,
    }

    this.toasts.update((toasts) => [...toasts, toast])

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, duration)
    }
  }

  removeToast(id: string) {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
