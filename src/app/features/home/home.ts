import { Component, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
})
export class Home {}
