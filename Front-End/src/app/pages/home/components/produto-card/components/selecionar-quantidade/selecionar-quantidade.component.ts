import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../../../../models/Produto';
import { CarrinhoService } from '../../../../../../services/carrinho.service';
import { ErrorDialogComponent } from '../editar-produto-dialog-card/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-selecionar-quantidade',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './selecionar-quantidade.component.html',
  styleUrls: ['./selecionar-quantidade.component.css'],
})
export class SelecionarQuantidadeComponent implements OnInit {
  @Input() produto!: Produto;
  maxQntDisplay: number = 12;
  quantidadeAdicionada: number = 1;

  nomeProduto: string = '';
  descProduto: string = '';
  valorProduto: string = '0.00';
  qntProduto: number = 0;
  urlImagem: string = '';

  constructor(
    public dialogRef: MatDialogRef<SelecionarQuantidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produto: Produto },
    private carrinhoService: CarrinhoService,
    private dialog: MatDialog
  ) {
    this.produto = data.produto;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.preencherTela();
  }

  preencherTela() {
    if (this.produto) {
      this.nomeProduto = this.produto?.getNome() || '';
      this.descProduto = this.produto?.getDescricao() || '';
      this.valorProduto = (this.produto?.getValor() || 0)
        .toFixed(2)
        .replace('.', ',');
      this.qntProduto = this.produto?.getQuantidade() || 0;
      this.urlImagem = this.produto?.getUrlImage() || '';
    }
  }

  onAdicionarQuantidade(): void {
    console.log(this.quantidadeAdicionada, this.qntProduto);
    
    if (this.quantidadeAdicionada > this.qntProduto) {
      this.openErrorDialog('Não é possível comprar mais do que o disponível em estoque.');
    } else {
      this.carrinhoService.adicionarProduto(this.produto, this.quantidadeAdicionada);
      this.dialogRef.close(true);
    }
  }

  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
    });
  }

}
