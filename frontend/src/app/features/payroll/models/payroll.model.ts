export type SalaryTier = 'Tier A' | 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';

export interface SalaryStructure {
    basicSalary: number;
    dailyRate?: number;
    hourlyRate?: number;
}

// Updated to match "Advance Salary Table" requirements
export interface LoanRecord {
    id: string;
    serialNumber: number;
    month: string; // e.g. "Dec 2025"
    totalWorkingDays: number;

    employeeId: string; // Employee code
    name: string;
    department: string;

    payDays: number;
    salaryPackage: number;

    advance7To22: number; // "Advance from 7 to 22"
    paidAmount: number; // "Paid Amount"

    // Internal fields for logic (optional now or kept for form)
    type?: 'Heavy' | 'Low';
    monthlyDeductionType?: 'Auto' | 'Block';
    autoDeductionAmount?: number;
    isBlocked?: boolean;
}

export interface SalarySheetRecord {
    sNo: number;
    id: string;
    employeeName: string;
    overTimeHours: number;
    overTimeDays: number;
    pDays: number;
    salaryPackage: number;
    basicSalary: number;
    overTimeAmount: number;
    rewardAmount: number;
    prevMonthDiff: number;
    grossSalary: number;
    loanInstallment: number;
    advanceSalary: number;
    shortTimeAmount: number;
    chqAmount: number;
    form7To22: number;
    epf: number;
    esi: number;
    totalDeduction: number;
    cash: number;
}

export const SALARY_TIERS = [
    { label: 'Tier A - Default Salary', value: 'Tier A' },
    { label: 'Tier 1 - 7th of Month Salary', value: 'Tier 1' },
    { label: 'Tier 2 - 7th & 22nd (Salary + Advance)', value: 'Tier 2' },
    { label: 'Tier 3 - 7th & 22nd (Salary + Advance + OT)', value: 'Tier 3' },
    { label: 'Tier 4 - Daily/Weekly', value: 'Tier 4' }
];
