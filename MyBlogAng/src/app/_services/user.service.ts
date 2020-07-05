import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User, Expense } from '../_models';
//import { AppSettings }   from '../shared/appsettings';
//import { AppSettingsService }  from '../shared/appsettings.service';
import { GlobalConstants } from '../shared/global-constants';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UserService {
  //settings: AppSettings;
  rolel: string = 'No';
  apiURL = GlobalConstants.apiURL;
  apiURLUptoAPI = GlobalConstants.apiURLUptoAPI;
  constructor(private http: HttpClient) { }

    getAll() {
      //return this.http.get<User[]>(this.settings.apiUrl+'/users');
      return this.http.get<User[]>(this.apiURL);
  }
  getAllTransaction() {
    //return this.http.get<User[]>(this.settings.apiUrl+'/users');
    return this.http.get<Expense[]>(this.apiURLUptoAPI);
  }
  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post('http://localhost:1158/api/Products/' + 'UploadExcel', formData, httpOptions)
  }

  createStudent(employee: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(this.apiURL,employee, httpOptions);

    //return this.http.post<User>(this.apiURL + '/InsertEmployeeDetails/',
    //  employee, httpOptions);
  }
  updateStudent(id:number,employee: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<User>('http://localhost:1158/api/Products?id=' + id, employee, httpOptions);
  }
  deleteEmployeeById(employeeid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>('http://localhost:1158/api/Products' + '/DeleteEmployeeDetails?id=' + employeeid,
      httpOptions);
  }
  //deleteEmployeeById(employeeid: string): Observable<number> {
  //  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //  return this.http.delete<number>(this.url + '/DeleteEmployeeDetails?id=' + employeeid,
  //    httpOptions);
  //}  

  deleteStudentById(employeeid: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>('http://localhost:1158/api/Products?id='+employeeid, httpOptions);
  }  

    //getById(id: number) {
    //    return this.http.get(`${config.apiUrl}/users/${id}`);
    //}

    //register(user: User) {
    //    return this.http.post(`${config.apiUrl}/users/register`, user);
    //}

    //update(user: User) {
    //    return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    //}

    //delete(id: number) {
    //    return this.http.delete(`${config.apiUrl}/users/${id}`);
    //}
}
