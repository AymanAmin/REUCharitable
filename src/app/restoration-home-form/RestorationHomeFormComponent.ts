import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-restoration-home-form',
  templateUrl: './restoration-home-form.component.html',
  styleUrls: ['./restoration-home-form.component.css']
})
export class RestorationHomeFormComponent implements OnInit {

  BasicInfo_step: string = "3-1";
  BankInfo_step: string = "3-2";
  FinancialSituation_step: string = "3-3";
  homeInfo_step: string = "3-4";
  homefile_step: string = "3-5";

  current_step: string = "3-1";
  viewAll: boolean = false;
  CS_Code: string = this.route.snapshot.params['id'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getBasicData();
  }

  getBasicData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/BasicInfoData.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var MainInfoData = JSON.parse(jsonInfo);
        const myArray = MainInfoData[0].Step.split("-");

        let last_step = parseInt(myArray[1]) + 1;
        if (last_step == 6)
          this.viewAll = true;

        this.current_step = myArray[0] + "-" + last_step;
      }
    );
  }

}
