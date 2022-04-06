import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Filter, OrderBy } from '../types/filters';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { Job } from '../types/job';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiurl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getAllUsers(orderBy: OrderBy, filter: Filter, limit: number, offset: number): Observable<User[]> {
    const params = {
      orderBy,
      filter,
      limit,
      offset
    }
    return this.http.get<User[]>(`${this.apiurl}/users?${JSON.stringify(params)}`)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiurl}/users/${id}`)
  }

  updateUser(id: string, data: User) {
    return this.http.put(`${this.apiurl}/users/${id}`,data)
  }

  updateJob(id: string, data: Omit<Job, "id">) {
    return this.http.put(`${this.apiurl}/jobs/${id}`,data)
  }

  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiurl}/jobs/${id}`)
  }

  getAllJobs(orderBy: OrderBy, filter: Filter, limit: number, offset: number): Observable<Job[]> {
    const params = {
      orderBy,
      filter,
      limit,
      offset
    }
    return this.http.get<Job[]>(`${this.apiurl}/jobs?${JSON.stringify(params)}`)
  }
}
