import {Component, Inject, Injectable} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
templateUrl:  'message.component.html'
})
export  class  MessageComponent {
    constructor(private  dialogRef:  MatDialogRef<MessageComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any,private router : Router) {
    }
    public  closeMe() {
        this.dialogRef.close();
    }
}