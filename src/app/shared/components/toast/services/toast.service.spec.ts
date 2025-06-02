import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastType } from '../model/toast.config';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
    service.toasts.set([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initial toasts signal should be an empty array', () => {
    expect(service.toasts()).toEqual([]);
  });

  describe('showToast', () => {
    it('should add a toast to the toasts signal with correct properties', () => {
      const message = 'Test Success';
      const type = ToastType.SUCCESS;
      const duration = 5000;

      service.showToast(message, type, duration);

      const toasts = service.toasts();

      expect(toasts.length).toBe(1);

      const addedToast = toasts[0];

      expect(addedToast.message).toBe(message);
      expect(addedToast.type).toBe(type);
      expect(addedToast.duration).toBe(duration);
    });

     it('should add multiple toasts correctly', () => {
      service.showToast('First Toast', ToastType.INFO, 0);
      service.showToast('Second Toast', ToastType.SUCCESS, 0);

      expect(service.toasts().length).toBe(2);
      expect(service.toasts()[0].message).toBe('First Toast');
      expect(service.toasts()[1].message).toBe('Second Toast');
    });
  });
});