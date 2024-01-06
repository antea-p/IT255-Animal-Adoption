import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  adoptionData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.adoptionData = navigation.extras.state['adoptionData'];
      console.log('adoptionData:', this.adoptionData);
    }
  }
}
