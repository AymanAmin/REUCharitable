import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CEOspeechModel } from 'src/app/Model/CEOspeechModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-CEOSpeech-update',
  templateUrl: './CEOSpeech-update.component.html',
  styleUrls: ['./CEOSpeech-update.component.css']
})
export class CEOSpeechUpdateComponent implements OnInit {

  CEOSpeechForm: FormGroup = new FormGroup({});
  userSubmitted: boolean = false;
  IsShowMessageUpdate: boolean = false;

  CEOspeech: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.CreateForm();
    this.getCEOspeech();
  }

  CreateForm() {
    this.CEOSpeechForm = new FormGroup({
      CEOspeechDetails: new FormControl(null, [Validators.required])
    });
  }

  getCEOspeech() {
    this.http.get(environment.baseUrl + '/api/CEOSpeechDataAPI.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let CEOspeechData = JSON.parse(jsonInfo);
        this.CEOspeech = CEOspeechData.CEOspeechDetails;
        this.PatchValueToForm(this.CEOspeech);
      }
    )
  }

  PatchValueToForm(CEOspeech: string) {
    this.CEOSpeechForm.patchValue({
      CEOspeechDetails: CEOspeech
    });
  }


  OnSubmit() {
    console.log(this.CEOSpeechForm.value);
    var formData: any = new FormData();
    formData.append("CEOspeechDetails", this.CEOSpeechForm.get('CEOspeechDetails')?.value);
    this.http.post(environment.baseUrl + '/api/CEOSpeechDataActionAPI.ashx', formData).subscribe(
      (response) => {
        if (response == "1" || response == "2")
          this.IsShowMessageUpdate = true;
        else
          this.IsShowMessageUpdate = false;
        //console.log(response);
      },
      (error) => console.log(error)
    )
  }



}
