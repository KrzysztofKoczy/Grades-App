import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNav } from './side-nav';

describe('SideNav', () => {
  let component: SideNav;
  let fixture: ComponentFixture<SideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SideNav,
        RouterTestingModule.withRoutes([
          { path: 'user', component: {} as any },
          { path: 'dashboard', component: {} as any },
          { path: 'settings', component: {} as any },
        ]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNav);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with sidebar collapsed on small screens (<= 768px)', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(768);

      const emitSpy = spyOn(component.sidebarToggle, 'emit');

      fixture.detectChanges();

      expect(component.isCollapsed()).toBe(true);
      expect(component.showMobileToggle()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith('close');
    });

    it('should correctly transition from mobile to desktop on init if previous state was mobile', () => {
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1024);
        component.showMobileToggle.set(true);

        const emitSpy = spyOn(component.sidebarToggle, 'emit');

        fixture.detectChanges();
        
        expect(component.isCollapsed()).toBe(false);
        expect(component.showMobileToggle()).toBe(false);
        expect(emitSpy).toHaveBeenCalledWith(false);
    });
   });

  describe('toggleSidebar', () => {
    it('should toggle isCollapsed signal and emit sidebarToggle output', () => {
      const initialCollapsed = component.isCollapsed();
      const emitSpy = spyOn(component.sidebarToggle, 'emit');

      component.toggleSidebar();
      fixture.detectChanges();

      expect(component.isCollapsed()).toBe(!initialCollapsed);
      expect(emitSpy).toHaveBeenCalledWith(!initialCollapsed);

      component.toggleSidebar();
      fixture.detectChanges();

      expect(component.isCollapsed()).toBe(initialCollapsed);
      expect(emitSpy).toHaveBeenCalledWith(initialCollapsed);
    });
  });

  describe('closeSidebar', () => {
    it('should set isCollapsed to true and emit "close" if showMobileToggle is true', () => {
      fixture.detectChanges();
      component.showMobileToggle.set(true);
      component.isCollapsed.set(false);
      fixture.detectChanges();

      const emitSpy = spyOn(component.sidebarToggle, 'emit');

      component.closeSidebar();
      fixture.detectChanges();

      expect(component.isCollapsed()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith('close');
    });
  });
});