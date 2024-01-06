import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adoption } from 'src/app/models/adoption.model';
import { AnimalService } from '../../services/animal.service';
import { Animal } from 'src/app/models/animal';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  adoptionData: Adoption;
  animal$: Observable<Animal>;

  constructor(private router: Router, private animalService: AnimalService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.adoptionData = navigation.extras.state['adoptionData'];
      if (this.adoptionData) {
        this.animal$ = this.animalService.getAnimalById(this.adoptionData.animalId);
      }
    }

  }
}
