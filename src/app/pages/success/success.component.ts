import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { AdoptionService } from 'src/app/services/adoption.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  adoptedAnimal: Animal | null = null;

  constructor(private adoptionService: AdoptionService, private router: Router) { }

  ngOnInit(): void {
    this.adoptedAnimal = this.adoptionService.adoptedAnimal;
    if (!this.adoptedAnimal) {
      this.router.navigate(['/home']);
    }
  }
}
