import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

    private readonly baseURL: string;

    constructor(private http: HttpClient){
        this.baseURL = "http://localhost:8080/api/v1/";
    }

    getDropdownListCategory(){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL+"fetching-list-category", {
            headers: header
        });
    }   
}