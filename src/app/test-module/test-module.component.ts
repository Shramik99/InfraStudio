import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';


export interface TestType {
  testType: 'UC1' | 'UC2' | 'UC3';
}

@Component({
  selector: 'app-test-module',
  templateUrl: './test-module.component.html',
  styleUrls: ['./test-module.component.scss']
})
export class TestModuleComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  cards = [{name:'Load Balancing Test',type:'UC1'}, 
           {name:'URL Connectivity Test', type:'UC2'}, 
           {name:'Funcitonal & Perf. Testing', type:'UC3'}];
  ngOnInit(): void {
  }

  openDialog(type:string, name: string) {
    this.dialog.open(TestDialogComponent, {
      width:'30%',
      data:{
        testType: type,
        testName: name
      }  
    })
  }
}
