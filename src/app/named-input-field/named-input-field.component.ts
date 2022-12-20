import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-named-input-field',
  templateUrl: './named-input-field.component.html',
  styleUrls: ['./named-input-field.component.css']
})
export class NamedInputFieldComponent {
  @Input() label!: String;
  @Input() inputName!: String;
  @Input() inputType!: String | "text";
  @Input() targetProperty: String | undefined;
  @Output() targetPropertyChange = new EventEmitter();
  changeTargetProperty(newValue: String) {
    this.targetProperty = newValue
    this.targetPropertyChange.emit(newValue)
  }

}
