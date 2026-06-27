import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';

@Component({
    selector: 'app-deduction-summary',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './deduction-summary.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeductionSummaryComponent {

    deductionStats = {
        total: '2,456,120',
        pf: '845,150',
        tds: '1,210,000',
        esi: '345,560',
        pt: '55,410'
    };

    recentTransactions = [
        { id: 1, name: 'Alice Johnson', type: 'Provident Fund', amount: '845.00', date: '2024-03-20', status: 'Approved', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
        { id: 2, name: 'Bob Smith', type: 'TDS Deduction', amount: '120.00', date: '2024-03-19', status: 'Pending', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
        { id: 3, name: 'Charlie Brown', type: 'ESI Contribution', amount: '345.00', date: '2024-03-18', status: 'Approved', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
        { id: 4, name: 'David Lee', type: 'Professional Tax', amount: '55.00', date: '2024-03-17', status: 'Rejected', avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
    ];

}
