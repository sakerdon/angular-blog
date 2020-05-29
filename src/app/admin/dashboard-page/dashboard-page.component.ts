import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
// import { PostService } from '../../shared/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSubcr: Subscription;
  removeSubcr: Subscription;
  searchStr: string = '';


  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) { }

  remove(id: string) {
    // console.log('remove', id);
    this.removeSubcr = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== id);
      this.alertService.success('Success delete')
    })

  }


  ngOnInit(): void {
    this.postSubcr = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    if (this.postSubcr) {
      this.postSubcr.unsubscribe();
    }
    if (this.removeSubcr) {
      this.removeSubcr.unsubscribe();
    }
  }

}
