import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from '../../../../models/produto';
import { CommonModule } from '@angular/common';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { EditarProdutoDialogComponent } from '../editar-produto-dialog-card/editar-produto-dialog.component';

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

  @Output() produtoUpdated = new EventEmitter<void>();
  @Input() produto!: Produto; 

  nomeProduto: string = '';
  descProduto: string = '';
  valorProduto: string = "0.00"; 
  qntProduto: number = 0.00; 
  urlImagem: string = "";

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.preencherCard();
  }

  preencherCard(){
    if (this.produto) {
      this.nomeProduto = this.produto?.getNome() || '';
      this.descProduto = this.produto?.getDescricao() || '';
      this.valorProduto = (this.produto?.getValor() || 0).toFixed(2).replace('.', ',');
      this.qntProduto = this.produto?.getQuantidade() || 0;
      this.urlImagem = this.produto?.getUrlImage() || '';
    }
  }

  onEditClick() {
    const dialogRef = this.dialog.open(EditarProdutoDialogComponent, {
      height: "25rem",
      width: "50rem",
      data: { produto: this.produto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preencherCard();
        this.produtoUpdated.emit(); 
      }
    });
  }
  
  
}
