import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { NamedInputFieldComponent } from './named-input-field/named-input-field.component';
import { SignUpContainerComponent } from './sign-up-container/sign-up-container.component';
import { RouterModule, Router, CanActivateFn } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { pbIsLoggedIn } from './pocketbaseService';

const loggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (pbIsLoggedIn()) { return true; }
  return router.parseUrl('login');
}
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
      {path: 'login', component: LoginContainerComponent},
      {path: 'register', component: SignUpContainerComponent},
      {path: '', component: HomePageComponent, canActivate: [loggedInGuard]}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
