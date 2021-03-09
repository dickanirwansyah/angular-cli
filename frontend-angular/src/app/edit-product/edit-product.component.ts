import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id!:number;

  constructor(
    private productService: ProductService, 
    private categoryService:CategoryService,
    private bsModalRef: BsModalRef,
    private builder:FormBuilder
    ) { }

  ngOnInit(): void {
  }

}
