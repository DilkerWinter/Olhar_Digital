import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../../models/Produto';

@Component({
  selector: 'app-produto-venda-card',
  standalone: true,
  imports: [],
  templateUrl: './produto-venda-card.component.html',
  styleUrls: ['./produto-venda-card.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class ProdutoVendaCardComponent implements OnInit {
  @Input() produto!: Produto;
  @Input() quantidade!: number;

  valorPrefix: string = "R$";
  nomeProduto: string = "";
  descProduto: string = "";
  valorProduto: string = "";
  qntProduto: number = 0;
  urlImgProduto: string = "";
  totalValorProduto: string = "";

  ngOnInit(): void {
    this.preencherCard(); 
  }

  preencherCard() {
    if (this.produto) {
      this.nomeProduto = this.produto.getNome(); 
      this.descProduto = this.produto.getDescricao();
      this.qntProduto = this.quantidade; 
      this.urlImgProduto = this.produto.getUrlImage();
      this.valorProduto = `${this.valorPrefix} ${this.produto.getValor().toFixed(2).replace('.', ',')}`;
      this.totalValorProduto = `${this.valorPrefix} ${(this.produto.getValor() * this.quantidade).toFixed(2).replace('.', ',')}`;
    }
  }
}
