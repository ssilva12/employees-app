import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  employees=[]
  employeesAux = []

  search:string

  constructor(private employeeServices:EmployeeService) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees():void{
    this.employeeServices.getEmployees().subscribe(employees=>
      this.employees = employees
     )
  }

  deleteEmployee(employee:Employee):void{
    this.employeeServices.deleteEmployee(employee).subscribe(employees=>this.employees = employees )
  }

  searchEmployees():void{
    if(this.search==""){
      this.getEmployees()
    }else{
      this.employees=this.employees.filter(emp => emp.name.toLowerCase() == this.search.toLowerCase())
    }
  }
  //volver funcion como un custom pipe
  getAge(birthday) {
    var birthdayDate = new Date(birthday)
    var ageDifMs = Date.now() - birthdayDate.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
}
