import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  // apiUrl = "http://localhost:8081";
  apiUrl = "https://tiredoctorzbckend-d75275652f00.herokuapp.com"
  // apiUrl = "https://tiredoctorz-f57af3a8f34e.herokuapp.com";
  // apiUrl = "https://tiredoctorzbckend-d75275652f00.herokuapp.com";
  constructor(private http: HttpClient) {}

  addTires(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/addTires`, data);
  }

  addRims(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/addRims`, data);
  }

  addBrand(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/addBrand`, data);
  }

  getTiresDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getAllTires`);
  }

  getAllRims(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getAllRims`);
  }

  getBrands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/getAllBrands`);
  }

  deleteTires(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/deleteTires`, {"id":id});
  }

  deleteRims(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/deleteRims`, {"id":id});
  }

  updateTires(data: any): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/api/updateTires`, data);
  }

  updateRims(data: any): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/api/updateRims`, data);
  }
  deleteBrand(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/deleteBrand`, {"id":id});
  }

  updateBrand(data: any): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/api/updateBrand`, data);
  }

  addNewInvoice(data: any): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/api/addNewInvoice`, data);
  }

  getInvoiceNumber(): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/api/getInvoiceNumber`);
  }

  getUsersInvoiceList(): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/api/getInvoicedUser`);
  }
}
