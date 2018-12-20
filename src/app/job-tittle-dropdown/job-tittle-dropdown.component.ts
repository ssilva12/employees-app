import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-tittle-dropdown',
  templateUrl: './job-tittle-dropdown.component.html',
  styleUrls: ['./job-tittle-dropdown.component.css']
})
export class JobTittleDropdownComponent implements OnInit {

  @Input() parentForm:FormGroup

  jobsArray:string[] = [];
  
  constructor() { }

  ngOnInit() {
    this.jobsArray = this.getJobs(this.parentForm.value.area);
    this.parentForm.valueChanges.subscribe(changes => {
      this.jobsArray = this.getJobs(this.parentForm.value.area);
    });
  }

  getJobs(area:string):string[]{
    if(area=="services"){
      return ["Manager","Host","Waitress","Dining room manager"];
    }else if(area=="kitchen"){
      return ["Chef","Sous chef","Dishwasher","Cook"];
    }else{
      return [];
    }
  }
}
