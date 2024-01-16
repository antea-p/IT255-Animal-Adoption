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
import { RouterModule } from '@angular/router';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { StoreModule } from '@ngrx/store';
import { animalReducer } from './store/animal.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdminComponent } from './pages/admin/admin.component';
import { AnimalCrudComponent } from './pages/animal-crud/animal-crud.component';
import { AdoptionCrudComponent } from './pages/adoption-crud/adoption-crud.component';
import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { CrudFormComponent } from './components/crud-form/crud-form.component';
import { NgxDatatableModule } from '@siemens/ngx-datatable';
import { UserCrudComponent } from './pages/user-crud/user-crud.component';
import { userReducer } from './store/user.reducers';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

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
    TermsConditionsComponent,
    AdminComponent,
    AnimalCrudComponent,
    AdoptionCrudComponent,
    UserCrudComponent,
    CrudTableComponent,
    CrudFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    NgxDatatableModule,
    StoreModule.forRoot({ animals: animalReducer, users: userReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [UserService, AnimalService, AdoptionService],
  bootstrap: [AppComponent],
})
export class AppModule { }
