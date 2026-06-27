import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-data-import',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent],
  templateUrl: './data-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataImportComponent {

  // Sheet Creator State
  sheetName = signal('New Salary Sheet');
  selectedColumns = signal<string[]>(['Employee ID', 'Name', 'Tier', 'Days Present', 'Net Salary']);
  availableColumns = ['Employee ID', 'Name', 'Tier', 'Dept', 'Days Present', 'Overtime Hrs', 'Basic Pay', 'Allowances', 'Deductions', 'Net Salary'];

  // Import State
  importedData = signal<any[]>([]);
  isDragOver = signal(false);

  toggleColumn(col: string) {
    const current = this.selectedColumns();
    if (current.includes(col)) {
      this.selectedColumns.set(current.filter(c => c !== col));
    } else {
      this.selectedColumns.set([...current, col]);
    }
  }

  // File Handling
  onDragOver(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver.set(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelected(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  processFile(file: File) {
    // Basic CSV Parser
    if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (elem: any) => {
        const text = elem.target.result;
        this.parseCSV(text);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a .csv file (Excel -> Save As -> CSV)');
    }
  }

  parseCSV(text: string) {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((h, index) => {
        row[h] = values[index];
      });
      data.push(row);
    }
    this.importedData.set(data);
  }

  // Actions
  printSheet() {
    window.print();
  }

  autoEntry() {
    if (this.importedData().length === 0) return;

    // Simulation of Auto Entry Logic
    const confirmImport = confirm(`Ready to auto-enter ${this.importedData().length} records into the system?`);
    if (confirmImport) {
      console.log('Importing records:', this.importedData());
      alert('Data successfully imported and entries created!');
      this.importedData.set([]);
    }
  }
}
