import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Task} from '../model/task';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoRestService {
  id: number;
  url: "http://jsonplaceholder.typicode.com/users";

  constructor(private http: Http) { }

  getAll(): Promise<Task[]> {
     return this.http.get("http://jsonplaceholder.typicode.com/users")
       .toPromise()
       .then(response => response.json())
       .catch(this.handleError);
  }

 add(name: string): Promise<Task> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("https://jsonplaceholder.typicode.com/todos/XXX", new Task(null, name, false), options)
            .toPromise()
            .then(response => response.json() as Task)
            .catch(this.handleError);
 }

 updateDone(id: string, isDone: boolean): Promise<void> {

   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });

  return this.http.put("https://jsonplaceholder.typicode.com/todos/XXX", {isDone: isDone}, options )
             .toPromise()
             .then(response => response.json() as Task)
             .then(response => Promise.resolve())
             .catch(this.handleError);
 }


 delete(id: string): Promise<void> {

   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });

   return this.http.delete("https://jsonplaceholder.typicode.com/todos/XXX", options )
             .toPromise()
             .then(response => Promise.resolve())
             .catch(this.handleError);
 }


 update(task: Task): Promise<void> {

   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });

  return this.http.put("https://jsonplaceholder.typicode.com/todos/XXX"+ task.id, {name: task.getName()}, options )
             .toPromise()
             .then(response => response.json() as Task)
             .then(response => Promise.resolve())
             .catch(this.handleError);
 }


  handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for demo purposes only
     return Promise.reject(error.message || error);
  }



}
