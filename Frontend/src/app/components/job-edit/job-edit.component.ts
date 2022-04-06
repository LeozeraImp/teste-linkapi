import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Job } from 'src/app/types/job';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})



export class JobEditComponent implements OnInit {

  
    recurrence: string = ''
    name: string  =  ''
    recurrence_value: string  =  ''
    status: boolean  = false
    fixed_schedule: Date = new Date()
    interval: Date = new Date()
    edited: boolean = false
    userId: string |undefined = ''

  
  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
    this.getJob()
  }
  

  ngOnInit(): void {
  }

  getJob() {
  
    const id = this.route.snapshot.paramMap.get('id')
    
    if(id) {
      this.apiService.getJob(id).subscribe((job: Job) => {
        this.status = job.status
        this.name = job.name
        this.recurrence = job.recurrence
        this.recurrence_value = job.recurrence_value
        this.interval = job.interval
        this.fixed_schedule = job.fixed_schedule
        this.userId = job.user_id
      }) 
    }
  }

  updateJob() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id) {
      const job: Omit<Job, 'id'> = {
        status : this.status,
        name : this.name,
        recurrence : this.recurrence,
        recurrence_value : this.recurrence_value,
        interval : this.interval,
        fixed_schedule : this.fixed_schedule,
        user_id : this.userId,
      }

      this.apiService.updateJob(id, job).subscribe((i: any) => {
        this.edited = true
      })


    }
  }


}
