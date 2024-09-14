import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FloatLabelModule],
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.scss'
})
export class ModalProductComponent {

  ngOnInit(): void {
    this.modalData
    this.visible = true;
  }
  @Input() modalData: any = {};
  visible: boolean = false;


  onHide($event: any) {
    this.visible = false;
    this.modalData.open = false;
  }
}
