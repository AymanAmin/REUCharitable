import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-Sub-services',
  templateUrl: './Sub-services.component.html',
  styleUrls: ['./Sub-services.component.css']
})
export class SubServicesComponent implements OnInit {

  CustStyle:any= {'font-size': '40px','color': '#7c3c83'};
  ServicesList = [
    {
      "Id": 1,
      "Name": "كلمة رئيس مجلس الامناء",
      "Icon": "fa fa-microphone",
      "ColorIcon": "#eb6840",
      "Link": "/CEOSpeech"
    },{
      "Id": 2,
      "Name": " الهيكل التنظيمي",
      "Icon": "fa fa-sitemap",
      "ColorIcon": "#f783ac",
      "Link": "/OrganizationChart"
    }, {
      "Id": 3,
      "Name": "أعضاء مجلس الامناء",
      "Icon": "fa fa-user",
      "ColorIcon": "#7c3c83",
      "Link": "/Members"
    },{
      "Id": 5,
      "Name": "اللائحة الاساسية",
      "Icon": "fa fa-file",
      "ColorIcon": "#62d1d3",
      "Link": "/BasicRegulation"
    },{
      "Id": 6,
      "Name": "شهادة الترخيص",
      "Icon": "fa fa-certificate",
      "ColorIcon": "#2e7b62",
      "Link": "/registration-certificate"
    },{
      "Id": 7,
      "Name": "الهوية البصرية",
      "Deatils": "",
      "Icon": "fa fa-eye-slash",
      "ColorIcon": "#fd7e14",
      "Link" : "../../assets/Visual identity/الهوية البصرية - مؤسسة عبدالله ركيب الرمال لوالديه.pdf "
    },{
      "Id": 8,
      "Name": " السياسات واللوائح",
      "Icon": "fa fa-lightbulb-o",
      "ColorIcon": "red",
      "Link": "/policies"
    },{
      "Id": 9,
      "Name": "اللجان",
      "Icon": "fa fa-users",
      "ColorIcon": " #000",
      "Link": "/CommitteesComponent"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
