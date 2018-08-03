// -- Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule } from '@angular/forms';

//-- Angular Material Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatMenuModule} from '@angular/material';

// -- Services
import { AuthService } from './services/auth.service';


// -- Guards
import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { InitAuthGuard } from './guards/init-auth.guard';

// -- Pages
import { AppComponent } from './app.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MenuIconsExample } from './components/menu-icons-example/menu-icons-example.component';

// -- Components


// -- Routes
const routes: Routes = [
  { path: '',  component: HomePageComponent, canActivate: [ InitAuthGuard ] },
  { path: 'login',  component: LoginPageComponent, canActivate: [ RequireAnonGuard ] },
  { path: 'signup',  component: SignupPageComponent, canActivate: [ RequireAnonGuard ] },
  { path: 'profile',  component: ProfilePageComponent , canActivate: [ RequireUserGuard ] },
  { path: '**', component: NotFoundPageComponent, canActivate: [ InitAuthGuard ] }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    MenuIconsExample
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    RequireAnonGuard,
    RequireUserGuard,
    InitAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
