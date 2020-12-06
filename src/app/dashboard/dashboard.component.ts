import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApplianceService } from "../appliance.service";
import Appliance from '../model/Appliances';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private router: Router,
    private applianceService: ApplianceService,
    private modalService: BsModalService) { }
  myAppliances: Appliance[];
  displayColumns = ["Serial Number", "Brand", "Model", "Status", "Date Bought", "Action"];
  searchBrand: string = "";
  searchModel: string = "";
  searchStatus: string = "";
  searchDateBought: string = "";
  appliance: Appliance;
  editappliance: Appliance;
  mandatoryMsg: boolean = false;
  errorMsg: any;
 

  ngOnInit(): void {
    this.getData(null);
    this.appliance = {
      serialNumber: null,
      brand: '',
      model: '',
      dateBought: null,
      status: ''
    }
  }
  onSearch(evnt): void {
    
    let params = new URLSearchParams();
  
    if (this.searchBrand && this.searchBrand.length > 0) {
      params.set("brand", this.searchBrand); 
    }

    if (this.searchModel && this.searchModel.length > 0) {
      params.set("model", this.searchModel); 
    }

    if (this.searchStatus && this.searchStatus.length > 0) {
      params.set("status", this.searchStatus); 
    }

    if (this.searchDateBought && this.searchDateBought.length > 0) {
      params.set("dateBought", this.searchDateBought); 
    }

    this.getData(params.toString());
  }
  getData(params: string) {
    this.applianceService.getAllAppliances(params).subscribe( (data) => {
      this.myAppliances = data;
    });
  }
  createAppliance() {
    
    if(this.appliance.brand.length == 0 || this.appliance.model.length == 0 || this.appliance.dateBought == null
      || this.appliance.status .length == 0) {
        this.mandatoryMsg = true;
      } else {
        this.applianceService.createAppliance(this.appliance).subscribe( (data) => {
          window.location.href = window.location.href;
    
        }, (error) => {
          console.log(error);
          this.errorMsg = error.error;
        });
      }
    
  }
  showCreate() {
    this.appliance = {
      serialNumber: null,
      brand: '',
      model: '',
      dateBought: null,
      status: ''
    }
  }

  editForm(template: TemplateRef<any>, appliance) {
    console.log(appliance);
    this.editappliance = appliance;
    this.modalRef = this.modalService.show(template);
  }
  updateAppliance(){
    if(this.editappliance.brand.length == 0 || this.editappliance.model.length == 0 || this.editappliance.dateBought == null
      || this.editappliance.status.length == 0) {
        this.mandatoryMsg = true;
      } else {
        this.applianceService.updateAppliance(this.editappliance).subscribe( (data) => {
          window.location.href = window.location.href;
        }, (error) => {
          console.log(error);
          this.errorMsg = error.error;
        });
      }
  }

  deleteForm(serialNumber){
    this.applianceService.removeAppliance(serialNumber).subscribe( (data) => {
      window.location.href = window.location.href;
    });
  }
}
