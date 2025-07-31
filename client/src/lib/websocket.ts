import { useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface WebSocketHook {
  socket: WebSocket | null;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  sendMessage: (message: WebSocketMessage) => void;
  lastMessage: WebSocketMessage | null;
}

export function useWebSocket(url: string, options?: {
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
}): WebSocketHook {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectInterval = options?.reconnectInterval || 3000;

  const connect = () => {
    try {
      setConnectionStatus('connecting');
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected');
        setSocket(ws);
        options?.onConnect?.();
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastMessage(message);
          options?.onMessage?.(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnectionStatus('disconnected');
        setSocket(null);
        options?.onDisconnect?.();

        // Auto-reconnect
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, reconnectInterval);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        options?.onError?.(error);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
    }
  };

  const sendMessage = (message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return {
    socket,
    connectionStatus,
    sendMessage,
    lastMessage
  };
}

// WebSocket URL helper
export function getWebSocketUrl(): string {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws`;
}

// Message type definitions for type safety
export interface JoinConversationMessage {
  type: 'join_conversation';
  conversationId: string;
}

export interface SendMessageData {
  type: 'send_message';
  conversationId: string;
  message: {
    conversationId: string;
    userId?: string;
    agentId?: string;
    content: string;
    messageType: 'user' | 'agent' | 'system';
    metadata?: Record<string, any>;
  };
}

export interface StartTypingMessage {
  type: 'start_typing';
  conversationId: string;
  agentId: string;
  estimatedDuration?: number;
}

export interface StopTypingMessage {
  type: 'stop_typing';
  conversationId: string;
  agentId: string;
}

// Connection status indicator component
export function ConnectionStatus({ status }: { status: 'connecting' | 'connected' | 'disconnected' | 'error' }) {
  const statusConfig = {
    connecting: { color: 'text-yellow-500', text: 'Connecting...' },
    connected: { color: 'text-green-500', text: 'Connected' },
    disconnected: { color: 'text-gray-500', text: 'Disconnected' },
    error: { color: 'text-red-500', text: 'Connection Error' }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 text-xs ${config.color}`}>
      <div className={`w-2 h-2 rounded-full ${
        status === 'connected' ? 'bg-green-500' :
        status === 'connecting' ? 'bg-yellow-500 animate-pulse' :
        status === 'error' ? 'bg-red-500' :
        'bg-gray-500'
      }`} />
      {config.text}
    </div>
  );
}