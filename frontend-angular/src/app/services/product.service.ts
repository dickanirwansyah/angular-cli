import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable()
export class ProductService {

    private readonly baseURL: string;
    productIdSource = new BehaviorSubject<number>(0);
    productIdData: any;

    constructor(private http: HttpClient){
        this.baseURL = "http://localhost:8080/api/v1/";
        this.productIdData = this.productIdSource.asObservable();
    }

    getListProducts() {
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL+"fetching-products", {
            headers: header
        });
    }

    getSaveProduct(product: any, categoryId: number){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.post(this.baseURL+"save-products?categoryId="+categoryId, product, {
            headers: header
        });
    }

    getCurrentProduct(productId: number){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.get(this.baseURL+"get-product-by-id?productId="+productId);
    }

    getDeleteProduct(productId: number){
        let header = new HttpHeaders();
        header.append('Content-Type', 'applications/json');
        return this.http.delete(this.baseURL+"delete-product?productId="+productId);
    }
}