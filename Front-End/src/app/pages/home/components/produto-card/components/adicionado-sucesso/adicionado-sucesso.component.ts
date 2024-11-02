import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionado-sucesso',
  template: `
    <h1 mat-dialog-title>Sucesso</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Fechar</button>
    </div>
  `,
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
