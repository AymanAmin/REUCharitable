import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Services',
  templateUrl: './Services.component.html',
  styleUrls: ['./Services.component.css']
})
export class ServicesComponent implements OnInit {

  CustStyle:any= {'font-size': '40px','color': '#7c3c83'};
  ServicesList = [
    {
      "Id": 1,
      "Name": " دعم الأسر المتعففة",
      "Deatils": "دعم و تأمين الحياة الكريمة للأسر المتعففة",
      "Icon": "flaticon-volunteer",
      "ColorIcon": "#eb6840",
      "Link": "Customer/SupportNeedyFamilies"
    },{
      "Id": 2,
      "Name": "ترميم المنازل",
      "Deatils": "يوجد كثير من المباني تحتاج الى ترميم ويوجد أسر تحتاج الى مباني",
      "Icon": "fas fa-building",
      "ColorIcon": "#f783ac",
      "Link": "/Customer/RestorationHomeForm"
    }, {
      "Id": 3,
      "Name": " دعم حالة مرضية",
      "Deatils": "توفير وتأمين العلاج الشهري للمستفيدين",
      "Icon": "fas fa-pills",
      "ColorIcon": "#7c3c83",
      "Link": "/Customer/InstitutionBenefitForm"
    },{
      "Id": 5,
      "Name": "السلة الغذائية",
      "Deatils": "شراء مواد غذائية ويتم تسليمها للمستفيدين وتوصيلها للغير قادرين",
      "Icon": "fas fa-shopping-basket",
      "ColorIcon": "#62d1d3",
      "Link": "#"
    },{
      "Id": 9,
      "Name": "فرحة العيدين",
      "Deatils": "تأمين كسوة العيدين للفقير والمحتاج لإدخال السرور عليهم",
      "Icon": "fas fa-gifts",
      "ColorIcon": "#2e7b62",
      "Link": "#"
    },{
      "Id": 7,
      "Name": "تسديد فواتير المستفيدين",
      "Deatils": "تسديد فواتير بأنواعها المختلفة للمستفيدين لتخفيف الأعباء عنهم",
      "Icon": "fas fa-file-invoice-dollar",
      "ColorIcon": "#fd7e14",
      "Link": "#"
    }
  ]

  constructor(private http:HttpClient) { }

  ngOnInit() {
    // this.http.get('Data/ServicesList.json').subscribe(
    //   data => {
    //     this.ServicesList = data;
    //     //console.log(data)
    //   }
    // )
  }

}
