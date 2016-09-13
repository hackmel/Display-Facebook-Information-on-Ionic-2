import {Page,NavController, NavParams,LoadingController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';
import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';
import 'rxjs/add/operator/map';
import {Http,URLSearchParams} from '@angular/http';
 
 
@Page({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
 
   private cordovaOauth : CordovaOauth = null;
   private accessToken : any;
   private profileData: any;

 
    constructor(private navCtrl: NavController, private loadingController: LoadingController,private http:Http) {
       
        this.cordovaOauth = new CordovaOauth(new Facebook({clientId: "1761013220850841", appScope: ["email", "user_website", "user_location", "user_relationships"]}));
    }
 
    login() {
            this.cordovaOauth.login().then((success) => {
                this.accessToken = JSON.parse(JSON.stringify(success));
                let loading = this.loadingController.create({
                     content: 'Please wait...',
                     duration: 3000
                });

                loading.present();

                this.getDetails(this.accessToken).then(data => {         
                this.profileData = data;
                this.navCtrl.setRoot(ProfilePage, {
                    profileData: this.profileData 
                });
                });
            }, (error) => {
                alert(error);
            });
       
    }


    getDetails(accessToken : any)  {
        var url = "https://graph.facebook.com/v2.2/me";
        let params: URLSearchParams = new URLSearchParams();
        params.set("access_token", accessToken.access_token);
        params.set("fields", "id,name,gender,location,website,picture,relationship_status");
        params.set("format", "json");

        //Http request-
        return new Promise(resolve => { 
          this.http.get(url, {
            search: params
          }).map(res => res.json())
            .subscribe(response => {
                resolve(response);
            })
        });
          
    }

 
}
