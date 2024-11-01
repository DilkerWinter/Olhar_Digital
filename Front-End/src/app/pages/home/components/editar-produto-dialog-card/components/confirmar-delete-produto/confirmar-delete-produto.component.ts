import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-delete-produto',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-delete-produto.component.html',
  styleUrl: './confirmar-delete-produto.component.css'
})
export class ConfirmarDeleteProdutoComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarDeleteProdutoComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
