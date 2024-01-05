import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  animals!: Animal[];

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.animalService.getAnimals().subscribe((data) => {
      // console.log(data); // Check if data is being received
      this.animals = data;
    });
  }
}
