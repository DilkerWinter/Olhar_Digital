import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faGlasses,faList, faBasketShopping} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule, CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faGlasses = faGlasses;
  faList = faList;
  faBasket = faBasketShopping;

  currentRoute = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url; 
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route; 
  }
}
