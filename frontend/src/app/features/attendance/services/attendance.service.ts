import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceRecord, AttendanceFilter } from '../models/attendance.model';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/attendance';

    getAttendance(filter: AttendanceFilter): Observable<AttendanceRecord[]> {
        const params: any = {
            date: filter.date,
            shift: filter.shift
        };
        if (filter.searchQuery) {
            params.search = filter.searchQuery;
        }
        return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/daily`, { params });
    }

    saveAttendance(records: AttendanceRecord[]): Observable<any> {
        return this.http.post(`${this.apiUrl}/save-daily`, records);
    }
}
