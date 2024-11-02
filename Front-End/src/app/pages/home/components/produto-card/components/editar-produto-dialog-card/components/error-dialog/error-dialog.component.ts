import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule], // Include CommonModule for ngIf, ngFor, etc.
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'] // Fixed styleUrl to styleUrls
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
