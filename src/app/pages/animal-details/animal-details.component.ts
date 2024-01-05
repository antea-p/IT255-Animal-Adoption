import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap, throwError } from 'rxjs';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {
  animal$: Observable<Animal>;
  animalId: number;

  constructor(private animalService: AnimalService, private route: ActivatedRoute) { }

  ngOnInit() {
    // TODO: komentar
    this.animal$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.animalId = +id;
          console.log(`PARENT animalId: ${this.animalId}`)
          return this.animalService.getAnimalById(+id);
        } else {
          return throwError(() => new Error('Invalid animal ID'));
        }
      })
    );
  }
}