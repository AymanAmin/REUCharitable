import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AppComponent } from './app.component';
import { ServicesComponent } from './Services/Services.component';
import { LastNewsComponent } from './LastNews/LastNews.component';
import { SliderImgComponent } from './SliderImg/SliderImg.component';
import { ObjectivComponent } from './objectiv/objectiv.component';
import { CEOSpeechComponent } from './CEOSpeech/CEOSpeech.component';
import { MainPageComponent } from './MainPage/MainPage.component';
import { HeaderComponent } from './Header/Header.component';
import { BasicRegulationComponent } from './BasicRegulation/BasicRegulation.component';
import { ContactComponent } from './Contact/Contact.component';
import { MembersComponent } from './Members/Members.component';
import { NewsComponent } from './News/News.component';
import { OrganizationChartComponent } from './OrganizationChart/OrganizationChart.component';
import { GalleryComponent } from './Gallery/Gallery.component';
import { YearlyReportsComponent } from './YearlyReports/YearlyReports.component';

import { UserLoginComponent } from './Backend/user-login/user-login.component';
import { UserRegisterComponent } from './Backend/user-register/user-register.component';
import { FooterComponent } from './Footer/Footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Backend/home/home.component';
import { UserListComponent } from './Backend/user-list/user-list.component';
import { NewDeatilsComponent } from './NewDeatils/NewDeatils.component';
import { NewsAddComponent } from './Backend/news-add/news-add.component';
import { NewsViewComponent } from './Backend/news-view/news-view.component';
import { CompanyInfoComponent } from './Backend/CompanyInfo/CompanyInfo.component';
import { MemberAddComponent } from './Backend/member-add/member-add.component';
import { MemberListComponent } from './Backend/member-list/member-list.component';
import { CEOSpeechUpdateComponent } from './Backend/CEOSpeech-update/CEOSpeech-update.component';
import { GalleryAddComponent } from './Backend/gallery-add/gallery-add.component';
import { YearlyReportAddComponent } from './Backend/YearlyReport-add/YearlyReport-add.component';
import { OrganizationChartUpdateComponent } from './Backend/OrganizationChart-update/OrganizationChart-update.component';
import { RegistrationCertificateComponent } from './Registration-certificate/Registration-certificate.component';
import { NewRegistrationComponent } from './Backend-Customer/NewRegistration/NewRegistration.component';
import { NewRegistrationStep2Component } from './Backend-Customer/NewRegistration-step2/NewRegistration-step2.component';
import { NewRegistrationStep3Component } from './Backend-Customer/NewRegistration-step3/NewRegistration-step3.component';
import { NewRegistrationStep4Component } from './Backend-Customer/NewRegistration-step4/NewRegistration-step4.component';
import { InstitutionBenefitFormComponent } from './Backend-Customer/InstitutionBenefitForm/InstitutionBenefitForm.component';
import { BasicInfoComponent } from './Backend-Customer/Benefit_Comp/BasicInfo/BasicInfo.component';
import { BankInfoComponent } from './Backend-Customer/Benefit_Comp/BankInfo/BankInfo.component';
import { FinancialSituationComponent } from './Backend-Customer/Benefit_Comp/FinancialSituation/FinancialSituation.component';
import { FamilyMembersComponent } from './Backend-Customer/Benefit_Comp/FamilyMembers/FamilyMembers.component';
import { PatientHealthComponent } from './Backend-Customer/Benefit_Comp/PatientHealth/PatientHealth.component';
import { PatientNeedsComponent } from './Backend-Customer/Benefit_Comp/PatientNeeds/PatientNeeds.component';
import { OtherPatientConditionsComponent } from './Backend-Customer/Benefit_Comp/OtherPatientConditions/OtherPatientConditions.component';
import { OurServicesComponent } from './Backend-Customer/Benefit_Comp/OurServices/OurServices.component';
import { OtherServiceProvidersComponent } from './Backend-Customer/Benefit_Comp/OtherServiceProviders/OtherServiceProviders.component';
import { PatientFilesComponent } from './Backend-Customer/Benefit_Comp/PatientFiles/PatientFiles.component';
import { CkeckResultComponent } from './Backend-Customer/CkeckResult/CkeckResult.component';
import { AssociationSupportComponent } from './Backend-Customer/AssociationSupport/AssociationSupport.component';
import { BaiscBankInfoComponent } from './Backend-Customer/AssociationSupport_Comp/BaiscBankInfo/BaiscBankInfo.component';
import { ProjectsBySpecialtyComponent } from './Backend-Customer/AssociationSupport_Comp/ProjectsBySpecialty/ProjectsBySpecialty.component';
import { ProjectDetailsComponent } from './Backend-Customer/AssociationSupport_Comp/ProjectDetails/ProjectDetails.component';
import { ProjectEstimatedBudgetComponent } from './Backend-Customer/AssociationSupport_Comp/ProjectEstimatedBudget/ProjectEstimatedBudget.component';
import { AS_AttachmentComponent } from './Backend-Customer/AssociationSupport_Comp/AS_Attachment/AS_Attachment.component';
import { BeneficiariesRequestsComponent } from './Backend/BeneficiariesRequests/BeneficiariesRequests.component';
import { AssociationRequestsComponent } from './Backend/AssociationRequests/AssociationRequests.component';
import { RestorationHomeFormComponent } from './restoration-home-form/RestorationHomeFormComponent';
import { BasicinformationComponent } from './basicinformation/basicinformation.component';
import { HomeInfoComponent } from './home-info/home-info.component';
import { HomeFileComponent } from './home-file/home-file.component';
import { SupportNeedyFamiliesComponent } from './support-needy-families/support-needy-families.component';
import { NeedyfamiliesfileComponent } from './needyfamiliesfile/needyfamiliesfile.component';
import { ServicesfamiliesComponent } from './servicesfamilies/servicesfamilies.component';
import { Project2023Component } from './project2023/project2023.component';
import { RelatedPersonComponent } from './related-person/related-person.component';
import { PopupAdsComponent } from './PopupAds/PopupAds.component';
import { ShowVideoComponent } from './ShowVideo/ShowVideo.component';
import { GalleryVidComponent } from './gallery-vid/gallery-vid.component';
import { GalleryVideoAddComponent } from './Backend/galleryVideo-add/galleryVideo-add.component';
import { PoliciesComponent } from './policies/policies.component';
import { SupportNeedyFamilies_RpComponent } from './Reports/SupportNeedyFamilies_Rp/SupportNeedyFamilies_Rp.component';
import { AssociationSupport_RpComponent } from './Reports/SupportNeedyFamilies_Rp/AssociationSupport_Rp/AssociationSupport_Rp.component';
import { Governance2022Component } from './Governance2022/Governance2022.component';
import { CommitteesComponent } from './Committees/Committees.component';
import { FinancialComponent } from './Financial/Financial.component';
import { Governance2023Component } from './Governance2023/Governance2023.component';
import { Project2022Component } from './Project2022/Project2022.component';


const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'CEOSpeech', component: CEOSpeechComponent },
  { path: 'BasicRegulation', component: BasicRegulationComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Members', component: MembersComponent },
  { path: 'News', component: NewsComponent },
  { path: 'OrganizationChart', component: OrganizationChartComponent },
  { path: 'Gallery', component: GalleryComponent },
  { path: 'YearlyReports', component: YearlyReportsComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/register/:id', component: UserRegisterComponent },
  { path: 'backend/home', component: HomeComponent },
  { path: 'backend/user/list', component: UserListComponent },
  { path: 'news/deatils/:id', component: NewDeatilsComponent },
  { path: 'backend/news/viewlist', component: NewsViewComponent },
  { path: 'backend/news/add', component: NewsAddComponent },
  { path: 'backend/news/update/:id', component: NewsAddComponent },
  { path: 'backend/company/update', component: CompanyInfoComponent },
  { path: 'backend/member/add', component: MemberAddComponent },
  { path: 'backend/member/update/:id', component: MemberAddComponent },
  { path: 'backend/member/list', component: MemberListComponent },
  { path: 'backend/CEOSpeach/update', component: CEOSpeechUpdateComponent },
  { path: 'backend/news/add/:id', component: NewsAddComponent },
  { path: 'backend/gallery/update', component: GalleryAddComponent },
  { path: 'backend/gallery/update/:id', component: GalleryAddComponent },
  { path: 'backend/YearReport', component: YearlyReportAddComponent },
  { path: 'backend/OrganizationChart/update', component: OrganizationChartUpdateComponent },
  { path: 'registration-certificate', component: RegistrationCertificateComponent },
  { path: 'Customer/New-Registration/step1', component: NewRegistrationComponent },
  { path: 'Customer/New-Registration/step2', component: NewRegistrationStep2Component },
  { path: 'Customer/New-Registration/step3', component: NewRegistrationStep3Component },
  { path: 'Customer/New-Registration/step4', component: NewRegistrationStep4Component },
  { path: 'Customer/InstitutionBenefitForm', component: InstitutionBenefitFormComponent },
  { path: 'Customer/InstitutionBenefitForm/:id', component: InstitutionBenefitFormComponent },
  { path: 'Customer/CheckResultComponent', component: CkeckResultComponent },
  { path: 'Customer/AssociationSupport', component: AssociationSupportComponent },
  { path: 'Customer/AssociationSupport/:id', component: AssociationSupportComponent },
  { path: 'backend/BeneficiariesRequests', component: BeneficiariesRequestsComponent },
  { path: 'backend/AssociationRequests', component: AssociationRequestsComponent },
  { path: 'Customer/RestorationHomeForm', component: RestorationHomeFormComponent },
  { path: 'Customer/RestorationHomeForm/:id', component: RestorationHomeFormComponent },
  { path: 'Customer/SupportNeedyFamilies', component: SupportNeedyFamiliesComponent },
  { path: 'Customer/SupportNeedyFamilies/:id', component: SupportNeedyFamiliesComponent },
  { path: 'Customer/Project2023', component: Project2023Component },
  { path: 'Customer/related-person', component: RelatedPersonComponent },
  { path: 'backend/galleryVideo/add', component: GalleryVideoAddComponent },
  { path: 'gallery-vid', component: GalleryVidComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'Report/SupportNeedyFamilies/:id', component: SupportNeedyFamilies_RpComponent },
  { path: 'Report/AssociationSupport_Rp/:id', component: AssociationSupport_RpComponent},
  { path: 'Governance2022', component: Governance2022Component },
  { path: 'Governance2023', component: Governance2023Component },
  { path: 'ServicesComponent', component: ServicesComponent },
  { path: 'CommitteesComponent', component: CommitteesComponent },
  { path: 'FinancialComponent', component: FinancialComponent },
  { path: 'Project2022Component', component: Project2022Component },
]

export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    LastNewsComponent,
    SliderImgComponent,
    CEOSpeechComponent,
    MainPageComponent,
    HeaderComponent,
    BasicRegulationComponent,
    ContactComponent,
    MembersComponent,
    NewsComponent,
    OrganizationChartComponent,
    GalleryComponent,
    YearlyReportsComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FooterComponent,
    HomeComponent,
    UserListComponent,
    NewDeatilsComponent,
    NewsAddComponent,
    NewsViewComponent,
    CompanyInfoComponent,
    MemberAddComponent,
    MemberListComponent,
    CEOSpeechUpdateComponent,
    GalleryAddComponent,
    YearlyReportAddComponent,
    OrganizationChartUpdateComponent,
    RegistrationCertificateComponent,
    NewRegistrationComponent,
    NewRegistrationStep2Component,
    NewRegistrationStep3Component,
    NewRegistrationStep4Component,
    InstitutionBenefitFormComponent,
    BasicInfoComponent,
    BankInfoComponent,
    FinancialSituationComponent,
    FamilyMembersComponent,
    PatientHealthComponent,
    PatientNeedsComponent,
    OtherPatientConditionsComponent,
    OurServicesComponent,
    OtherServiceProvidersComponent,
    PatientFilesComponent,
    CkeckResultComponent,
    AssociationSupportComponent,
    BaiscBankInfoComponent,
    ProjectsBySpecialtyComponent,
    ProjectDetailsComponent,
    ProjectEstimatedBudgetComponent,
    AS_AttachmentComponent,
    BeneficiariesRequestsComponent,
    AssociationRequestsComponent,
    RestorationHomeFormComponent,
    BasicinformationComponent,
    HomeInfoComponent,
    HomeFileComponent,
    ObjectivComponent,
    SupportNeedyFamiliesComponent,
    NeedyfamiliesfileComponent,
    ServicesfamiliesComponent,
    Project2023Component,
    RelatedPersonComponent,
    PopupAdsComponent,
    ShowVideoComponent,
    GalleryVidComponent,
    GalleryVideoAddComponent,
    PoliciesComponent,
    SupportNeedyFamilies_RpComponent,
    AssociationSupport_RpComponent,
    Governance2022Component,
    CommitteesComponent,
    FinancialComponent,
    Governance2023Component,
   Project2022Component,
   ],


  imports: [
    BrowserModule,
    HttpClientModule,
    LightgalleryModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    routing
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}


