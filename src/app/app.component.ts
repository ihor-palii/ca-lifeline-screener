import { Component } from '@angular/core';
import { faBookOpen, faBuildingColumns, faCheck, faCoins, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gnp-ca-screener';
  icons = {faBookOpen, faBuildingColumns, faCheck, faCoins, faPeopleGroup }
}
