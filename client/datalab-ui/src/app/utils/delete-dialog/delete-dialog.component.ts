import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  	private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  	console.log(this.data);
  }

  confirm() {
  	this.dialogRef.close(true);
  }

  cancel() {
  	this.dialogRef.close(false);
  }

}
