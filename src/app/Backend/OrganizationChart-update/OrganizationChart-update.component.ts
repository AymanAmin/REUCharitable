import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-OrganizationChart-update',
  templateUrl: './OrganizationChart-update.component.html',
  styleUrls: ['./OrganizationChart-update.component.css']
})
export class OrganizationChartUpdateComponent implements OnInit {

  userSubmitted: boolean = false;
  IsShowMessageUpdate: boolean = false;

  orgChartSrc: string = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
  AddOrgChartFileForm: FormGroup = new FormGroup({});

  OrgChartFile: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.createOrgChartFileForm();
    this.GetOrgChartFile();
  }

  createOrgChartFileForm() {
    this.AddOrgChartFileForm = new FormGroup({
      id:new FormControl(1),
      img: new FormControl(null, [Validators.required]),
      imageSrc: new FormControl(this.OrgChartFile, []),
    })
  }

  onFileChange(files: FileList) {
    const reader = new FileReader();
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.orgChartSrc = reader.result as string;
        this.AddOrgChartFileForm.patchValue({
          imageSrc: reader.result
        });
      };
    }
  }

  uploadImage() {
    this.AddImageChart(this.AddOrgChartFileForm.value);
    this.AddOrgChartFileForm.reset();
  }

  AddImageChart(ImageChart:any){
    //console.log("ImageChart: "+ImageChart);
    var formData: any = new FormData();
    formData.append("imageSrc", ImageChart.imageSrc);
    formData.append("img", ImageChart.img);

    this.http.post(environment.baseUrl + '/api/OrganizationChart/UpdateData.ashx', formData).subscribe(
      (response) => { if(response == "1" || response == "2") {
        this.IsShowMessageUpdate = true;
        this.GetOrgChartFile();
      }
    else {
      this.IsShowMessageUpdate = false;
    }},
      (error) => console.log(error)
    )
  }

  addImage(image: any) {
    let res_local = [image];
    localStorage.setItem('OrgChart', JSON.stringify(res_local));
  }

  GetOrgChartFile() {
    this.http.get(environment.baseUrl + '/api/OrganizationChart/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        console.log("MainInfoData: " + MainInfoData.imageSrc);
        this.orgChartSrc = MainInfoData.imageSrc;
        this.AddOrgChartFileForm.patchValue({
          imageSrc: MainInfoData.imageSrc
        });
      }
    )
  }

}
