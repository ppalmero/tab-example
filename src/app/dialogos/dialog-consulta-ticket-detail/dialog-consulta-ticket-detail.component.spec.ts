import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultaTicketDetailComponent } from './dialog-consulta-ticket-detail.component';

describe('DialogConsultaTicketDetailComponent', () => {
  let component: DialogConsultaTicketDetailComponent;
  let fixture: ComponentFixture<DialogConsultaTicketDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultaTicketDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConsultaTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
