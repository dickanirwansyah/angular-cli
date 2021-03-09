import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  
  id!: number;
  name!: string;
  category!: string;
  price!: string;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private productService: ProductService, private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
  }

  doDeleteProduct(){
    this.productService.getDeleteProduct(this.id).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  doClosePopUpModal(){
    this.bsModalRef.hide();
  }

}
