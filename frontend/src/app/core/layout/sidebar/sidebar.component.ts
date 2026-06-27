import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- 
      State: CLOSED 
      Show "HR Sync" Glass Bar / Button 
    -->
    <div *ngIf="!isOpen()" class="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-6 z-50 transition-all duration-300">
       
       <!-- Glass Bar Background -->
       <div class="absolute inset-0 bg-white/10 backdrop-blur-md border-r border-white/20 shadow-lg"></div>

       <!-- Toggle Button -->
       <button (click)="toggle()" class="relative z-10 w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:rotate-90 transition-transform duration-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
       </button>
       
       <div class="relative z-10 mt-auto mb-4 -rotate-90 text-slate-500 font-bold tracking-widest text-xs whitespace-nowrap">
           HR SYNC
       </div>

    </div>


    <!-- 
      State: OPEN 
      Full Sidebar with Glass Effect 
    -->
    <div *ngIf="isOpen()" class="fixed inset-0 z-50 flex">
      
      <!-- Backdrop -->
      <div (click)="toggle()" class="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"></div>
      
      <!-- Sidebar Content -->
      <div class="relative w-72 h-full bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col font-sans slide-in-left">
          
          <!-- Header -->
          <div class="p-6 flex items-center justify-between mb-2 border-b border-slate-100/50">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </div>
                <span class="text-lg font-bold text-slate-800 tracking-tight">HRSync</span>
            </div>
            <button (click)="toggle()" class="btn btn-sm btn-circle btn-ghost text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            
            <a routerLink="/attendance/daily-marking" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
               Daily Marking
            </a>

            <a routerLink="/dashboard" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
              Dashboard
            </a>

            <a routerLink="/calendar" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
              Calendar View
            </a>

            <a routerLink="/employee" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
              Employee List
            </a>

            <div class="px-3 pt-6 pb-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Payroll Management</span>
            </div>

            <!-- New Tier Management Link -->
            <a routerLink="/payroll/tiers" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                Tier Specification
            </a>

            <a routerLink="/payroll/salary-sheet" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                Salary Sheet
            </a>

            <!-- New Import Link -->
            <a routerLink="/payroll/import-data" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Import & Print
            </a>

            <a routerLink="/payroll/loan-management" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                Advance/Loans
            </a>

            <a routerLink="/payroll/process" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                Payroll Processing
            </a>

            <a routerLink="/payroll/reports" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                Payroll Reports
            </a>

            <a routerLink="/payroll/deductions" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                Deduction Summary
            </a>

            <a routerLink="/payroll/deduction-rules" (click)="toggle()" routerLinkActive="bg-slate-100 text-slate-900" class="flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all group">
                Deduction Rules
            </a>

          </nav>
      </div>
    </div>
  `,
  styles: [`
    .slide-in-left {
        animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }
}
