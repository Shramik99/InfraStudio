import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

export interface DetailType {
  uid: number;
  selectedType: string
}

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {


  displayedColumns: string[] = ['sno', 'output', 'flipped'];
  dataSource!: MatTableDataSource<any>;
  selectedType: string = this.data.selectedType;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(private api: ApiService, private dialogRef: MatDialogRef<ReportDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DetailType) { }

  ngOnInit(): void {
    console.log(this.data.uid)
    this.getDetailedReport()
  }


  getDetailedReport(){
    if(this.data.selectedType == "UC1"){
    this.displayedColumns = ['sno', 'output', 'flipped'];
    this.api.getDetailedLoadBalancingReport(this.data.uid)
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
  else{
    this.displayedColumns = ['sno', 'path', 'createFilesTime', 'writeFilesTime', 'moveFilesTime', 'deleteFilesTime']
    this.api.getDetailedDriveReport(this.data.uid)
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
}

  

}
