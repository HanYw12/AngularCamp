import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoclienteComponent } from './ingresocliente.component';

describe('IngresoclienteComponent', () => {
  let component: IngresoclienteComponent;
  let fixture: ComponentFixture<IngresoclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
