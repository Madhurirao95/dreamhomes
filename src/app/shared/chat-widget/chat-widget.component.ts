import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service';
import {
  ChatService,
  ConnectionStatus
} from 'src/app/services/chat-service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss'
})
export class ChatWidgetComponent implements OnInit, OnDestroy {
  isOpen = false;
  showChatButton = true;
  messages: any[] = [];
  connectionStatus: ConnectionStatus = { connected: false };
  messageInput = '';
  isTyping = false;
  private readonly destroy$ = new Subject<void>();
  private typingTimeout: any;

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthenticationService
  ) {
    this.authService.agentStatus$.subscribe((isAgent) => {
      this.showChatButton = !isAgent;
    });
  }

  async ngOnInit(): Promise<void> {
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => {
        this.messages = messages;
        this.scrollToBottom();
      });

    this.chatService.connectionStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.connectionStatus = status;
      });

    this.chatService.typing$
      .pipe(takeUntil(this.destroy$))
      .subscribe((typing) => {
        this.isTyping = typing;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    void this.chatService.disconnect();
  }

  async toggleChat(): Promise<void> {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      await this.initializeChat();
    } else {
      // Disconnect when closing
      await this.chatService.disconnect();
      this.chatService.resetState();
    }
  }

  private async initializeChat(): Promise<void> {
    try {
      await this.chatService.startConnection();
    } catch (err) {
      console.error('Failed to initialize chat:', err);
      alert('Failed to connect to chat. Please try again.');
      this.isOpen = false;
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.messageInput.trim() || !this.connectionStatus.conversationId) {
      return;
    }

    try {
      await this.chatService.sendMessage(
        this.connectionStatus.conversationId,
        this.messageInput
      );
      this.messageInput = '';
      await this.onTyping(); // Stop typing indicator
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message. Please try again.');
    }
  }

  async onTyping(): Promise<void> {
    if (!this.connectionStatus.conversationId) return;

    clearTimeout(this.typingTimeout);

    await this.chatService.sendTypingIndicator(this.connectionStatus.conversationId, true);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.typingTimeout = setTimeout(async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await this.chatService.sendTypingIndicator(this.connectionStatus.conversationId!, false);
    }, 1000);
  }

  async endChat(): Promise<void> {
    if (this.connectionStatus.conversationId) {
      await this.chatService.endConversation(
        this.connectionStatus.conversationId
      );
      this.isOpen = false;
      this.chatService.resetState();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }
}
