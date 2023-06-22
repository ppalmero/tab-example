import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarClienteComponent } from './dialog-agregar-cliente.component';

describe('DialogAgregarClienteComponent', () => {
  let component: DialogAgregarClienteComponent;
  let fixture: ComponentFixture<DialogAgregarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
