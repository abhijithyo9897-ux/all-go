import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-xl font-bold text-slate-800 tracking-tight">{{ title() }}</h2>
          @if (subtitle()) {
            <p class="text-sm text-slate-500 mt-1">{{ subtitle() }}</p>
          }
        </div>
        
        <!-- Header Actions Slot -->
        <div class="flex items-center gap-4">
          <ng-content select="[header-actions]"></ng-content>
          <!-- Save Button (Requested by User) -->
          <button class="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border-none min-w-[100px]" (click)="save.emit()">
            Save
          </button>
        </div>
      </div>
      
      <div>
        <ng-content></ng-content>
      </div>
      
      <!-- Subtle Divider -->
      <div class="h-px bg-slate-100 mt-10"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  save = output<void>();
}
