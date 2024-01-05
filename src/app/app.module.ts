import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AnimalService } from './services/animal.service';
import { LoginComponent } from './pages/login/login.component';
import { AnimalDetailsComponent } from './pages/animal-details/animal-details.component';
import { AdoptionFormComponent } from './components/adoption-form/adoption-form.component';
import { SuccessComponent } from './pages/success/success.component';
import { AdoptionService } from './services/adoption.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutUsComponent,
    HomeComponent,
    ContactUsComponent,
    AnimalCardComponent,
    RegisterComponent,
    LoginComponent,
    AnimalDetailsComponent,
    AdoptionFormComponent,
    SuccessComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [UserService, AnimalService, AdoptionService],
  bootstrap: [AppComponent],
})
export class AppModule { }
