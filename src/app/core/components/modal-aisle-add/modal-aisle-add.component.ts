import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ModalData } from '../../models/modal-data.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-modal-aisle-add',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, FormsModule, DropdownModule, ToastModule
  ],
  templateUrl: './modal-aisle-add.component.html',
  styleUrl: './modal-aisle-add.component.scss'
})
export class ModalAisleAddComponent implements OnInit {
  private messageService: MessageService = inject(MessageService);
  formBuilder: FormBuilder = inject(FormBuilder);
  aisleTypeData: any = ['Gıda', 'Temizlik', 'Kırtasiye', 'Kozmetik', 'Elektronik'];
  @Input() modalData: ModalData = new ModalData();
  visible: boolean = false;
  @Output() aisleAdded: any = new EventEmitter();


  aisleForm: FormGroup = this.formBuilder.group({
    aisleNumber: [{ value: undefined, disabled: true }],
    type: [undefined, Validators.required],
    marketType: [{ value: undefined, disabled: true }],
  })
  ngOnInit(): void {
    this.modalData
    this.visible = true;
    this.setDefaultValues();
  }
  setDefaultValues() {
    this.aisleForm.get('aisleNumber')?.setValue(this.modalData?.data.nextAisleNumber);
    this.aisleForm.get('marketType')?.setValue(this.modalData?.data.marketType);
  }


  onHide($event: any) {
    this.visible = false;
    this.modalData.open = false;
  }

  summitForm() {
    if (this.aisleForm.valid) {
      this.aisleAdded.emit(this.aisleForm.getRawValue())
      this.modalData.open = false
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Reyon Türü Seçiniz', key: 'br', life: 3000 });
      this.aisleForm.get('type')?.markAsDirty();
    }
  }
}
