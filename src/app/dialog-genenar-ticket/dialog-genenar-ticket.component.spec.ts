import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenenarTicketComponent } from './dialog-genenar-ticket.component';

describe('DialogGenenarTicketComponent', () => {
  let component: DialogGenenarTicketComponent;
  let fixture: ComponentFixture<DialogGenenarTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGenenarTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGenenarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
