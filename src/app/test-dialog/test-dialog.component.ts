import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import  Swal  from 'sweetalert2';

export interface TestType {
  testType: string;
  testName: string;
}
@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent implements OnInit {


  myDate: any = new Date();
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<TestDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TestType, public datePipe: DatePipe) {
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   };
 
  
  cardName = this.data.testName;
  testForm !: FormGroup;
  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      testInput : ['', Validators.required],
      testType : this.data.testType,
      date : this.myDate,
      status : "Pending"
    })
  }

  addTest(){
    if(this.testForm.valid){
      this.api.postTest(this.testForm.value)
      .subscribe({
        next: (res)=>{
          this.testForm.reset(); 
          Swal.fire(
            'Submitted Successfully',
            '',
            'success'
          );
          this.dialogRef.close('save');
          this.api.initialiseTest()
          .subscribe({
            next: (res)=>{
              console.log(res);
            },
            error: ()=>{
              alert("Unsuccessfull");
            }
          })

        },
        error:()=>{
          Swal.fire(
            'There was an error initiating test',
            '',
            'error'
          );
        }
      })
    }
  }


}
