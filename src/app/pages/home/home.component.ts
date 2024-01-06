import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  animals$: Observable<Animal[]>;

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.animals$ = this.animalService.getAnimals();
  }

}
