import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'get-started',
    loadChildren: () =>
      import('./modules/get-started/get-started.module').then(
        (m) => m.GetStartedModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  { path: '**', redirectTo: 'get-started' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
