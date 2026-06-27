import { Routes } from '@angular/router';
import { AttendanceMarkingComponent } from './components/attendance-marking/attendance-marking.component';

export const ATTENDANCE_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'daily-marking',
        pathMatch: 'full'
    },
    {
        path: 'daily-marking',
        component: AttendanceMarkingComponent
    }
];
