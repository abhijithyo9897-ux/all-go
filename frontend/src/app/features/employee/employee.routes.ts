import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/employee-profile/employee-profile.component').then(m => m.EmployeeProfileComponent)
    },
    // Optional: Route for editing/viewing existing employee
    {
        path: 'profile/:id',
        loadComponent: () => import('./components/employee-profile/employee-profile.component').then(m => m.EmployeeProfileComponent)
    }
];
