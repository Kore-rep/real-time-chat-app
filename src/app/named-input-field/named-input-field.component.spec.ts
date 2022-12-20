import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedInputFieldComponent } from './named-input-field.component';

describe('NamedInputFieldComponent', () => {
  let component: NamedInputFieldComponent;
  let fixture: ComponentFixture<NamedInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamedInputFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamedInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
