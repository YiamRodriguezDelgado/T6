import { Package } from 'src/app/models/package';
import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {
  @Input() package: any;
  route: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  displayEntry(detail: any): void {
    this.modalService.open(detail, {
      centered: true,
      backdrop: 'static',
      size: 'm'
    });
  }
  onClose() {
    this.modalService.dismissAll();
  }

}
