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
    title: 'About Us page',
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
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
