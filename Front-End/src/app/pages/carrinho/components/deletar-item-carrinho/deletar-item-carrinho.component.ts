import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletar-item-carrinho',
  standalone: true,
  imports: [],
  templateUrl: './deletar-item-carrinho.component.html',
  styleUrl: './deletar-item-carrinho.component.css'
})
export class DeletarItemCarrinhoComponent {
  constructor(private dialogRef: MatDialogRef<DeletarItemCarrinhoComponent>){}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
