import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoggedGuard } from './auth/guards/logged.guard';
import { SectionComponent } from './components/section/section.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IsAdminGuard } from './auth/guards/is-admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [LoggedGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature-modules/admin/admin.module').then((m) => m.AdminModule),
    canLoad: [IsAdminGuard],
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./groups/groups.module').then((m) => m.GroupsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'friends',
    loadChildren: () =>
      import('./friends/friends.module').then((m) => m.FriendsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'section/:id',
    component: SectionComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
