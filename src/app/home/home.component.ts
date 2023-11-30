import { Component } from '@angular/core';
import { Animal } from '../models/animal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  animals: Animal[] = [
    {
      id: 1,
      name: 'Luna',
      image: 'assets/img/otter.png',
      age: '2 years',
      speciesName: 'otter',
      description: 'Luna loves playing with pebbles and is very sociable.',
      price: 200.0,
    },
    {
      id: 2,
      name: 'Sandy',
      image: 'assets/img/fennec.jpeg',
      age: '6 months',
      speciesName: 'fennec',
      description: 'Sandy has oversized ears and enjoys the desert sunset.',
      price: 150.5,
    },
    {
      id: 3,
      name: 'Jasper',
      image: 'assets/img/red-panda.png',
      age: '3 years',
      speciesName: 'red panda',
      description: 'Jasper is curious and loves climbing trees.',
      price: 300.0,
    },
    {
      id: 4,
      name: 'Misty',
      image: 'assets/img/snow-leopard.png',
      age: '1 year',
      speciesName: 'snow leopard',
      description: 'Misty is elusive and loves snowy landscapes.',
      price: 250.0,
    },
    {
      id: 5,
      name: 'Leo',
      image: 'assets/img/lion.png',
      age: '4 years',
      speciesName: 'lion',
      description: 'Leo, the king of his pride, is majestic and brave.',
      price: 500.0,
    },
  ];

  ngOnInit(): void {}
}
