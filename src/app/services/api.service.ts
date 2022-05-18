import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postTest(data : any){
    return this.http.post<any>("http://localhost:8080/api/save_test", data);
  }

  getTest(){
    return this.http.get("http://localhost:8080/api/test");
  }

  geturlReport(){
    return this.http.get("http://localhost:8080/api/URLReports");
  }

  getLoadBalancingReport(){
    return this.http.get("http://localhost:8080/api/LoadBalancingTest");
  }

  getShareDriveReport(){
    return this.http.get("http://localhost:8080/api/ShareDriveReport");
  }

  initialiseTest(){
    return this.http.get('http://127.0.0.1/ALLUC');
  }
}
