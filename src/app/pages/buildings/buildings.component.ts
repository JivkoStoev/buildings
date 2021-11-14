import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Building, BuildingsService } from 'src/app/services/buildings.service';


@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {


  buildings$:Observable<Building[]>;
  isAddAction:boolean;
  buildingForm = this.fb.group({
    name: ['', Validators.required],
    id: [''],
    area: ['',Validators.required],
    location: ['',Validators.required],
    image: ['https://via.placeholder.com/50/09f/fff.png']
  });

  
  constructor(
    private buildingService: BuildingsService,
    private modalService: NgbModal,
    private fb: FormBuilder,

  ) { }

  

  ngOnInit(): void {
    this.buildings$ = this.buildingService.getAll();
  }

  delete(id:number){
    this.buildingService.deleteById(id);
  }

  showModal(content: TemplateRef<any>, isAddAction: boolean, building?: Building, index?: number){
    this.isAddAction = isAddAction;
    if(!this.isAddAction){
      this.buildingForm.setValue({
        id: index,
        name: building?.name,
        area: building?.area,
        location: building?.location,
        image: building?.image,
      })
    } else {
      this.buildingForm.get('name')?.reset();
      this.buildingForm.get('area')?.reset();
      this.buildingForm.get('location')?.reset();
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  get name() { return this.buildingForm.get('name'); }
  get area() { return this.buildingForm.get('area'); }
  get location() { return this.buildingForm.get('location'); }

  modalAction(){
    if(this.isAddAction){
      this.buildingService.add(this.buildingForm.value);
    } else {
      this.buildingService.update(this.buildingForm.value);

    }

    this.modalService.dismissAll();
  }

}
