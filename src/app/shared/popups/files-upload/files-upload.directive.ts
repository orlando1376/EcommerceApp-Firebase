import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {

  @Input() multiple!: boolean;
  @Input() crop!: boolean; // editar imagen

  @Output() changed = new EventEmitter<string | string[]>();

  constructor(private dialog: MatDialog) { }

  // escucha y maneja eventos del DOM
  @HostListener('click', ['event']) onClick() {
    this.openDialog();
  };

  private openDialog(): void {

    // cuando se abre la ventana
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        multiple: this.multiple,
        crop: this.crop
      }
    })

    // cuando se cierra la ventana
    dialogRef.afterClosed().subscribe(result => {
      this.changed.emit(result || null);
    })
  }

}
