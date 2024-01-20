import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Adoption } from 'src/app/models/adoption.model';
import { AdoptionService } from 'src/app/services/adoption.service';

@Component({
  selector: 'app-adoption-crud',
  templateUrl: './adoption-crud.component.html',
  styleUrls: ['./adoption-crud.component.css']
})
// TODO: validacija; potvrda uspjeha
export class AdoptionCrudComponent {
  adoptions: Adoption[] = [];
  newAdoptionForm = new FormGroup({});
  adoptionModel: Adoption = {
    id: 0,
    animalId: 0,
    name: '',
    surname: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    country: '',
    paymentOption: '',
    adoptionDateTime: '',
    personalNote: ''
  };

  adoptionFields: FormlyFieldConfig[] = [
    {
      key: 'animalId',
      type: 'input',
      props: {
        label: "Adopted Animal's ID",
        type: 'number',
        required: true
      }
    },
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        required: true
      }
    },
    {
      key: 'surname',
      type: 'input',
      props: {
        label: 'Surname',
        required: true
      }
    },
    {
      key: 'phone',
      type: 'input',
      props: {
        label: 'Phone',
        type: 'tel',
        required: true
      }
    },
    {
      key: 'street',
      type: 'input',
      props: {
        label: 'Street Address',
        required: true
      }
    },
    {
      key: 'city',
      type: 'input',
      props: {
        label: 'City',
        required: true
      }
    },
    {
      key: 'zipcode',
      type: 'input',
      props: {
        label: 'Zipcode (5-digit)',
        required: true
      }
    },
    {
      key: 'country',
      type: 'input',
      props: {
        label: 'Country',
        required: true
      }
    },
    {
      key: 'paymentOption',
      type: 'input',
      props: {
        label: 'Payment Option',
        required: true
      }
    },
    {
      key: 'adoptionDateTime',
      type: 'input',
      props: {
        label: 'Adoption Date and Time',
        type: 'datetime-local',
        required: true
      }
    },
    {
      key: 'personalNote',
      type: 'textarea',
      props: {
        label: 'Personal Note',
        rows: 5
      }
    }
  ];

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit() {
    this.getAdoptions();
  }

  private getAdoptions() {
    this.adoptionService.getAdoptions().subscribe(adoptions => {
      console.log("getAdoptions called by AdoptionCRUD");
      this.adoptions = adoptions;
    });
  }


  createAdoption(newAdoption: Adoption): void {
    console.log('Adding adoption:', newAdoption);
    this.adoptionService.createAdoption(newAdoption).subscribe((createdAdoption) => {
      console.log('Adoption created:', createdAdoption);
      this.getAdoptions();
    });
  }

  editAdoption(adoption: Adoption): void {
    this.adoptionModel = { ...adoption }; // Napuni formu postojećim podacima
  }

  createOrUpdateAdoption(): void {
    if (!this.newAdoptionForm.valid) {
      console.log('Form is not valid!');
      return;
    }

    if (this.adoptionModel.id) {
      console.log('Updating adoption:', this.adoptionModel);

      this.adoptionService.updateAdoption(this.adoptionModel).subscribe({
        next: updatedAdoption => {
          console.log('Adoption updated:', updatedAdoption);
          this.getAdoptions();
        },
        error: err => console.error('Error updating adoption:', err)
      });
    } else {
      this.createAdoption(this.adoptionModel);
    }
  }

  deleteAdoption(id: number): void {
    console.log('AdoptionCRUDComponent requesting deletion of adoption with id:', id);
    this.adoptionService.deleteAdoption(id);
  }

}
