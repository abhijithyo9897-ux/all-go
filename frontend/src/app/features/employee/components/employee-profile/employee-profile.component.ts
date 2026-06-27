import { Component, inject, signal, effect, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { SidebarComponent } from '../../../../core/layout/sidebar/sidebar.component';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeaderComponent, SidebarComponent, RecentActivityComponent],
  templateUrl: './employee-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);

  // Main Form Group
  empForm!: FormGroup;

  // Signals for local state (Loading, UI states)
  isLoading = signal<boolean>(false);

  constructor() {
    this.initForm();

    // Tier Logic Effect
    effect((onCleanup) => {
      const tierControl = this.empForm.get('tier');
      if (tierControl) {
        const subscription = tierControl.valueChanges.subscribe(tier => {
          if (tier && tier.length > 0) {
            this.fetchEmployeeId(tier);
          }
        });
        onCleanup(() => subscription.unsubscribe());
      }
    });
  }

  ngOnInit(): void {
    // In a real app, you might patch existing data here if editing
  }

  private initForm() {
    this.empForm = this.fb.group({
      tier: ['', Validators.required],

      employee: this.fb.group({
        employeeId: [{ value: '', disabled: true }, Validators.required], // Read-only
        fullName: ['', Validators.required],
        gender: ['Male', Validators.required],
        dateOfBirth: ['', Validators.required],
        age: ['', Validators.required],
        salary: ['', Validators.required],
        contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        currentAddress: ['', Validators.required],
        permanentAddress: ['', Validators.required],
        bloodGroup: [''],
        maritalStatus: ['Single'],
        referencedBy: [''],
        referencedByNumber: ['']
      }),

      emergencyContacts: this.fb.array([
        this.createEmergencyContactGroup()
      ]),

      employment: this.fb.group({
        dateOfJoining: ['', Validators.required],
        department: ['', Validators.required],
        designation: ['', Validators.required],
        employmentType: ['FULL_TIME', Validators.required],
        probationPeriod: [''],
        confirmationDate: [''],
        reportingManager: [''],
        qualification: [''],
        experienceYears: [0],
        previousCompany: ['']
      }),

      bank: this.fb.group({
        aadharNumber: ['', Validators.required],
        panNumber: ['', Validators.required],
        bankAccountNo: ['', Validators.required],
        ifscCode: ['', Validators.required],
        pfNumber: [''],
        esiNumber: ['']
      }),

      documents: this.fb.group({
        // For actual file handling we might need separate state or form controls
        photo: [null],
        resume: [null]
      }),

      statusAndExit: this.fb.group({
        isActive: [true],
        exitDate: [null],
        exitReason: [''],
        remarks: ['']
      })
    });
  }

  createEmergencyContactGroup(): FormGroup {
    return this.fb.group({
      contactName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      relationship: ['', Validators.required]
    });
  }

  get emergencyContactsArray() {
    return this.empForm.get('emergencyContacts') as FormArray;
  }

  addEmergencyContact() {
    this.emergencyContactsArray.push(this.createEmergencyContactGroup());
  }

  // Business Logic: Fetch ID based on Tier
  fetchEmployeeId(tier: string) {
    this.employeeService.getNextEmpId(tier).subscribe({
      next: (id) => {
        this.empForm.get('employee.employeeId')?.setValue(id);
      },
      error: (err) => console.error('Failed to fetch ID', err)
    });
  }

  // Save Handlers
  onSaveEmployee() {
    if (this.empForm.invalid) {
      alert('Please fill all required fields correctly.');
      this.empForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    // Prepare data - enable disabled fields to include them in value
    const formData = this.empForm.getRawValue();

    this.employeeService.registerEmployee(formData).subscribe({
      next: (res) => {
        console.log('Registered successfully', res);
        alert('Employee Registered Successfully!');
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration Failed');
        this.isLoading.set(false);
      }
    });
  }

  onSaveSection(sectionName: string) {
    const empId = this.empForm.get('employee.employeeId')?.value;
    if (!empId) {
      alert('Employee ID is missing. Please select a Tier first.');
      return;
    }

    let sub$: any;
    const formData = this.empForm.getRawValue();

    switch (sectionName) {
      case 'Employee':
        sub$ = this.employeeService.savePersonalDetails(empId, formData.employee);
        break;
      case 'Emergency Contact':
        sub$ = this.employeeService.saveEmergencyContact(empId, formData.emergencyContacts);
        break;
      case 'Employment':
        sub$ = this.employeeService.saveEmploymentDetails(empId, formData.employment);
        break;
      case 'Bank':
        sub$ = this.employeeService.saveBankDetails(empId, formData.bank);
        break;
      case 'Documents':
        // Handle File Upload separately generally
        const docData = new FormData();
        // append files...
        sub$ = this.employeeService.saveDocuments(empId, docData);
        break;
      case 'Status & Exit':
        sub$ = this.employeeService.saveStatus(empId, formData.statusAndExit);
        break;
    }

    if (sub$) {
      sub$.subscribe({
        next: () => alert(`${sectionName} saved successfully!`),
        error: (err: any) => alert(`Failed to save ${sectionName}`)
      });
    }
  }
}
