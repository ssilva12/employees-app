import { Component, OnInit, Input } from '@angular/core';
import {EmployeeService} from '../employee.service'
import { Employee } from '../employee';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators,ValidatorFn } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})

export class NewEmployeeComponent implements OnInit {
  
  employee:Employee;

  unamePattern = "^[a-zA-Z0-9]$";
  
  employeeForm = new FormGroup({
    name: new FormControl('',Validators.required),
    area: new FormControl('services',Validators.required),
    Dob: new FormControl('',[validateAge,Validators.required]),
    jobTittle: new FormControl('Manager',Validators.required),
    country: new FormControl('Afghanistan',Validators.required),
    userName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]),
    hireDate: new FormControl('',Validators.required),
    tipRate: new FormControl(''),
    status: new FormControl('',Validators.required),
  });

  constructor(private employeeService:EmployeeService,private router: Router) { }
  
  ngOnInit() {  
    this.getCountries();
  }

  onSubmit(){
    this.employee=this.employeeForm.value
    this.employeeService.saveEmployee(this.employee).subscribe(
      employees=>this.router.navigate(['/employees']) )
  }

  countries=[]

  switchArea(area:string):void{
    this.employeeForm.value.area = area;
    console.log(this.employeeForm.value);
  }

  getCountries() {
    this.employeeService.getCountries().subscribe((result) => {
      this.countries=result.map((country)=>country.name);
    }, (err) => {
      console.log(err);
    });
  }
}

function validateAge(birthday) {
  var birthdayDate = new Date(birthday.value)
  var ageDifMs = Date.now() - birthdayDate.getTime();
  var ageDate = new Date(ageDifMs);
  var age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age >= 18 ? null:{'forbiddenDate': {value: false}};
}




