import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../../../../models/produto';

@Component({
  selector: 'app-produto-dialog',
  standalone: true,
  imports: [],
  templateUrl: './produto-dialog.component.html',
  styleUrl: './produto-dialog.component.css'
})
export class ProdutoDialogComponent {

  nomeProduto: string; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: { produto: Produto }) {
    this.nomeProduto = this.data.produto.getNome();
  }
}
