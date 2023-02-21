import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-CEOSpeech',
  templateUrl: './CEOSpeech.component.html',
  styleUrls: ['./CEOSpeech.component.css']
})
export class CEOSpeechComponent implements OnInit {

  constructor(private http:HttpClient) { }

  CEOText:string = "";
  ngOnInit() {

    this.getCEOText();
  }

  getCEOText() {
    this.http.get(environment.baseUrl + '/api/CEOSpeechDataAPI.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let CEOspeechData = JSON.parse(jsonInfo);
        this.CEOText = CEOspeechData.CEOspeechDetails;
      }
    )
  }

}
