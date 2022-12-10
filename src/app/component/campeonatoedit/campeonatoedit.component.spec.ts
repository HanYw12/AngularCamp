import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoeditComponent } from './campeonatoedit.component';

describe('CampeonatoeditComponent', () => {
  let component: CampeonatoeditComponent;
  let fixture: ComponentFixture<CampeonatoeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampeonatoeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampeonatoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
