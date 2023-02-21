import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {

  AddMemberForm: FormGroup = new FormGroup({});

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  userSubmitted: boolean = false;

  imageSrc: string = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";

  memberId: any = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.CreateMemberForm();

    if (this.memberId)
      this.updateMemberForm(this.memberId);
  }

  CreateMemberForm() {
    this.AddMemberForm = new FormGroup({
      id: new FormControl(this.memberId, [Validators.required]),
      memberName: new FormControl(null, [Validators.required]),
      memberPosition: new FormControl(null, [Validators.required]),
      memberImg: new FormControl(null),
      imageSrc: new FormControl(this.imageSrc, [])
    })
  }

  updateMemberForm(memberId: any) {
    this.getMember(memberId);
  }

  getMember(memberId: any) {
    //console.log("inside getMember");
    let UsersArray;
    this.http.get(environment.baseUrl + '/api/Member/GetMember.ashx?id=' + memberId).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        UsersArray = JSON.parse(jsonInfo);
        this.PathValueToMemberForm(UsersArray);
      }
    )
  }

  PathValueToMemberForm(MemberObj: any) {
    console.log(MemberObj);
    this.imageSrc = MemberObj.imageSrc;
    this.AddMemberForm.patchValue({
      id: 1,
      memberName: MemberObj.memberName,
      memberPosition: MemberObj.memberPosition,
      imageSrc: MemberObj.imageSrc
    })
  }

  onFileChange(files: FileList) {
    const reader = new FileReader();
    //console.log(files);
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        //console.log("imageSrc : "+this.imageSrc);
        this.AddMemberForm.patchValue({
          imageSrc: reader.result
        });
      };
    }
  }

  OnSubmit() {
    this.userSubmitted = true;
    if (this.AddMemberForm.valid) {
      this.AddMember(this.AddMemberForm.value);
      //console.log(this.AddMemberForm.value);
      //console.log("imageSrc : "+this.imageSrc);
    }
    else {
      //this.IsShowMessageError = true;
    }
  }

  AddMember(member: any) {
    var formData: any = new FormData();
    formData.append("id", this.memberId);
    formData.append("memberName", member.memberName);
    formData.append("memberPosition", member.memberPosition);
    formData.append("memberImg", member.memberImg);
    formData.append("imageSrc", member.imageSrc);

    this.http.post(environment.baseUrl + '/api/Member/UpdateData.ashx', formData).subscribe(
      (response) => {
        if (response == "1") {
          this.IsShowMessageInsert = true;
          this.IsShowMessageUpdate = false;
        }
        else if (response == "2") {
          this.IsShowMessageInsert = false;
          this.IsShowMessageUpdate = true;
        }
      },
      (error) => console.log(error)
    )

  }
}
