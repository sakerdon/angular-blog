import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, FbCreateResponse } from './interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(
        private http: HttpClient
    ) { }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(environment.DbUrl + '/posts/' + post.id + '.json', post)
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(environment.DbUrl + '/posts/' + id + '.json')
            .pipe(map((post: Post) => {
                return {
                    ...post,
                    id,
                    date: new Date()
                }
            }))
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(environment.DbUrl + '/posts/' + id + '.json')
    }

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

    getAll(): Observable<Post[]> {
        return this.http.get(environment.DbUrl + '/posts.json')
            .pipe(map((res: { [key: string]: any }) => {
                return Object.keys(res).map(key => ({
                    ...res[key],
                    id: key,
                    date: new Date(res[key].date)
                }))
            }))
    }
}