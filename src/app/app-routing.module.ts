import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RoleGuard, Roles } from '@app/guards';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'demo',
        loadChildren: () => import('./pages/demo/demo.module').then(m => m.DemoModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'static',
        loadChildren: () => import('./pages/static/static.module').then(m => m.StaticModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'employees',
        loadChildren: () => import('./pages/employees/employees.module').then(m => m.EmployeesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'jobs',
        loadChildren: () => import('./pages/jobs/jobs.module').then(m => m.JobsModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/welcome'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
