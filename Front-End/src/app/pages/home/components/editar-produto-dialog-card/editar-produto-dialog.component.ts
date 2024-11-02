import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../../../models/Produto';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../../services/produto.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmarDeleteProdutoComponent } from './components/confirmar-delete-produto/confirmar-delete-produto.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarSalvarProdutoComponent } from './components/confirmar-salvar-produto/confirmar-salvar-produto.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

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
    private dialog: MatDialog,
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

    const dialogRef = this.dialog.open(ConfirmarSalvarProdutoComponent);
    
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
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
    })
  }

  isProdutoValid(produto: Produto): boolean {
    return produto.getId() !== null && produto.getQuantidade() >= 0 && produto.getValor() >= 0;
  }

  deletarProduto() {
    const dialogRef = this.dialog.open(ConfirmarDeleteProdutoComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.idProduto) {
          this.produtoService.deletarProduto(this.idProduto).subscribe(
            () => {
              console.log('Produto deletado com sucesso');
              this.dialogRef.close(true);
              this.productUpdated.emit();
            },
            (error: any) => {
              console.error('Erro ao deletar produto:', error);
              this.openErrorDialog('Não é possível deletar um produto que possui uma venda.<br><br>Delete a venda que este produto está e tente novamente.');

            }
          );
        }
      }
    });
  }
  
  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
    });
  }
  
  
}
