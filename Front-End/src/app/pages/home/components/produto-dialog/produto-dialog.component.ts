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
teste() {
throw new Error('Method not implemented.');
}
  onSave() {
  throw new Error('Method not implemented.');
  }
  onCancel() {
  throw new Error('Method not implemented.');
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: { produto: Produto }) {
  }
}
