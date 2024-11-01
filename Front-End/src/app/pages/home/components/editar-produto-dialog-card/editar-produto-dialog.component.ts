import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../../../models/produto';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../../services/produto.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-produto-dialog',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './editar-produto-dialog.component.html',
  styleUrls: ['./editar-produto-dialog.component.css']
})
export class EditarProdutoDialogComponent {

  @Output() productUpdated = new EventEmitter<Produto>();

  idProduto: number | null; 
  nomeProduto: string; 
  descProduto: string;
  valorProduto: number;
  qntProduto: number;
  urlImgProduto: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produto: Produto },
    private dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    private produtoService: ProdutoService 
  ) {
    this.idProduto = this.data.produto.getId() !== undefined ? this.data.produto.getId() : null;
    this.nomeProduto = this.data.produto.getNome();
    this.descProduto = this.data.produto.getDescricao();
    this.qntProduto = this.data.produto.getQuantidade();
    this.valorProduto = this.data.produto.getValor();
    this.urlImgProduto = this.data.produto.getUrlImage();
  }

  salvarProduto() {
   const produtoAtualizado = new Produto(
      this.idProduto, 
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
        console.log(produtoSalvo)
        this.dialogRef.close(produtoSalvo);
        this.productUpdated.emit(produtoSalvo);
      },
      (error) => {
        console.error('Erro ao salvar produto:', error);
      }
    );
  }

  isProdutoValid(produto: Produto): boolean {
    return produto.getId() !== null && produto.getQuantidade() >= 0 && produto.getValor() >= 0;
  }

  deletarProduto() {
    /*if (this.idProduto !== null) {
      this.produtoService.deletarProduto(this.idProduto).subscribe(
        () => {
          this.dialogRef.close({ deleted: true });
        },
        (error: any) => {
          console.error('Erro ao deletar produto:', error);
          // Trate o erro como necessário (exibir mensagem, etc.)
        }
      );
    } else {
      // Caso não haja id, apenas feche o diálogo
      this.dialogRef.close({ deleted: false });
    }*/
  }
}
