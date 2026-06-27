import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

interface TierRule {
  id: string;
  name: string;
  description: string;
  paymentCycle: string;
  salaryType: 'Monthly' | 'Daily' | 'Hourly' | 'PieceRate';
  features: string[];
}

@Component({
  selector: 'app-tier-management',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent],
  templateUrl: './tier-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierManagementComponent {

  tiers = signal<TierRule[]>([
    {
      id: 'A',
      name: 'Tier A',
      description: 'Standard Monthly Salary',
      paymentCycle: 'Monthly',
      salaryType: 'Monthly',
      features: ['Default Salary', 'Irrespective of Attendance']
    },
    {
      id: 'B',
      name: 'Tier B',
      description: '7th of the Month',
      paymentCycle: 'Monthly (7th)',
      salaryType: 'Monthly',
      features: ['Attendance Based', 'Salary on 7th']
    },
    {
      id: 'C',
      name: 'Tier C',
      description: 'Salary + Advance',
      paymentCycle: 'Bi-Monthly (7th & 22nd)',
      salaryType: 'Monthly',
      features: ['Advance on 22nd', 'Salary on 7th']
    },
    {
      id: 'D',
      name: 'Tier D',
      description: 'Salary + Advance + Overtime',
      paymentCycle: 'Bi-Monthly',
      salaryType: 'Monthly',
      features: ['Overtime Calculation', 'Advance', 'Check-in based OT']
    },
    {
      id: 'E',
      name: 'Tier E',
      description: 'Daily / Weekly Wages',
      paymentCycle: 'Weekly',
      salaryType: 'Daily',
      features: ['Product/Piece Count', 'Daily/Hourly Rate']
    }
  ]);

  selectedTier = signal<TierRule | null>(null);

  calculationMethods = [
    { value: 'monthly_fixed', label: 'Monthly Fixed (No Attendance)' },
    { value: 'monthly_attendance', label: 'Monthly (Attendance Based)' },
    { value: 'monthly_overtime', label: 'Monthly + Overtime Rules' },
    { value: 'daily_piece', label: 'Piece Rate / Product Count' },
    { value: 'hourly_contract', label: 'Hourly / Contract Based' }
  ];

  selectTier(tier: TierRule) {
    this.selectedTier.set(tier);
  }

  saveConfiguration() {
    // Mock save
    alert(`Configuration for ${this.selectedTier()?.name} saved!`);
  }
}
