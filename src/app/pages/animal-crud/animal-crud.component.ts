import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-crud',
  templateUrl: './animal-crud.component.html',
  styleUrls: ['./animal-crud.component.css']
})
export class AnimalCrudComponent {
  animals: Animal[] = [];
  newAnimalForm = new FormGroup({});
  animalModel: Animal = {
    id: 0, // Assuming id is auto-generated and not part of the form
    name: '',
    image: '',
    age: '',
    speciesName: '',
    description: '',
    price: 0
  };
  animalFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        required: true
      }
    },
    {
      key: 'image',
      type: 'input',
      props: {
        label: 'Image Path (e.g. assets/img/cutePic.png)',
        required: true
      }
    },
    {
      key: 'age',
      type: 'input',
      props: {
        label: 'Age',
        required: true
      }
    },
    {
      key: 'speciesName',
      type: 'input',
      props: {
        label: 'Species Name',
        required: true
      }
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Description',
        required: true
      }
    },
    {
      key: 'price',
      type: 'input',
      props: {
        label: 'Price',
        type: 'number',
        required: true
      }
    }
  ];

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }

  private getAnimals() {
    this.animalService.getAnimals().subscribe(animals => {
      console.log("getAnimals called by AnimalCRUD");
      this.animals = animals;
    });
  }


  createAnimal(newAnimal: Animal): void {
    console.log('Adding animal:', newAnimal);
    this.animalService.createAnimal(newAnimal).subscribe((createdAnimal) => {
      console.log('Animal created:', createdAnimal);
      this.getAnimals();
    });
  }

  editAnimal(animal: Animal): void {
    this.animalModel = { ...animal }; // Napuni formu postojećim podacima
  }

  createOrUpdateAnimal(): void {
    if (!this.newAnimalForm.valid) {
      console.log('Form is not valid!');
      return;
    }

    if (this.animalModel.id) {
      console.log('Updating animal:', this.animalModel);

      this.animalService.updateAnimal(this.animalModel).subscribe({
        next: updatedAnimal => {
          console.log('Animal updated:', updatedAnimal);
          this.getAnimals();
        },
        error: err => console.error('Error updating animal:', err)
      });
    } else {
      this.createAnimal(this.animalModel);
    }
  }

  deleteAnimal(id: number): void {
    console.log('AnimalCRUDComponent requesting deletion of animal with id:', id);
    this.animalService.deleteAnimal(id);
  }

}
