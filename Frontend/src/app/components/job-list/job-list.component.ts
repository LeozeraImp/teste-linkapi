import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Filter, OrderBy } from 'src/app/types/filters';
import { Job } from 'src/app/types/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  orderBy: OrderBy = 'ASC'
  filter: Filter = 'name'
  limit: number = 5
  offset: number = 0
  jobs?: Job[] 

  constructor(private apiService: ApiService) { 
    this.getAllJobs(this.orderBy, this.filter, this.limit, this.offset)
  }

  ngOnInit(): void {
  }

  getAllJobs(orderBy: OrderBy, filter : Filter, limit : number, offset : number): void {
     this.apiService.getAllJobs(orderBy, filter, limit, offset).subscribe(jobs => this.jobs = jobs)

  }

}
