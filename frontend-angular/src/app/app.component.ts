import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Data Gudang Product';
    productList: any[] = [];
    bsModalRef: BsModalRef = new BsModalRef
    
    constructor(private productService: ProductService, private bsModalService: BsModalService){
        this.doGetProductList();
    }

    doGetProductList(){
        this.productService.getListProducts().subscribe(data => {
          Object.assign(this.productList, data);
        }, error => {
            console.log('error ketika fetching data product', error);
        });
    }

    doPopUpModal(){
       this.bsModalRef = this.bsModalService.show(AddNewProductComponent);
       this.bsModalRef.content.event.subscribe((result: string) => {
         if (result == 'OK'){
           this.doGetProductList();
         }
       });
    }

    doPopUpDelete(id:number, name:string, category:string, price:string){
      this.bsModalRef = this.bsModalService.show(DeleteProductComponent);
      this.bsModalRef.content.id = id;
      this.bsModalRef.content.name = name;
      this.bsModalRef.content.category = category;
      this.bsModalRef.content.price = price;
      this.bsModalRef.content.event.subscribe((result: string)=> {
        console.log('delete', result);
        if(result == 'OK'){
          setTimeout(() => {
            this.productList=[];
            this.doGetProductList();
          }, 2000);
        }
      });
    }

    doPopUpEdit(id:number){
      this.bsModalRef = this.bsModalService.show(EditProductComponent);
      this.bsModalRef.content.id = id;
      this.bsModalRef.content.event.subscribe((result: string) => {
        if (result == 'OK'){
          setTimeout(() => {
            this.doGetProductList();
          }, 2000)
        }
      });
    }

}
