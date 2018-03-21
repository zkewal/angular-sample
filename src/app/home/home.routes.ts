import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuardService } from '../shared/auth/auth-guard.service';

export const HomeRoutes: Route[] = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    }
];
