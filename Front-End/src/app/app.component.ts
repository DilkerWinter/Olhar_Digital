import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarProdutoDialogComponent } from "./pages/home/components/editar-produto-dialog-card/editar-produto-dialog.component";
import { ProdutoService } from './services/produto.service';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ProdutoService],
  imports: [RouterOutlet, RouterLink, HomeComponent, FontAwesomeModule, HttpClientModule, MatDialogModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'Front-End';
}
