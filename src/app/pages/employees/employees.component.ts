import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '@app/store'
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromList from './store/list'
import { User } from './store/list/list.models';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // evita que la página se refresque constantemente
})
export class EmployeesComponent implements OnInit {

  employees$!: Observable<User[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // obtener data
    this.employees$ = this.store.pipe(select(fromList.getItems)) as Observable<User[]>;
    this.store.dispatch(new fromList.Read());
  }

}
