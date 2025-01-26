import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@arslan-workspace/product';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-product-list',
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  displayToColumns: string[] = ['title', 'price', 'category', 'actions'];
  @Input() products: Product[] = [];

  @Output() deleteProduct = new EventEmitter<Product>();

  ngOnInit() {}

  delete(product: Product) {
    this.deleteProduct.emit(product);
  }
}
