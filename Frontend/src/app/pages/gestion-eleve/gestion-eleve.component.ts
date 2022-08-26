import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEleveComponent } from './add-eleve/add-eleve.component';
import * as XLSX from 'xlsx';
import { EleveService } from 'src/app/services/eleve/eleve.service';

@Component({
  selector: 'app-gestion-eleve',
  templateUrl: './gestion-eleve.component.html',
  styleUrls: ['./gestion-eleve.component.scss']
})
export class GestionEleveComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab:any;
  filterText:any;
  filteredCustomerList:any = [];
  customerList:any;
  lesEleves : any;
  collectionSize;
  pageSize = 5;
  page = 1;
  constructor(private modalService: NgbModal,private eleveService : EleveService) { }
  onAdd() {
    this.modalService.open(AddEleveComponent, { size: 'lg' });
  }
  ngOnInit(): void {
    this.eleveService.getAll(
      {
        size: this.pageSize,
        page: this.page
      }).subscribe(
      res =>
      {
        this.lesEleves = res.content;
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
      if(x.lastName.toString().includes(this.filterText))
      {
        this.filteredCustomerList = 
        [
          ...this.filteredCustomerList,
          x
        ];
      }
    });
    this.lesEleves = this.filteredCustomerList;
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    const classe = {
      lastName: null,
      firstName: null
    };
    if(confirm("Voulez-vous réellement importer cet fichier ?"))
        this.fileReader(this.file, classe);
    return;
  }
  private fileReader(file: any, line: any) {
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();

      for (let i = 0; i !== data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
      const first_sheet_name = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[first_sheet_name];
      this.worksheet = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.matchingCell(this.worksheet, this.tab ,line);
    };
    fileReader.readAsArrayBuffer(file);
  }
  private matchingCell(worksheet: any, monTab: any,line: any) {
   // monTab.value = [];
    for (let i = 0; i < worksheet.length; i++) {
     // const worksheetLine = worksheet[i];
      let updatedLine = {
        lastName: worksheet[i].NOM,
        firstName: worksheet[i].PRENOM,
      };
      this.eleveService.add(updatedLine).subscribe();
      this.lesEleves = { ...this.lesEleves, ...updatedLine };
      //monTab.value.push(line);
    }
  } 
  pageChange(event)
  {
  }
}
