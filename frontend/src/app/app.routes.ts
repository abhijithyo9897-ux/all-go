import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    {
        path: 'employee',
        loadChildren: () => import('./features/employee/employee.routes').then(m => m.EMPLOYEE_ROUTES)
    },
    {
        path: 'attendance',
        loadChildren: () => import('./features/attendance/attendance.routes').then(m => m.ATTENDANCE_ROUTES)
    },
    {
        path: 'payroll',
        loadChildren: () => import('./features/payroll/payroll.routes').then(m => m.PAYROLL_ROUTES)
    }
];
