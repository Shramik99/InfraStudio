import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTableComponent } from './report-table/report-table.component';
import { TestModuleComponent } from './test-module/test-module.component';
import { TestTableComponent } from './test-table/test-table.component';

const routes: Routes = [
  {path:'test', component: TestModuleComponent},
  {path:'', redirectTo:'test', pathMatch:'full'},
  {path:'status', component: TestTableComponent},
  {path:'reports', component: ReportTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
