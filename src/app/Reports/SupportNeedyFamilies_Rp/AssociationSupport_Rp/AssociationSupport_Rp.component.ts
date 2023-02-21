import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-AssociationSupport_Rp',
  templateUrl: './AssociationSupport_Rp.component.html',
  styleUrls: ['./AssociationSupport_Rp.component.css']
})



  export class AssociationSupport_RpComponent implements OnInit {

    CS_Code:string = this.route.snapshot.params['id'];

    AssociationSupportinfo:any;
    ProjectsBySpecialty:any;
    ProjectDetails:any;
    AssociationSupport:any;
    AS_Attachment:any;

    constructor(private http: HttpClient, private route: ActivatedRoute,private titleService:Title) {}

    ngOnInit() {

      this.getAssociationSupportinfoData();
      this.getProjectsBySpecialtyData();
      this.getProjectDetailsData();
      this.getAssociationSupportData();
      this. getAS_AttachmentData();

    }


    getAssociationSupportinfoData() {

      this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/BasicBankInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          let Result = JSON.parse(jsonInfo);
          this.AssociationSupportinfo=Result[0];
        }
      )
    }


  getProjectsBySpecialtyData()  {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/ProjectsBySpecialtyData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.ProjectsBySpecialty = JSON.parse(jsonInfo);
      }
    )
  }


  getProjectDetailsData() {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/ProjectDetailsData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.ProjectDetails=Result[0];
      }
    )
  }

  getAssociationSupportData() {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/PEBData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.AssociationSupport = JSON.parse(jsonInfo);
      }
    )
  }

  getAS_AttachmentData() {
    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/AS_Attachment.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.AS_Attachment = JSON.parse(jsonInfo);
      }
    )
  }


  }







