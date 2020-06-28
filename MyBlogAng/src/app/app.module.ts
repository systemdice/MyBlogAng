import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { MaterialModule } from './material.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
//import { AppRoutingModule } from './app-routing.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
//import { AppSettings } from "./Shared/appsettings";
import { AppSettingsServiceService } from "./shared/app-settings-service.service";

import { NgxFlagIconCssModule } from 'ngx-flag-icon-css'
import { MatTableDataSource } from '@angular/material';
import { StudentAddressComponent } from './_students/student-address.component';
import { StudentMarksComponent } from './_students/student-marks.component';
import { StudentDetailsComponent } from './_students/student-details.component';
import { AddAgentInfoComponent } from './_students/add-agent-info.component';
import { LogoutComponent } from './logout/logout.component';
import { ProgressSpinnerComponent } from './_components/progress-spinner.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './_helpers/loading.interceptor';
import { LoadingService } from './_services/loading.service';
import { AddAgentComponent } from './dialogs/add-agent.component';
import { EditAgentComponent } from './dialogs/edit-agent.component';
import { DeleteAgentComponent } from './dialogs/delete-agent.component';
import { DataService } from './_services';
import { ChartsModule } from 'ng2-charts';
import { RegisterUserRegistrationComponent } from './register-user-registration/register-user-registration.component';
import { DialogBoxComponent } from './register-user-registration/dialog-box/dialog-box.component';
import { AdminSetingsComponent } from './Settings/admin-setings/admin-setings.component';
import { UserSetingsComponent } from './Settings/user-setings/user-setings.component';
import { UserCalndarComponent } from './Settings/UserSetings/user-calndar.component';
import { UserOptionsComponent } from './Settings/UserSetings/user-options.component';
import { OfficeManagementComponent } from './register/Office/office-management.component';
import { StudentManagementComponent } from './register/Student/student-management.component';
//import { FlexLayoutModule } from '@angular/flex-layout';
//import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    AlertComponent,    
    LoginComponent,
    RegisterComponent,
    StudentAddressComponent,
    StudentMarksComponent,
    StudentDetailsComponent,
    AddAgentInfoComponent,
    LogoutComponent,
    ProgressSpinnerComponent,
    LoadingComponent,
    AddAgentComponent,
    EditAgentComponent,
    DeleteAgentComponent,
    RegisterUserRegistrationComponent,
    DialogBoxComponent,
    AdminSetingsComponent,
    UserSetingsComponent,
    UserCalndarComponent,
    UserOptionsComponent,
    OfficeManagementComponent,
    StudentManagementComponent,
    //,AppSettings
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, OverlayModule, ChartsModule,
    FlexLayoutModule
    , MatIconModule, NgxFlagIconCssModule // imported by the module 'MaterialModule'.Please add a @NgModule annotation. //FlexLayoutModule,
    //ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider, AppSettingsServiceService,
    LoadingService, DataService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
    //,AppSettingsService, AppSettings
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddAgentInfoComponent, LogoutComponent, LoadingComponent, AddAgentComponent, EditAgentComponent, DeleteAgentComponent, DialogBoxComponent]
})
export class AppModule { }
