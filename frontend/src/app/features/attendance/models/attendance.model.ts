export interface TimeLog {
    checkIn: string; // HH:mm
    checkOut: string; // HH:mm
}

export interface AttendanceRecord {
    id?: string;
    employeeId: string;
    employeeName: string;
    designation: string;
    avatarUrl?: string;
    status: 'Present' | 'Late' | 'Absent' | 'Half Day' | 'On Leave';

    // Legacy support or primary session
    checkInTime?: string;
    checkOutTime?: string;

    // New: Multiple sessions for breaks
    logs: TimeLog[];

    shift: string;
    notes?: string;

    // Calculated
    totalWorkingHours: number; // in hours (e.g. 8.5)
    overTimeHours: number; // in hours

    isSynced?: boolean;
}

export interface AttendanceFilter {
    date: string;
    shift: string;
    searchQuery: string;
}

export const SHIFTS = [
    { label: 'Morning (9 AM - 5 PM)', value: 'Morning' },
    { label: 'Evening (1 PM - 9 PM)', value: 'Evening' },
    { label: 'Night (9 PM - 5 AM)', value: 'Night' }
];

export const ATTENDANCE_STATUSES = [
    'Present',
    'Late',
    'Absent',
    'Half Day',
    'On Leave'
];
