import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthCheckService } from './services/auth/auth-check.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AppComponent } from './app.component';

//Declare Admin Routes
export const routes: Routes = [
{ 
path: 'admin',
component: AppComponent,
    children: [
            { path: 'Login', component: LoginComponent, canActivate: [AuthCheckService] },
            { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard], pathMatch:'full'},
            { path: 'Users', component: UsersComponent, canActivate: [AuthGuard],
            
            },
            { path: '**', redirectTo: 'Login',pathMatch:'full' }
    ],
},
    { path: '***', redirectTo: 'Login',pathMatch:'full' },
];

