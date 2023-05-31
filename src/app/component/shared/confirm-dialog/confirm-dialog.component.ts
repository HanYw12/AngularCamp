import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { htmlCode: string ,initialValues :any }) { }

  ngOnInit(): void {
  }

  onClickNo():void{
    this.dialogRef.close();
  }

  get htmlCode(): string {
    return this.data.htmlCode;
  }
}
