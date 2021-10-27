import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { filter, map, take, tap } from 'rxjs/operators';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store, select } from '@ngrx/store';

import { Roles } from '@app/store/user';
export { Roles } from '@app/store/user';

type Role = Roles.Employee | Roles.Recruiter | any;

export interface GuardData {
  roles: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  private check(allowedRoles: string[]): Observable<boolean> {
    return this.store.pipe(select(fromUser.getUser)).pipe(
      take(1),
      map(user => {
        // validar si el role de usuario tiene acceso al componete que se intenta cargar
        return allowedRoles.includes(user?.roleId ? user?.roleId : '');
      }),
      // si el role tiene acceso
      tap(isAllowed => {
        if (!isAllowed) {
          this.router.navigate(['/']);
        }
      })
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(route.data.roles);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(childRoute.data.roles);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(route.data ? route.data.roles : []);
  }
}
