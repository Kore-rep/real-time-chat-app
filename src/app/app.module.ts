import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { NamedInputFieldComponent } from './named-input-field/named-input-field.component';
import { SignUpContainerComponent } from './sign-up-container/sign-up-container.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    NamedInputFieldComponent,
    SignUpContainerComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: LoginContainerComponent},
      {path: 'register', component: SignUpContainerComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
