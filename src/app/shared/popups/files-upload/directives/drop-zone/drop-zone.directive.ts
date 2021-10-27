import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  // cuando se deja caer
  @HostListener('drop', ['$event'])
  onDrop($event: any) {
    // para que no haga un refresh
    $event.preventDefault();

    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  // cuando se arrastra
  @HostListener('dragover', ['$event'])
  onDragOver($event: any) {
    // para que no haga un refresh
    $event.preventDefault();

    this.hovered.emit(true);
  }

  // cuando se suelta
  @HostListener('dragleave', ['$event'])
  onDragLeave($event: any) {
    // para que no haga un refresh
    $event.preventDefault();

    this.hovered.emit(false);
  }

}
