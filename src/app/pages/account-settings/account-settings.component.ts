import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit{
  
  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    //this.links = document.querySelectorAll('.selector');
    this.settings.checkCurrentTheme();
  }

  changeTheme( theme: string ) {
    this.settings.changeTheme(theme);
  }

}
