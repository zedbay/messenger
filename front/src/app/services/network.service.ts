import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private baseUrl: string = 'http://localhost:8085';

    constructor(private http: HttpClient) { }

    private getHeader() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : ''
        });
        return headers;
    }

    public get(url: string) {
        return this.http.get<any>(this.baseUrl + url, { headers: this.getHeader() });
    }

    public post(url: string, body: any) {
        return this.http.post<any>(this.baseUrl + url, body, { headers: this.getHeader() });
    }

    public delete(url: string) {
        return this.http.delete<any>(this.baseUrl + url, { headers: this.getHeader() });
    }
}
