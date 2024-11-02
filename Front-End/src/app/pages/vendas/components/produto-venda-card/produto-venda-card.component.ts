import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../../models/Produto';

@Component({
  selector: 'app-produto-venda-card',
  standalone: true,
  imports: [],
  templateUrl: './produto-venda-card.component.html',
  styleUrl: './produto-venda-card.component.css'
})
export class ProdutoVendaCardComponent implements OnInit{
  @Input() produto!: Produto;
  @Input() quantidade!: number;

  nomeProduto: string = "";
  descProduto: string = "";
  valorProduto: number = 0;
  qntProduto: number = 0;
  urlImgProduto: string = "";
  totalValorProduto: number = 0;

  ngOnInit(): void {
    this.preencherCard(); // Fixed method call
  }

  preencherCard() {
    if (this.produto) {
      this.nomeProduto = this.produto.getNome(); 
      this.descProduto = this.produto.getDescricao();
      this.valorProduto = this.produto.getValor();
      this.qntProduto = this.quantidade; 
      this.urlImgProduto = this.produto.getUrlImage();
      this.totalValorProduto = this.produto.getValor() * this.quantidade;
    }
  }
}