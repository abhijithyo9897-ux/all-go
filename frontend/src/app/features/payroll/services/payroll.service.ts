import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { SalarySheetRecord, LoanRecord } from '../models/payroll.model';

@Injectable({
    providedIn: 'root'
})
export class PayrollService {
    private http = inject(HttpClient);

    private mockSalaryData: SalarySheetRecord[] = [
        {
            sNo: 1, id: 'EMP001', employeeName: 'SANJAY KUMAR',
            overTimeHours: 69.40, overTimeDays: 3.00, pDays: 31.00,
            salaryPackage: 9000, basicSalary: 9000, overTimeAmount: 3399, rewardAmount: 290, prevMonthDiff: 0,
            grossSalary: 12689,
            loanInstallment: 0, advanceSalary: 5000, shortTimeAmount: 0, chqAmount: 4061, form7To22: 0, epf: 559, esi: 35,
            totalDeduction: 9655, cash: 3034
        },
        {
            sNo: 2, id: 'EMP002', employeeName: 'VINOD KUMAR',
            overTimeHours: 22.55, overTimeDays: 2.00, pDays: 28.00,
            salaryPackage: 8400, basicSalary: 7587, overTimeAmount: 1318, rewardAmount: 0, prevMonthDiff: 0,
            grossSalary: 8905,
            loanInstallment: 0, advanceSalary: 3500, shortTimeAmount: 0, chqAmount: 0, form7To22: 500, epf: 0, esi: 0,
            totalDeduction: 4000, cash: 4905
        },
        {
            sNo: 3, id: 'EMP003', employeeName: 'YOGESH KUMAR SHARMA-1',
            overTimeHours: 63.50, overTimeDays: 3.00, pDays: 31.00,
            salaryPackage: 7500, basicSalary: 7500, overTimeAmount: 2656, rewardAmount: 242, prevMonthDiff: 0,
            grossSalary: 10398,
            loanInstallment: 3000, advanceSalary: 0, shortTimeAmount: 0, chqAmount: 0, form7To22: 0, epf: 0, esi: 0,
            totalDeduction: 3000, cash: 7398
        },
        {
            sNo: 4, id: 'EMP004', employeeName: 'MO.ASHIF',
            overTimeHours: 46.55, overTimeDays: 3.00, pDays: 30.00,
            salaryPackage: 7000, basicSalary: 6774, overTimeAmount: 2002, rewardAmount: 0, prevMonthDiff: 0,
            grossSalary: 8776,
            loanInstallment: 0, advanceSalary: 3000, shortTimeAmount: 21, chqAmount: 0, form7To22: 0, epf: 0, esi: 0,
            totalDeduction: 3021, cash: 5755
        },
        {
            sNo: 5, id: 'EMP005', employeeName: 'ASHOK KUMAR',
            overTimeHours: 40.55, overTimeDays: 2.00, pDays: 29.00,
            salaryPackage: 9700, basicSalary: 9074, overTimeAmount: 2226, rewardAmount: 0, prevMonthDiff: 0,
            grossSalary: 11300,
            loanInstallment: 1000, advanceSalary: 3000, shortTimeAmount: 0, chqAmount: 3494, form7To22: 0, epf: 481, esi: 31,
            totalDeduction: 8006, cash: 3294
        },
        {
            sNo: 6, id: 'EMP006', employeeName: 'OMKAR SINGH',
            overTimeHours: 26.25, overTimeDays: 2.00, pDays: 21.00,
            salaryPackage: 7500, basicSalary: 5081, overTimeAmount: 1283, rewardAmount: 0, prevMonthDiff: 0,
            grossSalary: 6364,
            loanInstallment: 0, advanceSalary: 2500, shortTimeAmount: 0, chqAmount: 0, form7To22: 500, epf: 0, esi: 0,
            totalDeduction: 3000, cash: 3364
        },
        {
            sNo: 7, id: 'EMP007', employeeName: 'YOGENDRA',
            overTimeHours: 36.00, overTimeDays: 3.00, pDays: 29.00,
            salaryPackage: 7000, basicSalary: 6548, overTimeAmount: 1694, rewardAmount: 0, prevMonthDiff: 0,
            grossSalary: 8242,
            loanInstallment: 0, advanceSalary: 3000, shortTimeAmount: 0, chqAmount: 0, form7To22: 0, epf: 0, esi: 0,
            totalDeduction: 3000, cash: 5242
        },
        {
            sNo: 8, id: 'EMP008', employeeName: 'ROOPS KISHOR SINGH',
            overTimeHours: 55.15, overTimeDays: 3.00, pDays: 30.00,
            salaryPackage: 8000, basicSalary: 7742, overTimeAmount: 2557, rewardAmount: 0, prevMonthDiff: 0,
            grossSalary: 10299,
            loanInstallment: 0, advanceSalary: 2000, shortTimeAmount: 0, chqAmount: 3411, form7To22: 1226, epf: 469, esi: 30,
            totalDeduction: 7136, cash: 3163
        }

    ];

    getSalarySheet(): Observable<SalarySheetRecord[]> {
        return of(this.mockSalaryData).pipe(delay(500));
    }

    getLoans(): Observable<LoanRecord[]> {
        // Updated Mock Data for "Advance Salary Table"
        return of([
            {
                id: '1', serialNumber: 1, month: 'Dec 2025', totalWorkingDays: 31,
                employeeId: 'EMP001', name: 'SANJAY KUMAR', department: 'IT',
                payDays: 31, salaryPackage: 9000, advance7To22: 5000, paidAmount: 0,
                type: 'Heavy', isBlocked: false
            },
            {
                id: '2', serialNumber: 2, month: 'Dec 2025', totalWorkingDays: 31,
                employeeId: 'EMP005', name: 'ASHOK KUMAR', department: 'Production',
                payDays: 29, salaryPackage: 9700, advance7To22: 3000, paidAmount: 1000,
                type: 'Heavy', isBlocked: false
            }
        ] as LoanRecord[]).pipe(delay(500));
    }
}
