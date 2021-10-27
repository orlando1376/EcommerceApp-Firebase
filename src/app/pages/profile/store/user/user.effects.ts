import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.models';
import * as fromActions from './user.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afs: AngularFirestore
  ) {}

  // obtener registros desde firebase
  read: Observable<Action> = createEffect( () =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap((action: fromActions.Read) =>
        this.afs.doc<User>(`users/${action.id}`).valueChanges().pipe(
          take(1),
          map((user: any) => new fromActions.ReadSuccess(user)),
          catchError(err => of(new fromActions.ReadError(err.mesage)))
        )
      )
    )
  );
}
