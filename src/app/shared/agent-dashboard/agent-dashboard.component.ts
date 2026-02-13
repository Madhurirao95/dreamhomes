/* eslint-disable @typescript-eslint/no-misused-promises */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { AuthenticationService } from 'src/app/services/authentication-service';
import {
  ActiveChat,
  ChatMessage,
  QueueSync,
  WaitingUser,
} from 'src/app/services/chat-service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.scss',
})
export class AgentDashboardComponent implements OnInit, OnDestroy {
  private hubConnection: signalR.HubConnection | null = null;
  private readonly destroy$ = new Subject<void>();

  waitingUsers: WaitingUser[] = [];
  activeChats: ActiveChat[] = [];
  selectedChatId: string | null = null;
  messageInput: Record<string, string> = {};
  queueCount = 0;
  isConnected = false;
  agentEmail = '';
  agentId = '';

  constructor(private readonly authService: AuthenticationService) {}

  async ngOnInit(): Promise<void> {
    const email = this.authService.getEmail();
    if (email) {
      this.authService
        .isAgent(this.authService.getEmail())
        .subscribe(async (isAgent) => {
          localStorage.setItem('isAgent', JSON.stringify(isAgent));
          if (isAgent) {
            await this.startConnection();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.hubConnection) {
      void this.hubConnection.stop();
    }
  }

  private async startConnection(): Promise<void> {
    const token = this.authService.getAuthToken();

    if (!token) {
      console.error('No auth token found');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://dreamhomes-api-amcne6h2a3h8fjh7.canadacentral-01.azurewebsites.net/chathub', {
        accessTokenFactory: () => token,
        skipNegotiation: false,
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.ServerSentEvents,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupSignalRListeners();

    try {
      await this.hubConnection.start();
      console.log('Agent dashboard connected to SignalR');
    } catch (err) {
      console.error('Error connecting:', err);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        await this.startConnection();
      }, 5000);
    }
  }

  private setupSignalRListeners(): void {
    if (!this.hubConnection) return;

    // Agent connected
    this.hubConnection.on('AgentConnected', (data: any) => {
      this.isConnected = true;
      console.log('Agent connected:', data);
    });

    this.hubConnection.on('QueueSync', (data: QueueSync) => {
      console.log('Queue synced:', data.count, 'users at', data.timestamp);
      this.waitingUsers.push(...data.users);
      this.queueCount = data.count;
    });

    // New user waiting
    this.hubConnection.on('NewUserWaiting', (data: WaitingUser) => {
      // Check if user already in list
      const exists = this.waitingUsers.some((u) => u.userId === data.userId);
      if (!exists) {
        this.waitingUsers.push(data);
      }
    });

    // Chat accepted
    this.hubConnection.on('ChatAccepted', (data: ActiveChat) => {
      data.isTyping = false;
      this.activeChats.push(data);
      this.selectedChatId = data.conversationId;

      // Remove from waiting users
      this.waitingUsers = this.waitingUsers.filter(
        (u) => u.userId !== data.userId
      );
    });

    // Receive message
    this.hubConnection.on('ReceiveMessage', (message: ChatMessage) => {
      const chat = this.activeChats.find(
        (c) => c.conversationId === message.conversationId
      );
      if (chat && chat.messages) {
        chat.messages = Array.isArray(chat.messages) ? chat.messages : [];
        chat.messages.push(message);
        this.scrollToBottom();
      } else if (chat) {
        chat.messages = [];
        chat.messages.push(message);
        this.scrollToBottom();
      }
    });

    // Message sent confirmation
    this.hubConnection.on('MessageSent', (message: ChatMessage) => {
      const chat = this.activeChats.find(
        (c) => c.conversationId === message.conversationId
      );
      if (chat) {
        chat.messages.push(message);
        this.scrollToBottom();
      }
    });

    // User typing
    this.hubConnection.on('UserTyping', (data: any) => {
      const chat = this.getSelectedChat();
      if (chat) {
        chat.isTyping = data.isTyping;
      }
    });

    // Conversation ended
    this.hubConnection.on('ConversationEnded', (conversationId: string) => {
      this.activeChats = this.activeChats.filter(
        (c) => c.conversationId !== conversationId
      );
      if (this.selectedChatId === conversationId) {
        this.selectedChatId =
          this.activeChats.length > 0
            ? this.activeChats[0].conversationId
            : null;
      }
    });

    // Error handling
    this.hubConnection.on('Error', (errorMessage: string) => {
      console.error('SignalR Error:', errorMessage);
    });

    // Reconnection
    this.hubConnection.onreconnected(() => {
      this.isConnected = true;
      console.log('Reconnected to hub');
    });

    this.hubConnection.onreconnecting(() => {
      this.isConnected = false;
      console.log('Reconnecting...');
    });

    this.hubConnection.onclose(() => {
      this.isConnected = false;
      console.log('Connection closed');
    });
  }

  async acceptChat(userId: string): Promise<void> {
    if (!this.hubConnection) {
      console.log('Not connected to chat hub');
      return;
    }

    try {
      await this.hubConnection.invoke('AgentAcceptChat', userId);
    } catch (err) {
      console.error('Error accepting chat:', err);
    }
  }

  selectChat(conversationId: string): void {
    this.selectedChatId = conversationId;
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  getSelectedChat(): ActiveChat | undefined {
    return this.activeChats.find(
      (c) => c.conversationId === this.selectedChatId
    );
  }

  async sendMessage(conversationId: string): Promise<void> {
    const message = this.messageInput[conversationId];
    if (!message || !message.trim() || !this.hubConnection) {
      return;
    }

    try {
      await this.hubConnection.invoke('SendMessage', conversationId, message);
      this.messageInput[conversationId] = '';
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }

  async endChat(conversationId: string): Promise<void> {
    if (
      !confirm('Are you sure you want to end this chat?') ||
      !this.hubConnection
    ) {
      return;
    }

    try {
      await this.hubConnection.invoke('EndConversation', conversationId);
    } catch (err) {
      console.error('Error ending conversation:', err);
    }
  }

  async sendTypingIndicator(conversationId: string): Promise<void> {
    if (!this.hubConnection) return;

    try {
      await this.hubConnection.invoke(
        'SendTypingIndicator',
        conversationId,
        true
      );

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        if (this.hubConnection) {
          await this.hubConnection.invoke(
            'SendTypingIndicator',
            conversationId,
            false
          );
        }
      }, 1000);
    } catch (err) {
      console.error('Error sending typing indicator:', err);
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
