import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import * as XLSX from 'xlsx';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  etablissements: any;
  collectionSize;
  pageSize = 5;
  page = 1;
  constructor(private modalService: NgbModal, private etablissementService: EtablissementService) { }
  onAdd() {
    this.modalService.open(AddEtablissementComponent, { size: 'lg' });
  }
  ngOnInit(): void {
    this.etablissementService.all(
      {
        size: this.pageSize,
        page: this.page
      }
    ).subscribe(
      res => {
        this.etablissements = res.content;
        this.collectionSize = res.totalCount;
        this.customerList = res.content;
      }
    )
  }
  public onFilterChange(): void {
    this.filteredCustomerList = [];
    if (!this.filterText || this.filterText.length === 0) {
      this.filteredCustomerList = this.customerList;
      return;
    }
    this.customerList.filter(x => {
      if (x.lastName.toString().includes(this.filterText)) {
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.etablissements = this.filteredCustomerList;
  }
  pageChange(event) {
  }
}