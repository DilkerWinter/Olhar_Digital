import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../../models/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.css'],
  imports: [CommonModule]
})
export class ProdutoCardComponent implements OnInit {
  textPrefixValor = "R$";
  textPrefixQnt = "Unidades";

  @Input() produto!: Produto; 

  nomeProduto: string = '';
  descProduto: string = '';
  valorProduto: string = "0.00"; 
  qntProduto: number = 0.00; 
  urlImagem: string = "";

  ngOnInit() {
    if (this.produto) {
      this.nomeProduto = this.produto.getNome();
      this.descProduto = this.produto.getDescricao();
      this.valorProduto = this.produto.getValor().toFixed(2).replace('.', ',');
      this.qntProduto = this.produto.getQuantidade();
      this.urlImagem = this.produto.getUrlImage();
    }
  }
}
