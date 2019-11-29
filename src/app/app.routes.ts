import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthCheckService } from './services/auth/auth-check.service';
import { AuthGuard } from './services/auth/auth.guard';

import { AppComponent } from './app.component';

export const routes: Routes = [
{ 
path: 'admin',
component: AppComponent,
    children: [
            { path: 'Login', component: LoginComponent, canActivate: [AuthCheckService] },
            { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard], pathMatch:'full'},
            { path: 'Users', component: UsersComponent, canActivate: [AuthGuard], pathMatch:'full'},
            { path: '**', redirectTo: 'Login',pathMatch:'full' }
    ],
},
    { path: '***', redirectTo: 'Login',pathMatch:'full' },
];

