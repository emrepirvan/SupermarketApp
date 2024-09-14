import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ModalData } from '../../models/modal-data.model';
import { ModalMode } from '../../services/enum.service';
@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FloatLabelModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, FormsModule, DropdownModule, ToastModule],
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.scss'
})
export class ModalProductComponent {
  private messageService: MessageService = inject(MessageService);
  formBuilder: FormBuilder = inject(FormBuilder);
  @Input() modalData: ModalData = new ModalData();
  @Output() productAddedOrEdited: any = new EventEmitter();
  visible: boolean = false;
  productForm: FormGroup | undefined;

  ngOnInit(): void {
    this.modalData
    this.visible = true;
    if (this.modalData.mode == ModalMode.ADD) {
      this.productForm = this.formBuilder.group({
        id: [undefined, Validators.required],
        name: [undefined, Validators.required],
        aisle: [{ value: this.modalData.data.aisleData.aisleNumber, disabled: true }],
      })

    }
    else {
      this.productForm = this.formBuilder.group({
        id: [undefined, Validators.required],
        name: [undefined, Validators.required],
        aisleCurrent: [{ value: undefined, disabled: true }],
        marketToMove: [undefined, Validators.required],
        aisleToMove: [undefined, Validators.required],
      })
    }

  }

  onHide($event: any) {
    this.visible = false;
    this.modalData.open = false;
  }

  summitForm() {
    if (!this.productForm) return
    if (this.productForm!.valid) {
      let data = {
        newProductData: this.productForm.getRawValue(),
        aisleData: this.modalData.data.aisleData
      }
      this.productAddedOrEdited.emit(data);
      this.modalData.open = false
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Hatalı Alanları Kontrol Edin', key: 'br', life: 3000 });
      this.productForm!.markAsDirty()
      for (const formControl in this.productForm.controls) {
        this.productForm.controls[formControl].markAsDirty()
      }
    }
  }
}
