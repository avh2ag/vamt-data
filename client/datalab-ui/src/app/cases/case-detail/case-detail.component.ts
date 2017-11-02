import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../../config/models';
import { CasesService } from '../cases.service';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, 
  MatCheckbox, MatSnackBar } from '@angular/material';
@Component({
  selector: 'case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {
  @Input() activeCase: Case;
  editMode: boolean = false;
  constructor(private casesService: CasesService, private dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {

  }

  deleteActiveCase() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        label: this.activeCase.case_name
      }
    });
    let name = this.activeCase.case_name;
    var message;
    dialogRef.afterClosed().subscribe(decision => {
      if (decision) {
        this.casesService.deleteCase(this.activeCase.id).subscribe(resp => {
          //snackbar for successful deletion
          message = `${name} deleted.`;
        }, err => {
          message = `Error deleting ${name}`;
          //snackbar for error during delete
        }, () => { 
          this.snackbar.open(message, null, { duration: 2000 });
        });
      }
    });  
  }

  enableEditMode(): void {
  	this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }  

  save() {
    this.editMode = false;
    
  }
}
