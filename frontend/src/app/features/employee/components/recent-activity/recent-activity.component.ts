import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recent-activity',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white p-6 rounded-lg h-full">
      <h3 class="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
      
      <div class="space-y-6">
        <div class="flex gap-4">
          <div class="mt-1">
            <div class="w-2 h-2 rounded-full bg-slate-800 ring-4 ring-slate-100"></div>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-medium mb-1">Just now</p>
            <p class="text-sm text-slate-600">New employee Jane Doe added.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="mt-1">
            <div class="w-2 h-2 rounded-full bg-slate-800 ring-4 ring-slate-100"></div>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-medium mb-1">5 minutes ago</p>
            <p class="text-sm text-slate-600">Contact number updated for David Lee.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="mt-1">
            <div class="w-2 h-2 rounded-full bg-slate-800 ring-4 ring-slate-100"></div>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-medium mb-1">1 hour ago</p>
            <p class="text-sm text-slate-600">Resume uploaded for new hire Sarah Chen.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="mt-1">
            <div class="w-2 h-2 rounded-full bg-red-400 ring-4 ring-red-50"></div>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-medium mb-1">Yesterday</p>
            <p class="text-sm text-slate-600">Employee Mark Johnson exited due to resignation.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="mt-1">
            <div class="w-2 h-2 rounded-full bg-slate-800 ring-4 ring-slate-100"></div>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-medium mb-1">2 days ago</p>
            <p class="text-sm text-slate-600">Probation period confirmed for Emily White.</p>
          </div>
        </div>
      </div>

      <button class="w-full mt-8 text-sm text-blue-600 font-medium hover:text-blue-700">
        View All Activity
      </button>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityComponent { }
