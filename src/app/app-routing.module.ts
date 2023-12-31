import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
