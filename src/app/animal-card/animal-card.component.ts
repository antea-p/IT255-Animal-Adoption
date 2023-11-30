import { Component, Input } from '@angular/core';
import { Animal } from '../models/animal';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
}
