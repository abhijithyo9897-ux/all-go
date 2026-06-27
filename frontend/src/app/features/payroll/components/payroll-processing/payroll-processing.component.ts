import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-payroll-processing',
    standalone: true,
    imports: [CommonModule, SidebarComponent, FormsModule],
    templateUrl: './payroll-processing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollProcessingComponent {

    selectedMonth = signal('March');
    selectedYear = signal('2024');
    selectedDepartment = signal('All');

    employees = signal([
        {
            id: 1,
            name: 'Alice Johnson',
            role: 'Software Engineer',
            basicSalary: '$4,000',
            allowances: '$500',
            deductions: '$200',
            netPay: '$4,300',
            status: 'Paid',
            avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
        },
        {
            id: 2,
            name: 'Bob Smith',
            role: 'Product Manager',
            basicSalary: '$5,500',
            allowances: '$600',
            deductions: '$300',
            netPay: '$5,800',
            status: 'Pending',
            avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
        },
        {
            id: 3,
            name: 'Charlie Brown',
            role: 'Designer',
            basicSalary: '$3,800',
            allowances: '$400',
            deductions: '$150',
            netPay: '$4,050',
            status: 'Processing',
            avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
        }
    ]);

    runPayroll() {
        alert(`Running payroll for ${this.selectedMonth()} ${this.selectedYear()}`);
    }

    viewDetails(id: number) {
        console.log('View details for', id);
    }
}
