import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUrlsComponent } from './my-urls.component';

describe('MyUrlsComponent', () => {
  let component: MyUrlsComponent;
  let fixture: ComponentFixture<MyUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyUrlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
