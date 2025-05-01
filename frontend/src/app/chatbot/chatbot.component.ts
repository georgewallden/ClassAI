import { Component }           from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }         from '@angular/forms';
import { CommonModule }        from '@angular/common';
import { HttpClient }          from '@angular/common/http';

interface Message { text: string; from: 'user'|'bot'; }

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: Message[] = [
    { text: 'Hello! I can list students for you. Try typing "List all of the students".', from: 'bot' }
  ];
  input = '';

  constructor(private http: HttpClient) {}

  send(): void {
    const userMsg = this.input.trim();
    if (!userMsg) return;

    this.messages.push({ text: userMsg, from: 'user' });
    this.input = '';

    if (/list all.*students/i.test(userMsg)) {
      this.http.get<{ name: string }[]>('http://localhost:3000/students')
        .subscribe(
          data => {
            const names = data.map(s => s.name).join(', ');
            this.messages.push({ text: `Here are the students: ${names}`, from: 'bot' });
          },
          () => {
            this.messages.push({ text: 'Sorry, unable to fetch students right now.', from: 'bot' });
          }
        );
    } else {
      this.messages.push({
        text: 'Sorry, I only understand "List all of the students" right now.',
        from: 'bot'
      });
    }
  }
}