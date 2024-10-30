import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ProdutoCardComponent } from './components/produto-card/produto-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProdutoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
