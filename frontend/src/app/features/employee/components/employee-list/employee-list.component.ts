import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './employee-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent {
    private router = inject(Router);

    employees = [
        { id: 101, name: 'Alice Johnson', role: 'UI/UX Designer', department: 'Design', type: 'Full Time', status: 'Active', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
        { id: 102, name: 'Bob Smith', role: 'Frontend Dev', department: 'Engineering', type: 'Contract', status: 'Active', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
        { id: 103, name: 'Charlie Brown', role: 'Project Manager', department: 'Product', type: 'Full Time', status: 'On Leave', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
        { id: 104, name: 'Diana Prince', role: 'DevOps Engineer', department: 'Engineering', type: 'Part Time', status: 'Active', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
    ];

    selectedEmployee = signal<any>(null);

    viewEmployee(emp: any) {
        this.selectedEmployee.set(emp);
    }

    closeSidePanel() {
        this.selectedEmployee.set(null);
    }

    addNewEmployee() {
        // Navigate to registration or open modal
        this.router.navigate(['/employee/register']);
    }
}
