import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionado-sucesso',
  templateUrl: './adicionado-sucesso.component.html',
})
export class AdicionadoSucessoComponent {
  constructor(
    public dialogRef: MatDialogRef<AdicionadoSucessoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
