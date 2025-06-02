import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { User } from './user';

describe('UserComponent', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display html elements properly', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));

    expect(paragraphs.length).toBe(2);
    expect(heading.nativeElement.textContent.trim()).toBe('User Dashboard');
    expect(paragraphs[1].nativeElement.textContent.trim()).toBe('Comming soon');
  });
});