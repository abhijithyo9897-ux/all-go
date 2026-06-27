import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-deduction-rules',
    standalone: true,
    imports: [CommonModule, SidebarComponent, FormsModule],
    templateUrl: './deduction-rules.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeductionRulesComponent {

    activeTab = signal<'Rules' | 'Allowances'>('Rules');
    showForm = signal(false);

    toggleForm() {
        this.showForm.update(v => !v);
    }

    rules = [
        { id: 1, name: 'Standard Provident Fund (PF)', type: 'Percentage', value: '12%', criteria: 'Basic Salary > 15000', isActive: true },
        { id: 2, name: 'ESI Contribution', type: 'Percentage', value: '0.75%', criteria: 'Gross Salary < 21000', isActive: true },
        { id: 3, name: 'Professional Tax (PT)', type: 'Fixed', value: '200', criteria: 'State Law', isActive: true },
        { id: 4, name: 'TDS Slab 1', type: 'Percentage', value: '5%', criteria: 'Annual > 5L', isActive: false },
    ];

    allowances = [
        { id: 1, name: 'House Rent Allowance (HRA)', type: 'Percentage', value: '40%', criteria: 'Basic Salary', isActive: true },
        { id: 2, name: 'Transport Allowance', type: 'Fixed', value: '1600', criteria: 'All Employees', isActive: true },
        { id: 3, name: 'Special Allowance', type: 'Residual', value: 'Balance', criteria: 'CTC Structure', isActive: true },
    ];

    setTab(tab: 'Rules' | 'Allowances') {
        this.activeTab.set(tab);
    }

    toggleRule(id: number) {
        console.log('Toggle rule', id);
    }

    editRule(id: number) {
        console.log('Edit rule', id);
    }
}
