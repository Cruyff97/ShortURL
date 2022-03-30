import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUrlsOverviewComponent } from './my-urls-overview.component';

describe('MyUrlsOverviewComponent', () => {
  let component: MyUrlsOverviewComponent;
  let fixture: ComponentFixture<MyUrlsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyUrlsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUrlsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
