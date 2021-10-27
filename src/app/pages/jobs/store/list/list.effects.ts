import { extractDocumentChangeActionData } from "@app/shared/utils/data";
import { Job, JobCreateRequest } from './list.models';
import * as fromActions from './list.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of, from } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import firebase from 'firebase/app';

type Action = fromActions.All;

@Injectable()
export class ListEffects {
  constructor(
    private actions: Actions,
    private afs: AngularFirestore
  ) {}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(

      ofType(fromActions.Types.READ),
      switchMap(() =>
        // consultar jobs ordenados por fecha de creación
        // this.afs.collection('jobs', ref => ref.orderBy('created')).snapshotChanges().pipe(
        // TODO orderBy no trae datos
        this.afs.collection('jobs').snapshotChanges().pipe(
          take(1),
          // convertir documento de firebase a Item
          map(changes => changes.map(x => extractDocumentChangeActionData(x))),
          map((items: Job[]) => new fromActions.ReadSuccess(items)),
          catchError(err => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );

  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.job),
      map((job: JobCreateRequest) => ({
        ...job,
        create: firebase.firestore.FieldValue.serverTimestamp()
      })),
      switchMap((request: JobCreateRequest) =>
        from(this.afs.collection('jobs').add(request)).pipe(
          map(res => ({...request, id: res.id})),
          map((job: Job) => new fromActions.CreateSuccess(job)),
          catchError(err => of(new fromActions.CreateError(err.message)))
        )
      )
    )
  )

  update: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: fromActions.Update) => action.job),
      map((job: Job) => ({
        ...job,
        updated: firebase.firestore.FieldValue.serverTimestamp()
      })),
      switchMap((job) =>
        from(this.afs.collection('jobs').doc(job.id).set(job)).pipe(
          map(() => new fromActions.UpdateSuccess(job.id, job)),
          catchError(err => of(new fromActions.UpdateError(err.message)))
        )
      )
    )
  )

  delete: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.DELETE),
      map((action: fromActions.Delete) => action.id),
      switchMap(id =>
        from(this.afs.collection('jobs').doc(id).delete()).pipe(
          map(() => new fromActions.DeleteSuccess(id)),
          catchError(err => of(new fromActions.DeleteError(err.message)))
        )
      )
    )
  )

}
