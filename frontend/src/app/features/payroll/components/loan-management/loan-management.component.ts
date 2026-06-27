import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanRecord } from '../../models/payroll.model';
import { PayrollService } from '../../services/payroll.service';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';

@Component({
    selector: 'app-loan-management',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
    templateUrl: './loan-management.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanManagementComponent implements OnInit {
    private fb = inject(FormBuilder);
    // In a real scenario we'd use the service, but for UI refactor we might stick to local mock if service fails or is incomplete
    // private payrollService = inject(PayrollService); 

    // UI Signal State
    showAdvanceForm = signal<boolean>(false);
    loans = signal<LoanRecord[]>([
        {
            id: '1',
            serialNumber: 1,
            month: 'Dec 2025',
            totalWorkingDays: 31,
            employeeId: 'EMP001',
            name: 'SANJAY KUMAR',
            department: 'IT',
            payDays: 31,
            salaryPackage: 9000,
            advance7To22: 5000,
            paidAmount: 0,
            type: 'Low',
            monthlyDeductionType: 'Auto',
            autoDeductionAmount: 500,
            isBlocked: false
        },
        {
            id: '2',
            serialNumber: 2,
            month: 'Dec 2025',
            totalWorkingDays: 31,
            employeeId: 'EMP005',
            name: 'ASHOK KUMAR',
            department: 'Production',
            payDays: 29,
            salaryPackage: 9700,
            advance7To22: 3000,
            paidAmount: 1000,
            type: 'Low',
            monthlyDeductionType: 'Auto',
            autoDeductionAmount: 300,
            isBlocked: false
        }
    ]);
    isLoading = signal<boolean>(false);

    advanceForm: FormGroup = this.fb.group({
        employeeId: ['', Validators.required],
        type: ['Low', Validators.required],
        amount: [0, [Validators.required, Validators.min(1)]],
        deductionType: ['Auto', Validators.required],
        autoDeductionAmount: [0]
    });

    constructor() {
        this.advanceForm.get('deductionType')?.valueChanges.subscribe(val => {
            if (val === 'Auto') {
                this.advanceForm.get('autoDeductionAmount')?.setValidators([Validators.required, Validators.min(1)]);
            } else {
                this.advanceForm.get('autoDeductionAmount')?.clearValidators();
            }
            this.advanceForm.get('autoDeductionAmount')?.updateValueAndValidity();
        });
    }

    ngOnInit() {
        // this.loadData();
    }

    loadData() {
        // Mock data loading
    }

    onSaveLoan() {
        if (this.advanceForm.invalid) return;

        const val = this.advanceForm.value;
        const newLoan: LoanRecord = {
            id: Math.random().toString(36).substr(2, 9),
            serialNumber: this.loans().length + 1,
            month: 'Dec 2025',
            totalWorkingDays: 31,
            employeeId: val.employeeId,
            name: 'New Employee',
            department: 'General',
            payDays: 0,
            salaryPackage: 0,
            advance7To22: val.amount,
            paidAmount: 0,
            type: val.type,
            monthlyDeductionType: val.deductionType,
            autoDeductionAmount: val.autoDeductionAmount,
            isBlocked: val.deductionType === 'Block'
        };

        this.loans.update(list => [...list, newLoan]);
        this.showAdvanceForm.set(false);
        this.advanceForm.reset({ type: 'Low', deductionType: 'Auto' });
        alert('Advance/Loan Assigned Successfully');
    }
}
