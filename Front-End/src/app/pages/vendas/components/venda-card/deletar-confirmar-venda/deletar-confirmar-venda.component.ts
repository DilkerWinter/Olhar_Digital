import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletar-confirmar-venda',
  standalone: true,
  imports: [],
  templateUrl: './deletar-confirmar-venda.component.html',
  styleUrl: './deletar-confirmar-venda.component.css'
})
export class DeletarConfirmarVendaComponent {

  constructor(private dialogRef: MatDialogRef<DeletarConfirmarVendaComponent>){}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
