import { Component, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Icon } from "../../shared/icon/icon"

@Component({
  selector: "app-home",
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
  imports: [CommonModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
