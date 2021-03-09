import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  addNewProductForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private bsModalRef: BsModalRef,
    private builder: FormBuilder
    ) {
        this.addNewProductForm = this.builder.group({
          name: new FormControl('', []),
          price: new FormControl('', []),
          category: new FormControl(null, [])
        })
    }

  dropdownListCategory: any[] = [];

  ngOnInit(): void {
    this.doDropdownListCategory();
  }

  doDropdownListCategory(){
    this.categoryService.getDropdownListCategory().subscribe(data => {
      Object.assign(this.dropdownListCategory, data)
    }, error => {
        console.log('error load dropdown category');
    });
  }

  doSaveProduct(){
    let postProduct = {
      'name' : this.addNewProductForm.get('name')?.value,
      'category' : this.addNewProductForm.get('category')?.value,
      'price' : this.addNewProductForm.get('price')?.value
    };
    this.productService.getSaveProduct(postProduct, this.addNewProductForm.get('category')?.value)
      .subscribe(data => {
        console.log("test save "+data);
        if(data!=null){
          this.event.emit('OK');
          this.bsModalRef.hide();
        }
      })
  }

  doCloseModal(){
    this.bsModalRef.hide();
  }

}
