import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent {
  adoptionForm: FormGroup;
  countries$: Observable<string[]>;
  adoptionErrorMessage: string = '';

  constructor(private fb: FormBuilder, private countryService: CountryService) { }

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
    this.adoptionForm.valueChanges.subscribe(val => console.log(val));
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
    console.log('Submit attempted');
    this.adoptionForm.markAllAsTouched();

    if (this.adoptionForm.valid) {
      console.log('Form Data: ', this.adoptionForm.value);
    } else {
      this.adoptionErrorMessage = "Please review the highlighted fields and provide the necessary details.";
      console.log(this.adoptionErrorMessage);
    }
  }

}
