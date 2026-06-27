import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-payslip-details',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './payslip-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayslipDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);

    payslipId = signal<string | null>(null);

    // Mock Data matching the image
    employee = {
        name: 'Anika Geidt',
        role: 'UI Designer'
    };

    payslipData = {
        grossSalary: '540.00',
        basicSalary: '120.00',
        transportAllowance: '1,500.00',
        houseRentAllowance: '1,500.00',
        specialAllowance: '1,500.00',
        netPay: '6540.00',
        paidDays: 26,
        lopDays: 0
    };

    deductions = {
        providentFund: '560.00',
        professionalTax: '560.00',
        tds: '560.00',
        totalDeductions: '1680.00'
    };

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.payslipId.set(params.get('id'));
        });
    }

    downloadPayslip() {
        alert("Downloading Payslip...");
    }
}
