import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';

import { Toast as ToastComponent } from './toast'; 
import { ToastService } from './services/toast.service';
import { Toast as ToastModel, ToastType } from '../toast/model/toast.config';

class MockToastService {
  toasts: WritableSignal<ToastModel[]> = signal([]);
  removeToast = jasmine.createSpy('removeToast');

  setToasts(newToasts: ToastModel[]): void {
    this.toasts.set(newToasts);
  }
}

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let mockToastService: MockToastService;

  const sampleToasts: ToastModel[] = [
    { id: '1', message: 'Success!', type: ToastType.SUCCESS, duration: 3000 },
    { id: '2', message: 'Error occurred.', type: ToastType.ERROR, duration: 5000 },
    { id: '3', message: 'Information.', type: ToastType.INFO, duration: 0 },
  ];

  beforeEach(async () => {
    mockToastService = new MockToastService();

    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should apply correct CSS class based on toast type', () => {
    mockToastService.setToasts(sampleToasts);
    fixture.detectChanges();

    const toastElements = fixture.debugElement.queryAll(By.css('.toast'));

    expect(toastElements[0].nativeElement.classList.contains('toast-SUCCESS')).toBe(true);
    expect(toastElements[1].nativeElement.classList.contains('toast-ERROR')).toBe(true);
    expect(toastElements[2].nativeElement.classList.contains('toast-INFO')).toBe(true);
  });
});