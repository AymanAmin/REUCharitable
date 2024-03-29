import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-BasicRegulation',
  templateUrl: './BasicRegulation.component.html',
  styleUrls: ['./BasicRegulation.component.css']
})
export class BasicRegulationComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page:number = 1;

  list:any;
  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.getRegulation();
  }

  getRegulation(){

    this.list =[
      {
        "Id": 1,
        "img": "../../assets/img/BasicRegulation/Basic-R (1).jpg"
      },
      {
        "Id": 2,
        "img": "../../assets/img/BasicRegulation/Basic-R (2).jpg"
      }
      ,
      {
        "Id": 3,
        "img": "../../assets/img/BasicRegulation/Basic-R (3).jpg"
      },
      {
        "Id": 4,
        "img": "../../assets/img/BasicRegulation/Basic-R (4).jpg"
      },
      {
        "Id": 5,
        "img": "../../assets/img/BasicRegulation/Basic-R (5).jpg"
      },
      {
        "Id": 6,
        "img": "../../assets/img/BasicRegulation/Basic-R (6).jpg"
      },
      {
        "Id": 7,
        "img": "../../assets/img/BasicRegulation/Basic-R (7).jpg"
      },
      {
        "Id": 8,
        "img": "../../assets/img/BasicRegulation/Basic-R (8).jpg"
      },
      {
        "Id": 9,
        "img": "../../assets/img/BasicRegulation/Basic-R (9).jpg"
      },
      {
        "Id": 10,
        "img": "../../assets/img/BasicRegulation/Basic-R (10).jpg"
      },
      {
        "Id": 11,
        "img": "../../assets/img/BasicRegulation/Basic-R (11).jpg"
      },
      {
        "Id": 12,
        "img": "../../assets/img/BasicRegulation/Basic-R (12).jpg"
      },
      {
        "Id": 13,
        "img": "../../assets/img/BasicRegulation/Basic-R (13).jpg"
      },
      {
        "Id": 14,
        "img": "../../assets/img/BasicRegulation/Basic-R (14).jpg"
      },
      {
        "Id": 15,
        "img": "../../assets/img/BasicRegulation/Basic-R (15).jpg"
      },
      {
        "Id": 16,
        "img": "../../assets/img/BasicRegulation/Basic-R (16).jpg"
      },
      {
        "Id": 17,
        "img": "../../assets/img/BasicRegulation/Basic-R (17).jpg"
      },
      {
        "Id": 18,
        "img": "../../assets/img/BasicRegulation/Basic-R (18).jpg"
      },
      {
        "Id": 19,
        "img": "../../assets/img/BasicRegulation/Basic-R (19).jpg"
      },
      {
        "Id": 20,
        "img": "../../assets/img/BasicRegulation/Basic-R (20).jpg"
      },

    ]
  }

}
