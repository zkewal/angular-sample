import { Routes } from '@angular/router';
import { HomeRoutes } from './home/home.routes';
import { AuthRoutes } from './shared/auth/auth.routes';

export const AppRoutes: Routes = [
    ...HomeRoutes,
    ...AuthRoutes,
    {
        path: '**',
        redirectTo: '/signin',
        pathMatch: 'full'
    }
];
