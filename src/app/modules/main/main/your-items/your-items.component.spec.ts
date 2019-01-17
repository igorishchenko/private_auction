import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourItemsComponent } from './your-items.component';

describe('YourItemsComponent', () => {
  let component: YourItemsComponent;
  let fixture: ComponentFixture<YourItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
