import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambiarContraseniaComponent } from './dialog-cambiar-contrasenia.component';

describe('DialogCambiarContraseniaComponent', () => {
  let component: DialogCambiarContraseniaComponent;
  let fixture: ComponentFixture<DialogCambiarContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCambiarContraseniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCambiarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
