import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ProdutoCardComponent } from './components/produto-card/produto-card.component';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProdutoCardComponent, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  providers: [ProdutoService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.fetchProdutos(); 
  }

  fetchProdutos() {
    this.produtoService.getProdutos().subscribe(
      (produtos: any[]) => {
        this.produtos = produtos.map(p => new Produto(p.id, p.nome, p.descricao, p.quantidade, p.valor, p.urlImagem));
      },
      (error) => {
        console.error('Error fetching produtos:', error); 
      }
    );
  }
}
