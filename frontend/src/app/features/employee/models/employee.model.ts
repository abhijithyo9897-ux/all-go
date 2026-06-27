export interface Employee {
  employeeId: string;
  fullName: string;
  gender: string;
  email: string;
  contactNumber: string;
  tier: string;
  referencedBy: string;
  referencedByNumber: string;
}

export interface Employment {
  department: string;
  designation: string;
  employmentType: string;
}

export interface Bank {
  aadharNumber: string;
  panNumber: string;
  bankAccountNo: string;
  ifscCode: string;
}

export interface EmergencyContact {
  contactName: string;
  contactNumber: string;
  relationship: string;
}

export interface Document {
  documentType: string;
  fileName: string;
  filePath: string;
}

export interface EmployeeData {
  employee: Employee;
  employment: Employment;
  bank: Bank;
  emergencyContacts: EmergencyContact[];
  documents: Document[];
}
