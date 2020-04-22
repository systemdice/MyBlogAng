import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { TermsComponent } from '../terms/terms.component';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../_guards/auth.guard';

export const appRoutes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'term', component: TermsComponent },

  // otherwise redirect to home
  //In case we want to create a route that is used when no other path matches,
  //we can use a wildcard:
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
