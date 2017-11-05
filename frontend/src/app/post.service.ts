import { Injectable } from '@angular/core';
import { User } from './user';
import { Post } from './post';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {

  constructor(private _http: Http) {
  }

  sendPost(post:Post) {
    console.log("Client > New post to be added > post ");
    return this._http.post('/posts/newPost', post).map(data => data.json()).toPromise();
  }

  getSelfPosts(username:String) {
    console.log("Client > Get all post of myself > username", username);
    return this._http.get('/posts/getSelfPosts/' + username).map(data => data.json()).toPromise();
  }
}
