import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatPricePipe } from '../../../../pipes/price/format-price.pipe';
import { FormatNamePipe } from '../../../../pipes/name/format-name.pipe';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    FormatPricePipe,
    FormatNamePipe,
    ButtonModule,
    ConfirmPopupModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @Input() product!: Product;

  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  deleteProduct() {
    this.confirmationService.confirm({
      target: this.deleteButton.el.nativeElement,
      message: 'Are you sure you want to delete the product?',
      accept: () => {
        this.delete.emit(this.product);
      },
    });
  }

  @ViewChild('deleteButton') deleteButton: any;
}
