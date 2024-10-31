import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../../models/produto';
import { CommonModule } from '@angular/common';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoDialogComponent } from '../produto-dialog/produto-dialog.component';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.css'],
  imports: [CommonModule , FontAwesomeModule]
})
export class ProdutoCardComponent implements OnInit {
  faPen = faPen;

  textPrefixValor = "R$";
  textPrefixQnt = "Unidades";

  @Input() produto!: Produto; 

  nomeProduto: string = '';
  descProduto: string = '';
  valorProduto: string = "0.00"; 
  qntProduto: number = 0.00; 
  urlImagem: string = "";

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (this.produto) {
      this.nomeProduto = this.produto?.getNome() || '';
      this.descProduto = this.produto?.getDescricao() || '';
      this.valorProduto = (this.produto?.getValor() || 0).toFixed(2).replace('.', ',');
      this.qntProduto = this.produto?.getQuantidade() || 0;
      this.urlImagem = this.produto?.getUrlImage() || '';
    }
  }

  onEditClick() {
    this.dialog.open(ProdutoDialogComponent, {
      width: '400px',
      data: { produto: this.produto } 
    });
  }
  
  
}
