import { Injectable } from '@angular/core';
import {Employees} from './mock-employees'
import {Employee} from './employee'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployees():Observable<Employee[]>{
    return of(Employees);
  }

  endpoint = 'https://restcountries.eu/rest/v2/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  getCountries(): Observable<any> {
    return this.http.get(this.endpoint + 'all').pipe(
      map(this.extractData));
  }

  saveEmployee(employee:Employee): Observable<any>{
    Employees.push(employee);
    return of(employee);
  }

  updateEmployee(employee:Employee): Observable<any>{
    var objIndex = Employees.findIndex((obj => obj.userName == employee.userName));
    Employees[objIndex] = employee
    return of(employee);
  }

  getEmployee(userName:String):Observable<Employee>{
    return of(Employees.find(employee => employee.userName === userName))
  }

  deleteEmployee(employee:Employee):Observable<Employee[]>{
    var objIndex = Employees.findIndex((obj => obj.userName == employee.userName));
    Employees.splice(objIndex, 1);
    return of(Employees)
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
