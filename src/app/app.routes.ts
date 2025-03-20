import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path:'home',
        component:HomeComponent,
    
    },
    {
        path: 'details/:id',
        component:BudgetDetailsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'create-account',
        component:CreateAccountComponent,
 

    },

    {
        path: 'login',
        component:LoginComponent,
 

    }






];
