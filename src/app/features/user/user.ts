import { Component, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Icon } from "../../shared/icon/icon"

@Component({
  selector: "app-user",
  templateUrl: "./user.html",
  styleUrls: ["./user.scss"],
  imports: [CommonModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class User {}
