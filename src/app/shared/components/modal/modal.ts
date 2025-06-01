import { Component, ChangeDetectionStrategy, input, output } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-modal",
  templateUrl: "./modal.html",
  styleUrls: ["./modal.scss"],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  isOpen = input<boolean>(false);
  title = input<string>("");
  message = input<string>("");
  confirmButtonText = input<string>("");
  isDangerButton = input<boolean>(false);

  confirm = output<void>();
  cancel = output<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
