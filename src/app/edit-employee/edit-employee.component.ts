import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service'
import { Employee } from '../employee';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators,ValidatorFn } from '@angular/forms';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee:Employee;

  unamePattern = "^[a-zA-Z0-9]$";
  
  employeeForm:FormGroup

  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    private route: ActivatedRoute,) { }
  
    ngAfterViewInit(){
      
    }
  
    ngOnInit() {  
    this.getCountries();
    this.getEmployeeByUserName();
    this.employeeForm = new FormGroup({
      name: new FormControl(this.employee.name,Validators.required),
      area: new FormControl(this.employee.area,Validators.required),
      Dob: new FormControl(this.employee.Dob,[validateAge,Validators.required]),
      jobTittle: new FormControl(this.employee.jobTittle,Validators.required),
      country: new FormControl(this.employee.country,Validators.required),
      userName: new FormControl(this.employee.userName,[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]),
      hireDate: new FormControl(this.employee.hireDate,Validators.required),
      tipRate: new FormControl(this.employee.tipRate),
      status: new FormControl(this.employee.status,Validators.required),
    });
  }

  onSubmit(){
    this.employee=this.employeeForm.value
    this.employeeService.updateEmployee(this.employee).subscribe(
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

  getEmployeeByUserName(){
    const userName = this.route.snapshot.paramMap.get('username');
    this.employeeService.getEmployee(userName)
      .subscribe(employee => this.employee = employee);
  }
}

function validateAge(birthday) {
  var birthdayDate = new Date(birthday.value)
  var ageDifMs = Date.now() - birthdayDate.getTime();
  var ageDate = new Date(ageDifMs);
  var age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age >= 18 ? null:{'forbiddenDate': {value: false}};
}
