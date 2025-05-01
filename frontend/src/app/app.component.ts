// src/app/app.component.ts

import { Component }           from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }         from '@angular/forms';
import { ChatbotComponent }    from './chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ChatbotComponent
  ],
  template: `<app-chatbot></app-chatbot>`,
  // you can move your styles into ChatbotComponent.css,
  // so no styleUrls needed here
})
export class AppComponent {}
