import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { NamedInputFieldComponent } from './named-input-field/named-input-field.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    NamedInputFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
