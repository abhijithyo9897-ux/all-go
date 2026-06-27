import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';

@Component({
    selector: 'app-payroll-reports',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './payroll-reports.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollReportsComponent {

    // Dummy data for the chart "Payroll Payment History"
    // Values representing height percentages or raw values to scale
    chartData = [
        { label: 'Jan', value: 65, color: 'bg-orange-400' },
        { label: 'Feb', value: 59, color: 'bg-orange-400' },
        { label: 'Mar', value: 80, color: 'bg-orange-400' },
        { label: 'Apr', value: 81, color: 'bg-orange-400' },
        { label: 'May', value: 56, color: 'bg-orange-400' },
        { label: 'Jun', value: 55, color: 'bg-orange-400' },
        { label: 'Jul', value: 40, color: 'bg-orange-400' },
        { label: 'Aug', value: 70, color: 'bg-orange-400' },
        { label: 'Sep', value: 60, color: 'bg-orange-400' },
        { label: 'Oct', value: 75, color: 'bg-orange-400' },
        { label: 'Nov', value: 85, color: 'bg-orange-400' },
        { label: 'Dec', value: 90, color: 'bg-orange-400' },
    ];

    recentSalaries = [
        { month: 'December 2023', paid: '12-01-2024', employees: 45, amount: '$150,000', status: 'Completed' },
        { month: 'November 2023', paid: '12-12-2023', employees: 44, amount: '$148,000', status: 'Completed' },
        { month: 'October 2023', paid: '12-11-2023', employees: 42, amount: '$145,000', status: 'Completed' },
    ];

    exportReport(type: string) {
        alert(`Exporting ${type} report...`);
    }
}
