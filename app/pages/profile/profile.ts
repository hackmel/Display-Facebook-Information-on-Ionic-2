import {Page} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage{
    public profileData: any;
    private errorData;
    private accessToken : any;

  constructor(private navCtrl: NavController, navParams: NavParams) {
     this.profileData = navParams.get('profileData');
    
  }
   
}