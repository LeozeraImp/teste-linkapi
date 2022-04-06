import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/types/user';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  
  
    email: string = ''
    name: string  =  ''
    pass: string  =  ''
    tel: string   =  ''
    edited: boolean = false

  
  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
    this.getUser()
  }
  

  ngOnInit(): void {
  }

  getUser() {
  
    const id = this.route.snapshot.paramMap.get('id')
    
    if(id) {
      this.apiService.getUser(id).subscribe((user: User) => {
        this.email = user.email
        this.name = user.name
        this.pass = user.pass
        this.tel = user.tel
      }) 
    }
  }

  updateUser() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id) {
      const user:User = {
        name: this.name,
        pass: this.pass,
        email: this.email,
        tel: this.tel,
        id
      }

      this.apiService.updateUser(id, user).subscribe((i: any) => {
        this.edited = true
      })


    }
  }


}
