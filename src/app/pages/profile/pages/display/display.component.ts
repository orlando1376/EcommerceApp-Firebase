import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromProfileUser from '../../store/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class DisplayComponent implements OnInit, OnDestroy {

  user$!: Observable<fromProfileUser.User>;
  isOwnProflile$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromProfileUser.getUser)) as Observable<fromProfileUser.User>;

    // id del usuario
    this.route.params.subscribe((param: Params) => {
      const id = param.id; // el id proviene de la ruta en ProfileRoutingModule
      this.store.dispatch(new fromProfileUser.Read(id));
      this.isOwnProflile$ = this.store.pipe(
        select(fromUser.getUser),
        map(user => user && user.uid === id)
      ) as Observable<boolean>
    });
  }

  ngOnDestroy():void {
    this.store.dispatch( new fromProfileUser.Clear());
  }
}
