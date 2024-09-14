import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-modal-aisle-add',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FloatLabelModule
  ],
  templateUrl: './modal-aisle-add.component.html',
  styleUrl: './modal-aisle-add.component.scss',

})
export class ModalAisleAddComponent implements OnInit {

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
