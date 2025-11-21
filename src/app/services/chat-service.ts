import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

import { AuthenticationService } from './authentication-service';

export interface ChatMessage {
  id?: string
  conversationId: string
  userId: string
  content: string
  isFromAgent: boolean
  timestamp: Date
}

export interface ConnectionStatus {
  connected: boolean
  conversationId?: string
  agentId?: string
  agentName?: string
  agentEmail?: string
  queuePosition?: number
}

export interface WaitingUser {
  userId: string
  userName: string
  userEmail: string
  waitingSince: Date
}

export interface ActiveChat {
  conversationId: string
  userId: string
  userName: string
  userEmail: string
  messages: ChatMessage[]
  isTyping: boolean
}

export interface QueueSync {
  users: WaitingUser[]
  count: number
  timestamp: Date
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection | null = null;
  private readonly messagesSubject = new BehaviorSubject<string[]>([]);
  private readonly connectionStatusSubject =
    new BehaviorSubject<ConnectionStatus>({ connected: false });

  private readonly typingSubject = new BehaviorSubject<boolean>(false);

  public messages$ = this.messagesSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();
  public typing$ = this.typingSubject.asObservable();

  constructor(private readonly authService: AuthenticationService) {}

  async startConnection(): Promise<void> {
    const token = this.authService.getAuthToken();

    if (!token) {
      console.error('No auth token found');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:9000/chathub', {
        accessTokenFactory: () => token,
        skipNegotiation: false,
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.ServerSentEvents
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Exponential backoff
          return Math.min(
            1000 * Math.pow(2, retryContext.previousRetryCount),
            30000
          );
        }
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupSignalRListeners();

    try {
      await this.hubConnection.start();
      console.log('SignalR Connected');
    } catch (err) {
      console.error('Error connecting to SignalR:', err);
      // Retry after 5 seconds
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      //   setTimeout(async () => {
      //     await this.startConnection();
      //   }, 5000);
    }
  }

  private setupSignalRListeners(): void {
    if (!this.hubConnection) return;

    // Receive messages
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, message]);
    });

    // Message sent confirmation
    this.hubConnection.on('MessageSent', (message: string) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, message]);
    });

    // Agent assigned (for users)
    this.hubConnection.on('AgentAssigned', (data: ActiveChat) => {
      this.connectionStatusSubject.next({
        connected: true,
        conversationId: data.conversationId,
        agentId: data.userId,
        agentName: data.userName,
        agentEmail: data.userEmail
      });
      console.log('Connected to agent:', data.userName);
    });

    // Added to queue (for users)
    this.hubConnection.on('AddedToQueue', (position: number) => {
      this.connectionStatusSubject.next({
        connected: false,
        queuePosition: position
      });
      console.log('Added to queue, position:', position);
    });

    // Typing indicator
    this.hubConnection.on('UserTyping', (data: any) => {
      this.typingSubject.next(data.isTyping);
    });

    // Agent disconnected
    this.hubConnection.on('AgentDisconnected', () => {
      this.connectionStatusSubject.next({ connected: false });
    });

    // Conversation ended
    this.hubConnection.on('ConversationEnded', (conversationId: string) => {
      this.connectionStatusSubject.next({ connected: false });
      this.messagesSubject.next([]);
      console.log('Conversation ended:', conversationId);
    });

    // Error handling
    this.hubConnection.on('Error', (errorMessage: string) => {
      console.error('SignalR Error:', errorMessage);
    });

    // Reconnection handling
    this.hubConnection.onreconnecting(() => {
      console.log('Reconnecting to chat...');
      this.connectionStatusSubject.next({ connected: false });
    });

    this.hubConnection.onreconnected(() => {
      console.log('Reconnected to chat');
    });

    this.hubConnection.onclose((error) => {
      console.log('Connection closed', error);
      this.connectionStatusSubject.next({ connected: false });
    });
  }

  async sendMessage(conversationId: string, message: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to chat hub');
    }

    try {
      await this.hubConnection.invoke('SendMessage', conversationId, message);
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  }

  async sendTypingIndicator(
    conversationId: string,
    isTyping: boolean
  ): Promise<void> {
    if (!this.hubConnection) return;

    try {
      await this.hubConnection.invoke(
        'SendTypingIndicator',
        conversationId,
        isTyping
      );
    } catch (err) {
      console.error('Error sending typing indicator:', err);
    }
  }

  async endConversation(conversationId: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to chat hub');
    }

    try {
      await this.hubConnection.invoke('EndConversation', conversationId);
    } catch (err) {
      console.error('Error ending conversation:', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      this.hubConnection = null;
    }
  }

  resetState(): void {
    this.messagesSubject.next([]);
    this.connectionStatusSubject.next({ connected: false });
    // this.typingSubject.next(false);
  }
}
