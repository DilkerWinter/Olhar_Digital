import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-salvar-produto',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-salvar-produto.component.html',
  styleUrl: './confirmar-salvar-produto.component.css'
})
export class ConfirmarSalvarProdutoComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarSalvarProdutoComponent>) {}


  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
