import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Modal } from './modal';

describe('ModalComponent', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Outputs and Actions', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.componentRef.setInput('title', 'Action Modal');
      fixture.componentRef.setInput('message', 'Confirm or cancel.');
      fixture.componentRef.setInput('confirmButtonText', 'OK');
      fixture.detectChanges();
    });

    it('should emit confirm output when confirm button is clicked', () => {
      spyOn(component.confirm, 'emit');

      const confirmButton = fixture.debugElement.query(By.css('.modal-footer button:last-child'));

      confirmButton.triggerEventHandler('click', null);

      expect(component.confirm.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit cancel output when cancel button is clicked', () => {
      spyOn(component.cancel, 'emit');

      const cancelButton = fixture.debugElement.query(By.css('.modal-footer button.btn-secondary'));

      cancelButton.triggerEventHandler('click', null);

      expect(component.cancel.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit cancel output when overlay is clicked', () => {
      spyOn(component.cancel, 'emit');

      const overlay = fixture.debugElement.query(By.css('.modal-overlay'));

      overlay.triggerEventHandler('click', null);

      expect(component.cancel.emit).toHaveBeenCalledTimes(1);
    });
  });
});