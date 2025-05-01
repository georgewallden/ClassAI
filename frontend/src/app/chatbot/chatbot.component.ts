// frontend/src/app/chatbot/chatbot.component.ts

import { CommonModule }     from '@angular/common';
import { Component }        from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Message {
  text?: string;
  list?: string[];
  from: 'user' | 'bot';
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,      // <-- gives you *ngIf, *ngFor, [ngClass], etc.
    FormsModule,       // <-- gives you [(ngModel)]
    HttpClientModule   // <-- gives you HttpClient
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: Message[] = [
    {
      text: `Hello! I can list students for you. Try typing "List all of the students".`,
      from: 'bot'
    }
  ];
  input = '';

  constructor(private http: HttpClient) {}

  send(): void {
    const userMsg = this.input.trim();
    if (!userMsg) return;

    this.messages.push({ text: userMsg, from: 'user' });
    this.input = '';

    if (/list all.*students/i.test(userMsg)) {
      this.http.get<{ name: string }[]>('/students')
        .subscribe(
          data => {
            this.messages.push({ list: data.map(s => s.name), from: 'bot' });
          },
          () => {
            this.messages.push({
              text: 'Sorry, unable to fetch students right now.',
              from: 'bot'
            });
          }
        );
    } else {
      this.messages.push({
        text: `Sorry, I only understand "List all of the students" right now.`,
        from: 'bot'
      });
    }
  }
}
