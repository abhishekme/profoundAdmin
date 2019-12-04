import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AuthCheckService } from './services/auth/auth-check.service';
import { AuthGuard } from './services/auth/auth.guard';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
//import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    UsersComponent,
    LoginComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthCheckService,AuthGuard, HttpClientModule],
  exports: [LayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
