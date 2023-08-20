import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Committees',
  templateUrl: './Committees.component.html',
  styleUrls: ['./Committees.component.css']
})
export class CommitteesComponent implements OnInit {



  constructor() {


  }

  ngOnInit() {}

id:any='';
accordion(ids:any){
 // console.log(ids);

  if( this.id==ids)
  {
    this.id='';
  }

  else{
    this.id=ids;
  }
}
}





