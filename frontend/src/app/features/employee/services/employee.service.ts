import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeData } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api';

    // Get Next Employee ID based on Tier
    getNextEmpId(tier: string): Observable<string> {
        return this.http.get(`${this.apiUrl}/employee/getNextEmpId?tier=${tier}`, { responseType: 'text' });
    }

    // Global Registration (Save Employee button)
    registerEmployee(data: EmployeeData): Observable<any> {
        return this.http.post(`${this.apiUrl}/employees/register`, data);
    }

    // Modular Section Saves
    savePersonalDetails(id: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/employee/personalDetails?id=${id}`, data);
    }

    saveEmergencyContact(id: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/employee/emergencyContact?id=${id}`, data);
    }

    saveEmploymentDetails(id: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/employee/employmentDetails?id=${id}`, data);
    }

    saveBankDetails(id: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/employee/bankDetails?id=${id}`, data);
    }

    saveDocuments(id: string, formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/employee/documents?id=${id}`, formData);
    }

    saveStatus(id: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/employee/status?id=${id}`, data);
    }
}
