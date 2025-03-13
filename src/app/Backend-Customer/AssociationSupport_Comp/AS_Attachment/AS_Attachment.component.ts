import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-AS_Attachment',
  templateUrl: './AS_Attachment.component.html',
  styleUrls: ['./AS_Attachment.component.css']
})
export class AS_AttachmentComponent implements OnInit {
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady: boolean = false;
  @Input() ShowAttachment :boolean = true;
  @Input() ShowAttach :boolean = true;

  CS_Code: string = this.route.snapshot.params['id'];
  PatientFilesForm: FormGroup = new FormGroup({});
  FileList: any;
 

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.CheckIsReady();
    this.CreateForm();
    this.getData();
  }

  CheckIsReady() {
    if (this.CS_Code)
      this.IsReady = true;
  }

  CreateForm() {
    this.PatientFilesForm = new FormGroup({
      Identify: new FormControl(null, [Validators.required]),
      Medical_Report: new FormControl(null, [Validators.required]),
      Proof_of_Residence: new FormControl(null),
      Bank_Statement: new FormControl(null),
      Other_Files: new FormControl(null),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/AS_Attachment.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let dataList = JSON.parse(jsonInfo);
        this.fillData(dataList);
      }
    )
  }

  fillData(Data: any) {
    this.FileList = Data;
  }

  onFileChange(files: FileList, Type: string) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      var file = reader.result as string;
      var formData: any = new FormData();
      formData.append("CS_Code", this.CS_Code);
      formData.append('file', file);
      formData.append('Type', Type);

      this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/AS_Attachment.ashx', formData).subscribe(
        (response) => {
          if (response != "0") {
            this.IsShowMessageUpdate = true;
            this.IsShowMessageError = false;
            //this.router.navigate(['/Customer/InstitutionBenefitForm/' + response]);
            this.getData();
            this.PatientFilesForm.reset();
          }
          else {
            this.IsShowMessageUpdate = false;
            this.IsShowMessageError = true;
          }
        },
        (error) => console.log(error)
      );
    };
  }

  DeleteFile(Id: any) {
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Id", Id);

    this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/AS_Attachment.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          //this.router.navigate(['/Customer/InstitutionBenefitForm/' + response]);
          this.getData();
          this.PatientFilesForm.reset();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    );

  }
}
