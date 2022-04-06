import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Filter, OrderBy } from 'src/app/types/filters';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  orderBy: OrderBy = 'ASC'
  filter: Filter = 'name'
  limit: number = 5
  offset: number = 0
  users?: User[] 

  constructor(private apiService: ApiService) { 
    this.getAllUsers(this.orderBy, this.filter, this.limit, this.offset)
  }

  ngOnInit(): void {
  }

  getAllUsers(orderBy: OrderBy, filter : Filter, limit : number, offset : number): void {
     this.apiService.getAllUsers(orderBy, filter, limit, offset).subscribe(users => this.users = users)

  }
  
}
