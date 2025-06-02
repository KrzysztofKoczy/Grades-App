import { Component, ChangeDetectionStrategy, signal, output, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { navigationConfig } from "../model/side-nav.config"
import { Icon } from "../../shared/icon/icon";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.html",
  styleUrls: ["./side-nav.scss"],
  imports: [CommonModule, RouterModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav implements OnInit {
  isCollapsed = signal<boolean>(false);
  showMobileToggle = signal<boolean>(false);

  sidebarToggle = output<boolean | string>();
  
  navigationItems = navigationConfig;

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener("resize", () => this.checkScreenSize());
  }

  toggleSidebar() {
    this.isCollapsed.update((collapsed) => !collapsed);
    this.sidebarToggle.emit(this.isCollapsed());
  }

  closeSidebar() {
    if (this.showMobileToggle()) {
      this.isCollapsed.set(true);
      this.sidebarToggle.emit('close');
    }
  }

  private checkScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const wasShowingMobileToggle = this.showMobileToggle();

    this.showMobileToggle.set(isMobile);
    
    if (wasShowingMobileToggle && !isMobile) {
      this.isCollapsed.set(false);
      this.sidebarToggle.emit(false);
    } else if (!wasShowingMobileToggle && isMobile) {
      this.isCollapsed.set(true);
      this.sidebarToggle.emit('close');
    }
  }
}
