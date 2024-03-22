import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../../interfaces/product';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    RatingModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() header!: string;

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  cancel() {
    this.productForm.reset();
    this.displayChange.emit(false);
  }

  @Input() selected!: Product;
  productForm = this.formBuilder.group({
    name: ['', []],
    image: ['', []],
    price: ['', [Validators.required, this.numberValidator()]],
    rating: [0, []],
  });

  @ViewChild('form') form: any;

  numberValidator(): ValidatorFn {
    return (control) => {
      const isNumber = isNaN(control.value);
      return isNumber ? { isNumber: true } : null;
    };
  }

  @Output() confirm: any = new EventEmitter<Product>();

  onConfirm() {
    const { name, price, image, rating } = this.productForm.value;

    if (!this.form.nativeElement.classList.contains('ng-invalid')) {
      this.confirm.emit({
        id: this.selected.id,
        name: name || '',
        price: price || '',
        image: image || '',
        rating: rating || 0,
      });
      this.productForm.reset();
      this.displayChange.emit(false);
    }
  }

  ngOnChanges() {
    this.productForm = this.formBuilder.group({
      name: [this.selected.name, [Validators.required]],
      image: [this.selected.image, []],
      price: [
        this.selected.price,
        [Validators.required, this.numberValidator()],
      ],
      rating: [this.selected.rating, []],
    });
  }
}
