import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { ThrowStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  updateSubscr: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alertService: AlertService
  ) { }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;

    this.updateSubscr = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.success('Success');

    })
  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.postService.getById(params['id'])
    })).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

  ngOnDestroy(): void {
    if (this.updateSubscr) {
      this.updateSubscr.unsubscribe()
    }
  }
}
