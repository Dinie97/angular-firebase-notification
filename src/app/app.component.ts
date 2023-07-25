import { Component } from '@angular/core';
import { MessagingService } from 'src/service/messaging-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-firebase-notification';
  message: any;
  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessaging();
    this.message = this.messagingService.currentMessage;
  }

  sendNotifications() {
    this.messagingService.postData().subscribe((res) => {
      console.log('Send Notiification');
    });
  }
}
