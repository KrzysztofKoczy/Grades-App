import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { App } from "./app"

describe("App", () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("should create", () => {
    expect(component).toBeTruthy();
  })

  it("should display side navigation", () => {
    const compiled = fixture.nativeElement;
    const sideNav = compiled.querySelector("app-side-nav");

    expect(sideNav).toBeTruthy();
  });

  it("should display main content area", () => {
    const compiled = fixture.nativeElement;
    const mainContent = compiled.querySelector(".main-content");

    expect(mainContent).toBeTruthy();
  })

  it("should display router outlet", () => {
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector("router-outlet");

    expect(routerOutlet).toBeTruthy();
  })
})
