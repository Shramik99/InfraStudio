import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  selectedType: string = "UC1";
  displayedColumns: string[] = ['uid', 'url', 'datetime', 'result'];
  dataSource!: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(private api: ApiService, private dialog: MatDialog) {
   }

  changeType(){
    console.log(this.selectedType);
    if(this.selectedType == 'UC1'){
      this.displayedColumns = ['uid', 'url', 'datetime', 'result']
      this.getAllLbTest();
    }
    else if(this.selectedType == 'UC2'){
      this.displayedColumns = ['sNo', 'url', 'status', 'preProof', 'postProof']
      this.getAllURLTest();
    }
    else{
      // this.displayedColumns = ['sNo', 'path', 'createFilesTime', 'writeFilesTime', 'moveFilesTime', 'deleteFilesTime']
      this.displayedColumns = ['uid', 'path', 'datetime', 'result']
      this.getAllShareDriveTest();
    }
  }

  ngOnInit(): void {
    this.getAllLbTest();
  }

  getAllURLTest(){
    this.api.geturlReport()
    .subscribe({
      next:(res: any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error:(err)=>{
        alert("Error in fetching the test!");
      }
    })
  }

  getAllLbTest(){
    this.api.getLoadBalancingReport()
    .subscribe({
      next:(res: any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error:(err)=>{
        alert("Error in fetching the test!");
      }
    })
  }

  getAllShareDriveTest(){
    this.api.getShareDriveReport()
    .subscribe({
      next:(res: any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error:(err)=>{
        alert("Error in fetching the test!");
      }
    })
  }

  openDialog(uid:number) {
    this.dialog.open(ReportDialogComponent, {
      width:'100%',
      data:{
        uid: uid,
        selectedType:this.selectedType
      }  
    })
  }

  // mapResult (result: any){
  //   for(let i = 0; i<10; i++){
  //     let obj ={
  //       "sno": result[i][0],
  //       "output": result[i][1],
  //       "flipped": result[i][2]
  //     }
  //     let res_list = []
  //     res_list[i] = obj;
  //   }
  // }

}
