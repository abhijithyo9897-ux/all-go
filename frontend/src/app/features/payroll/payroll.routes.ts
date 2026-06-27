import { Routes } from '@angular/router';

export const PAYROLL_ROUTES: Routes = [
    {
        path: 'salary-sheet',
        loadComponent: () => import('./components/salary-sheet/salary-sheet.component').then(m => m.SalarySheetComponent)
    },
    {
        path: 'loan-management',
        loadComponent: () => import('./components/loan-management/loan-management.component').then(m => m.LoanManagementComponent)
    },
    {
        path: 'payslip/:id',
        loadComponent: () => import('./components/payslip-details/payslip-details.component').then(m => m.PayslipDetailsComponent)
    },
    {
        path: 'process',
        loadComponent: () => import('./components/payroll-processing/payroll-processing.component').then(m => m.PayrollProcessingComponent)
    },
    {
        path: 'reports',
        loadComponent: () => import('./components/payroll-reports/payroll-reports.component').then(m => m.PayrollReportsComponent)
    },
    {
        path: 'deductions',
        loadComponent: () => import('./components/deduction-summary/deduction-summary.component').then(m => m.DeductionSummaryComponent)
    },
    {
        path: 'deduction-rules',
        loadComponent: () => import('./components/deduction-rules/deduction-rules.component').then(m => m.DeductionRulesComponent)
    },
    {
        path: 'tiers',
        loadComponent: () => import('./components/tier-management/tier-management.component').then(m => m.TierManagementComponent)
    },
    {
        path: 'import-data',
        loadComponent: () => import('./components/data-import/data-import.component').then(m => m.DataImportComponent)
    }
];
