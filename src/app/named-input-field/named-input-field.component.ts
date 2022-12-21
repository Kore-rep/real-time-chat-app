import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-named-input-field',
  templateUrl: './named-input-field.component.html',
  styleUrls: ['./named-input-field.component.css']
})
export class NamedInputFieldComponent {
  @Input() label!: string;
  @Input() inputName!: string;
  @Input() inputType!: string | "text";
  @Input() targetProperty: string | undefined;
  @Output() targetPropertyChange = new EventEmitter();
  changeTargetProperty(newValue: string) {
    this.targetProperty = newValue
    this.targetPropertyChange.emit(newValue)
  }

}
