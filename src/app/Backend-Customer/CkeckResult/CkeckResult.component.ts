import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-CkeckResult',
  templateUrl: './CkeckResult.component.html',
  styleUrls: ['./CkeckResult.component.css']
})
export class CkeckResultComponent implements OnInit {

  CheckForm:FormGroup = new FormGroup({});
  FormList:any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.CreateForm();
  }


  CreateForm() {
    this.CheckForm = new FormGroup({
      Identify_Id: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [Validators.required])
    });
  }

  fillData(Data: any) {
    this.FormList = Data;
    this.CheckForm.reset()
  }

  OnSubmit(){
    var Identify_Id = this.CheckForm.get('Identify_Id')?.value;
    var Phone = this.CheckForm.get('Phone')?.value;
    this.http.get(environment.baseUrl + '/api/CS/Get/CheckBasicInfoData.ashx?Identify_Id='+Identify_Id+'&Phone='+Phone).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

}
