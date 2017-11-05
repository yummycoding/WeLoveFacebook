import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  post: Post = new Post();
  currentuser: any = JSON.parse(localStorage.getItem("currentUser"));
  cur_username: String = '';  
  spaceScreens: Array<any> = [];
  start = 0;
  end = 0;
  pageIndex = 0;
  pageSize = 2;
  pageSizeOptions = [1, 2, 5, 10];
  
  constructor(private userService: UserService, private postService: PostService, private http: Http) {
    this.http.get('assets/mock-data-home/data.json')
    .map(response => response.json().screenshots)
    .subscribe(res => this.spaceScreens = res);
  }

  ngOnInit() {
    // get current user name, currentuser stored in local storage is different, signup without token, sinin with,
    // so need the if clause to get username
    if('token' in this.currentuser){
      this.cur_username = this.currentuser.user.username;
    }else {
      this.cur_username = this.currentuser.username;
    };

    this.end = this.start + this.pageSize;
  }

  sendPost() {
    this.post.title = 'wedontneedtitle';
    this.post.createdBy = this.cur_username;
    this.postService.sendPost(this.post);
    this.post = new Post();
  }

  // count() {
  //   return this.spaceScreens.length;
  // }

  likeMe(i) {
    if (this.spaceScreens[i].liked !== 1) {
      this.spaceScreens[i].liked = 1;
    } else {
      this.spaceScreens[i].liked = 0;
    }
  }

  // deleteMe(i) {
  //   this.spaceScreens.splice(i, 1);
  //   console.log(i);
  // }

  commentMe(i) {

  }

  shareMe(i) {

  }

  pageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.start = (this.pageIndex + 1) * this.pageSize - this.pageSize;
    this.end = (this.pageIndex + 1) * this.pageSize;
  }

}
