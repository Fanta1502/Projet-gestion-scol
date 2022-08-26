import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEnseignantComponent } from './add-enseignant/add-enseignant.component';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  onAdd() {
    this.modalService.open(AddEnseignantComponent, { size: 'lg' });
  }
  ngOnInit(): void {
  }

}
