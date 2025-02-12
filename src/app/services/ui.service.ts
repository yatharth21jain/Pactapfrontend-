import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(    private snackBar: MatSnackBar  ) { }
  openSnackbar(message?: string) {
    this.snackBar.dismiss();
    this.snackBar.open(message || 'An Error Occurred', undefined, {
      duration: 1000 * 2,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
