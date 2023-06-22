import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultaTicketComponent } from './dialog-consulta-ticket.component';

describe('DialogConsultaTicketComponent', () => {
  let component: DialogConsultaTicketComponent;
  let fixture: ComponentFixture<DialogConsultaTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultaTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConsultaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
