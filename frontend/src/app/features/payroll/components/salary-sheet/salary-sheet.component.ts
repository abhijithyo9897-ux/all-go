import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalarySheetRecord } from '../../models/payroll.model';
import { PayrollService } from '../../services/payroll.service';

@Component({
    selector: 'app-salary-sheet',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './salary-sheet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalarySheetComponent implements OnInit {
    private payrollService = inject(PayrollService);

    salaryRecords = signal<SalarySheetRecord[]>([]);
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.isLoading.set(true);
        this.payrollService.getSalarySheet().subscribe({
            next: (data) => {
                this.salaryRecords.set(data);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load salary sheet', err);
                this.isLoading.set(false);
            }
        });
    }

    calculateTotalCash(): number {
        return this.salaryRecords().reduce((sum, record) => sum + record.cash, 0);
    }
}
