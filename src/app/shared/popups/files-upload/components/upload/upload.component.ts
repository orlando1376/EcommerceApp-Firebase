import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import firebase  from 'firebase/app';

import { lastValueFrom, Observable, Subject } from 'rxjs';
import { finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file!: File;
  @Output() completed = new EventEmitter<string>();
  task!: AngularFireUploadTask;
  percentage$!: Observable<number>;
  snapshot$!: Observable<firebase.storage.UploadTaskSnapshot>;
  downloadURL!: string;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    // extrar extensión para crear un directorio mas un número aleatirio mas el nombre de archivo
    // ejemplo: jpg/12121321_archivo.jpg
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage$ = this.task.percentageChanges() as Observable<number>;

    this.snapshot$ = this.task.snapshotChanges() as Observable<firebase.storage.UploadTaskSnapshot>;

    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize(async() => {
        const storageRefObservable$ = storageRef.getDownloadURL();
        this.downloadURL = await lastValueFrom(storageRefObservable$);
        this.completed.next(this.downloadURL);
      })
    ).subscribe();
  }

}
