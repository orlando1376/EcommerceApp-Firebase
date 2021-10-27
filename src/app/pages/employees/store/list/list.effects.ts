import { User } from "./list.models";
import * as fromActions from './list.actions'
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { extractDocumentChangeActionData } from '@app/shared/utils/data';

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
        // consultar usuarios donde el role se igual a employee
        this.afs.collection<User>('users', ref => ref.where('roleId', '==', 'employee')).snapshotChanges().pipe(
          take(1),
          // convertir documento de firebase a Item
          map(changes => changes.map(x => extractDocumentChangeActionData(x, false))),
          map((items: User[]) => new fromActions.ReadSuccess(items)),
          catchError(err => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );
}
