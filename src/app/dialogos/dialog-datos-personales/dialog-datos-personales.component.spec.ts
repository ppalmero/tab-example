import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDatosPersonalesComponent } from './dialog-datos-personales.component';

describe('DialogDatosPersonalesComponent', () => {
  let component: DialogDatosPersonalesComponent;
  let fixture: ComponentFixture<DialogDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDatosPersonalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
