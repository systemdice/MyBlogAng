import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { TermsComponent } from '../terms/terms.component';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../_guards/auth.guard';
import { RegisterUserRegistrationComponent } from '../register-user-registration/register-user-registration.component';
import { UserSetingsComponent } from '../Settings/user-setings/user-setings.component';
import { AdminSetingsComponent } from '../Settings/admin-setings/admin-setings.component';
import { OfficeManagementComponent } from '../register/Office/office-management.component';
import { StudentManagementComponent } from '../register/Student/student-management.component';

export const appRoutes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'UserRegister', component: RegisterUserRegistrationComponent },
  { path: 'StudentRegister', component: RegisterComponent },
  { path: 'term', component: TermsComponent },
  { path: 'office', component: OfficeManagementComponent },
  { path: 'students', component: StudentManagementComponent },
  { path: 'UserSettings', component: UserSetingsComponent, canActivate: [AuthGuard] },
  { path: 'AdminSettings', component: AdminSetingsComponent, canActivate: [AuthGuard] },

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
