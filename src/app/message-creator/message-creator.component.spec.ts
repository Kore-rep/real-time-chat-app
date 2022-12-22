import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCreatorComponent } from './message-creator.component';

describe('MessageCreatorComponent', () => {
  let component: MessageCreatorComponent;
  let fixture: ComponentFixture<MessageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
