import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './guards/auth.guard'
import { LoggedGuard } from './guards/logged.guard'
import { SectionComponent } from './components/section/section.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'section/:id',
    component: SectionComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
