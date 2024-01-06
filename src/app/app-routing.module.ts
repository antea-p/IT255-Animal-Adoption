import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { AnimalDetailsComponent } from './pages/animal-details/animal-details.component';
import { SuccessComponent } from './pages/success/success.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: AnimalDetailsComponent,
    title: 'Details',
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us',
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us',
  },
  {
    path: 'terms-and-conditions',
    component: TermsConditionsComponent,
    title: 'Terms and Conditions',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'success',
    component: SuccessComponent,
    title: 'Success!',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
