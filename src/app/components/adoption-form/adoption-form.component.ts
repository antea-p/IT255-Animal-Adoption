import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Adoption } from 'src/app/models/adoption.model';
import { AdoptionService } from 'src/app/services/adoption.service';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent {
  adoptionForm: FormGroup;
  countries$: Observable<string[]>;
  adoptionErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private adoptionService: AdoptionService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adoptionForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      country: ['', [Validators.required]],
      paymentOption: ['', [Validators.required]],
      consent: [false, [Validators.requiredTrue]],
      personalNote: ['']
    });
    this.countries$ = this.countryService.getCountries();
  }

  get name() {
    return this.adoptionForm.get("name");
  }

  get surname() {
    return this.adoptionForm.get("surname");
  }

  get phone() {
    return this.adoptionForm.get("phone");
  }

  get street() {
    return this.adoptionForm.get("street");
  }

  get city() {
    return this.adoptionForm.get("city");
  }

  get zipcode() {
    return this.adoptionForm.get("zipcode");
  }

  get country() {
    return this.adoptionForm.get("country");
  }

  get paymentOption() {
    return this.adoptionForm.get("paymentOption");
  }

  get consent() {
    return this.adoptionForm.get("consent");
  }

  onSubmit(): void {
    this.adoptionForm.markAllAsTouched();
    if (this.adoptionForm.valid) {
      const adoptionData: Adoption = {
        ...this.adoptionForm.value
        // animalId: 1, // TODO: get animal's ID
        // userId: 1 // TODO: Get the current user's ID
      };
      this.adoptionService.submitAdoption(adoptionData).subscribe({
        next: () => this.router.navigate(['/success']),
        error: (err) => {
          console.error('Error during adoption submission:', err);
          this.adoptionErrorMessage = "Failed to submit adoption. Please try again later.";
        }
      });
    } else {
      this.adoptionErrorMessage = "Please review the highlighted fields and provide the necessary details.";
    }
  }


}
