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
import { MarketType, ModalMode } from '../../services/enum.service';
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
  marketTypeData: any[] = [MarketType.A, MarketType.B]
  aisleTypeData: any = ['Gıda', 'Temizlik', 'Kırtasiye', 'Kozmetik', 'Elektronik'];
  matchedAisleTypeOfMarketData: any[] = [];

  ngOnInit(): void {

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
        id: [{ value: this.modalData.data.selectedProduct.id, disabled: true }],
        name: [this.modalData.data.selectedProduct.name, Validators.required],
        aisleCurrent: [{ value: this.modalData.data.aisleData.type, disabled: true }],
        marketToMove: [undefined],
        aisleToMove: [undefined],
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
      if (this.modalData.mode == ModalMode.ADD) {
        let data = {
          newProductData: this.productForm.getRawValue(),
          aisleData: this.modalData.data.aisleData
        }
        this.productAddedOrEdited.emit(data);
      }
      else {
        let data = {
          editedProduct: this.productForm.getRawValue(),
          aisleData: this.modalData.data.aisleData
        }
        this.productAddedOrEdited.emit(data);
      }

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

  changeMarket($event: any) {
    if ($event.value == MarketType.A) {
      this.matchedAisleTypeOfMarketData = this.modalData?.data?.availableAislesOfMarketA || []
    } else if ($event.value == MarketType.B) {
      this.matchedAisleTypeOfMarketData = this.modalData?.data?.availableAislesOfMarketB || []
    }
    else {
      this.matchedAisleTypeOfMarketData = [];
    }
  }

  deleteProduct() {
    let data = {
      deletedProduct: this.productForm!.getRawValue(),
      aisleData: this.modalData.data.aisleData,

    }
    this.productAddedOrEdited.emit(data);
    this.modalData.open = false
  }
}
