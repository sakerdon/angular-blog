import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, FbCreateResponse } from './interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(
        private http: HttpClient
    ) { }

    create(post: Post): Observable<Post> {
        return this.http.post(environment.DbUrl + '/posts.json', post)
            .pipe(map((res: FbCreateResponse) => {
                return {
                    ...post,
                    id: res.name,
                    date: new Date()
                }
            }))
    }
}