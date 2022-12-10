import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPadreComponent } from './select-padre.component';

describe('SelectPadreComponent', () => {
  let component: SelectPadreComponent;
  let fixture: ComponentFixture<SelectPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPadreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
