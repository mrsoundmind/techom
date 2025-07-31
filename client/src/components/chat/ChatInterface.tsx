import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWebSocket, getWebSocketUrl, type SendMessageData } from '@/lib/websocket';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  conversationId: string;
  userId: string | null;
  agentId: string | null;
  content: string;
  messageType: 'user' | 'agent' | 'system';
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface ChatInterfaceProps {
  conversationId: string;
  chatType: 'project' | 'team' | 'hatch';
  projectId: string;
  teamId?: string;
  agentId?: string;
  agentName?: string;
  agentColor?: string;
}

export function ChatInterface({
  conversationId,
  chatType,
  projectId,
  teamId,
  agentId,
  agentName,
  agentColor = 'blue'
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // WebSocket connection
  const { connectionStatus, sendMessage: sendWebSocketMessage } = useWebSocket(
    getWebSocketUrl(),
    {
      onMessage: (wsMessage) => {
        if (wsMessage.type === 'message_received') {
          // Invalidate and refetch messages when new message received
          queryClient.invalidateQueries({ queryKey: ['/api/conversations', conversationId, 'messages'] });
        }
        if (wsMessage.type === 'typing_indicator') {
          setIsTyping(wsMessage.isTyping && wsMessage.agentId === agentId);
        }
      },
      onConnect: () => {
        // Join the conversation room when connected
        sendWebSocketMessage({
          type: 'join_conversation',
          conversationId: conversationId
        });
      }
    }
  );

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['/api/conversations', conversationId, 'messages'],
    enabled: !!conversationId
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageContent: string) => {
      const messageData = {
        conversationId,
        userId: null, // Will be set when user auth is implemented
        agentId: chatType === 'hatch' ? null : agentId, // User message
        content: messageContent,
        messageType: 'user' as const,
        metadata: {}
      };

      // Send via WebSocket for real-time delivery
      const wsMessage: SendMessageData = {
        type: 'send_message',
        conversationId,
        message: messageData
      };
      sendWebSocketMessage(wsMessage);

      // Also save via REST API
      return apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify(messageData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/conversations', conversationId, 'messages'] });
      setMessage('');
    }
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    
    sendMessageMutation.mutate(message.trim());
  };

  const getChatTitle = () => {
    switch (chatType) {
      case 'project':
        return 'Project Chat';
      case 'team':
        return 'Team Chat';
      case 'hatch':
        return agentName ? `Chat with ${agentName}` : 'Hatch Chat';
      default:
        return 'Chat';
    }
  };

  const getMessageSender = (msg: Message) => {
    if (msg.messageType === 'user') return 'You';
    if (msg.messageType === 'agent' && agentName) return agentName;
    if (msg.messageType === 'system') return 'System';
    return 'Agent';
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          {chatType === 'hatch' ? (
            <div className={`w-8 h-8 rounded-full bg-${agentColor}-500 flex items-center justify-center`}>
              <Bot className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-white font-medium">{getChatTitle()}</h3>
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                'bg-gray-500'
              }`} />
              <span className="text-gray-400">
                {connectionStatus === 'connected' ? 'Connected' :
                 connectionStatus === 'connecting' ? 'Connecting...' :
                 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-400">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center text-gray-400">
              <p className="mb-2">No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.messageType === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-cent
                 ${msg.messageType === 'user' 
                    ? 'bg-blue-500' 
                    : `bg-${agentColor}-500`
                  }`}
                >
                  {msg.messageType === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] ${
                  msg.messageType === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className="text-xs text-gray-400 mb-1">
                    {getMessageSender(msg)}
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${
                    msg.messageType === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full bg-${agentColor}-500 flex items-center justify-center`}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${chatType === 'hatch' ? agentName || 'agent' : 'team'}...`}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            disabled={sendMessageMutation.isPending || connectionStatus !== 'connected'}
          />
          <Button
            type="submit"
            disabled={!message.trim() || sendMessageMutation.isPending || connectionStatus !== 'connected'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        {connectionStatus !== 'connected' && (
          <p className="text-xs text-yellow-400 mt-2">
            Reconnecting to chat server...
          </p>
        )}
      </div>
    </div>
  );
}