import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service'
import { Employee } from '../employee';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators,ValidatorFn } from '@angular/forms';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

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
      name: new FormControl({value:this.employee.name,disabled:true},Validators.required),
      area: new FormControl({value:this.employee.area,disabled:true},Validators.required),
      Dob: new FormControl({value:this.employee.Dob,disabled:true},[Validators.required]),
      jobTittle: new FormControl({value:this.employee.jobTittle,disabled:true},Validators.required),
      country: new FormControl({value:this.employee.country,disabled:true},Validators.required),
      userName: new FormControl({value:this.employee.userName,disabled:true},[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]),
      hireDate: new FormControl({value:this.employee.hireDate,disabled:true},Validators.required),
      tipRate: new FormControl({value:this.employee.tipRate,disabled:true}),
      status: new FormControl({value:this.employee.status,disabled:true},Validators.required),
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
