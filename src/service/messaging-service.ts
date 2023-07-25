import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  firebaseToken: any;
  data: any;
  private apiUrl = 'https://fcm.googleapis.com';
  private authToken = 'YOUR_AUTH_TOKEN'; // Cloud Messaging Api Server Key ( can get from firebase project setting -> Cloud Messaging Server Key)
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient
  ) {}

  // Request Notification Permission from web page
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe({
      next: (token) => {
        this.firebaseToken = token;
        this.data = {
          notification: {
            title: 'Test Notification',
            body: 'Test Firebase Notification On Angular 16',
          },
          to: token, //can hardcoded the token to whichever browser that needed to be tested (for testing purpose only)
          // eg : change the token to Microsoft Edge token and click the button from Chrome to test the notification for Microsoft Edge
        };

        console.log(token);
      },
      error: (error) =>
        console.log('Unable to get permission to notify...', error),
    });
  }

  // Receive Notification From Firebase
  receiveMessaging() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new Message Receives', payload);
      this.currentMessage.next(payload);
    });
  }

  // Test Notification Function (Need to use two browser to test)
  postData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });

    return this.http.post<any>(`${this.apiUrl}/fcm/send`, this.data, {
      headers: headers,
    });
  }
}
