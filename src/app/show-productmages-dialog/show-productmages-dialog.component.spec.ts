import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductmagesDialogComponent } from './show-productmages-dialog.component';

describe('ShowProductmagesDialogComponent', () => {
  let component: ShowProductmagesDialogComponent;
  let fixture: ComponentFixture<ShowProductmagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProductmagesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowProductmagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
