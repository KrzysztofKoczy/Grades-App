import { Component, ChangeDetectionStrategy, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet } from "@angular/router"
import { SideNav } from "./layout/side-nav/side-nav"

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, SideNav],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.html",
  styleUrls: ["./app.scss"],
})
export class App {
  sidebarCollapsed = signal<boolean>(false);

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
