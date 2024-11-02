import { Component, EventEmitter, Output } from '@angular/core';
import { Produto } from '../../../../models/Produto'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProdutoService } from '../../../../services/produto.service'; 
import { FormsModule } from '@angular/forms';
import { ConfirmarSalvarProdutoComponent } from '../produto-card/components/editar-produto-dialog-card/components/confirmar-salvar-produto/confirmar-salvar-produto.component';

@Component({
  selector: 'app-criar-produto-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criar-produto-dialog.component.html',
  styleUrls: ['./criar-produto-dialog.component.css']
})
export class CriarProdutoDialogComponent {
  @Output() productUpdated = new EventEmitter<Produto>();

  nomeProduto: string = '';
  descProduto: string = '';
  valorProduto: number = 0;
  qntProduto: number = 0;
  urlImgProduto: string = '';
  isSubmitted: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CriarProdutoDialogComponent>,
    private dialog: MatDialog,
    private produtoService: ProdutoService
  ) {}

  criarProduto() {
    this.isSubmitted = true; 
    const dialogRef = this.dialog.open(ConfirmarSalvarProdutoComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const produtoAtualizado = new Produto(
          null,
          this.nomeProduto,
          this.descProduto,
          this.valorProduto,
          this.qntProduto,
          this.urlImgProduto,
        );

        if (!this.isProdutoValid(produtoAtualizado)) {
          console.error('Produto inválido!');
          return; 
        }

        this.produtoService.salvaOuEditaProduto(produtoAtualizado).subscribe(
          (produtoSalvo) => {
            console.log(produtoSalvo);
            this.dialogRef.close(produtoSalvo);
            this.productUpdated.emit(produtoSalvo);
          },
          (error) => {
            console.error('Erro ao salvar produto:', error);
          }
        );
      }
    });
  }

  isProdutoValid(produto: Produto): boolean {
    return (
      produto.getQuantidade() >= 0 &&
      produto.getValor() >= 0 &&
      this.nomeProduto.trim() !== '' &&
      this.descProduto.trim() !== ''
    );
  }
}
