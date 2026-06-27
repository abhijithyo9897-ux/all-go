import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceRecord, SHIFTS, ATTENDANCE_STATUSES } from '../../models/attendance.model';

@Component({
    selector: 'app-attendance-marking',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, DatePipe],
    templateUrl: './attendance-marking.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceMarkingComponent {
    private attendanceService = inject(AttendanceService);
    private fb = inject(FormBuilder);

    // Filter State
    currentDate = signal<string>(new Date().toISOString().split('T')[0]);
    currentShift = signal<string>('Morning');
    searchQuery = signal<string>('');

    // Data State
    isLoading = signal<boolean>(false);
    employees = signal<AttendanceRecord[]>([]);

    // Constants for Template
    shifts = SHIFTS;
    statuses = ATTENDANCE_STATUSES;

    // Form for simpler handling of multiple rows
    attendanceForm: FormGroup = this.fb.group({
        rows: this.fb.array([])
    });

    constructor() {
        // React to filter changes
        effect(() => {
            this.loadData();
        });
    }

    get rows(): FormArray {
        return this.attendanceForm.get('rows') as FormArray;
    }

    loadData() {
        this.isLoading.set(true);
        this.attendanceService.getAttendance({
            date: this.currentDate(),
            shift: this.currentShift(),
            searchQuery: this.searchQuery()
        }).subscribe({
            next: (data) => {
                this.employees.set(data);
                this.initForm(data);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error(err);
                this.isLoading.set(false);
            }
        });
    }

    initForm(data: AttendanceRecord[]) {
        this.rows.clear();
        data.forEach((emp) => {
            // Ensure logs exist (migration from simple verify)
            let logs = emp.logs || [];
            if (logs.length === 0 && emp.checkInTime) {
                logs = [{ checkIn: emp.checkInTime, checkOut: emp.checkOutTime || '' }];
            }
            if (logs.length === 0) {
                // Default empty log
                logs = [{ checkIn: '', checkOut: '' }];
            }

            const logsArray = this.fb.array(logs.map(log => this.createLogGroup(log)));

            const group = this.fb.group({
                id: [emp.id],
                employeeId: [emp.employeeId],
                employeeName: [emp.employeeName],
                designation: [emp.designation],
                avatarUrl: [emp.avatarUrl],
                status: [emp.status],
                logs: logsArray,
                shift: [emp.shift],
                notes: [emp.notes],
                totalWorkingHours: [emp.totalWorkingHours || 0],
                overTimeHours: [emp.overTimeHours || 0],
                isDirty: [false]
            });

            // Recalculate on changes
            logsArray.valueChanges.subscribe(() => {
                this.calculateHours(group);
                group.patchValue({ isDirty: true }, { emitEvent: false });
            });

            group.get('shift')?.valueChanges.subscribe(() => {
                this.calculateHours(group);
                group.patchValue({ isDirty: true }, { emitEvent: false });
            });

            this.rows.push(group);
        });
    }

    createLogGroup(log: { checkIn: string, checkOut: string }): FormGroup {
        return this.fb.group({
            checkIn: [log.checkIn],
            checkOut: [log.checkOut]
        });
    }

    getLogsArray(row: any): FormArray {
        return row.get('logs') as FormArray;
    }

    addBreak(row: any) {
        const logs = this.getLogsArray(row);
        logs.push(this.createLogGroup({ checkIn: '', checkOut: '' }));
    }

    removeBreak(row: any, index: number) {
        const logs = this.getLogsArray(row);
        logs.removeAt(index);
        this.calculateHours(row); // Recalculate after removal
    }

    calculateHours(row: FormGroup) {
        const logs = row.get('logs')?.value as any[];
        // const shiftVal = row.get('shift')?.value; // Unused 

        let totalMinutes = 0;

        logs.forEach(log => {
            if (log.checkIn && log.checkOut) {
                const start = this.parseTime(log.checkIn);
                const end = this.parseTime(log.checkOut);

                // Handle overnight shift logic if needed, simple subtraction for now
                let diff = end - start;
                if (diff < 0) {
                    // Assuming next day checkout if end < start
                    diff += 24 * 60;
                }

                if (diff > 0) totalMinutes += diff;
            }
        });

        const totalHours = parseFloat((totalMinutes / 60).toFixed(2));

        // Overtime Logic
        // Determine expected hours based on shift. 
        // Morning (9-5) = 8h. Evening (1-9) = 8h. Night (9-5) = 8h.
        const expectedHours = 8;

        const ot = Math.max(0, totalHours - expectedHours);

        row.patchValue({
            totalWorkingHours: totalHours,
            overTimeHours: parseFloat(ot.toFixed(2))
        }, { emitEvent: false });
    }

    parseTime(timeStr: string): number {
        // HH:mm -> minutes from midnight
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        return (h * 60) + m;
    }

    saveAll() {
        if (this.attendanceForm.invalid) {
            alert('Please check invalid fields');
            return;
        }

        const formValue = this.attendanceForm.getRawValue();
        const changedRows = formValue.rows.filter((r: any) => r.isDirty);

        if (changedRows.length === 0) {
            alert('No changes to save.');
            return;
        }

        this.isLoading.set(true);
        // Map back to model if needed, or send as is
        this.attendanceService.saveAttendance(changedRows).subscribe({
            next: () => {
                alert('Attendance saved successfully!');
                this.loadData(); // refresh
            },
            error: (err) => {
                console.error(err);
                alert('Failed to save changes.');
                this.isLoading.set(false);
            }
        });
    }

    onDateChange(event: Event) {
        const val = (event.target as HTMLInputElement).value;
        this.currentDate.set(val);
    }

    onShiftChange(event: Event) {
        const val = (event.target as HTMLSelectElement).value;
        this.currentShift.set(val);
    }

    onSearch(event: Event) {
        const val = (event.target as HTMLInputElement).value;
        this.searchQuery.set(val);
    }
}
