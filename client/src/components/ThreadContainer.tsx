import { useState } from 'react';
import { ChevronDown, ChevronRight, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreadMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  messageType: 'user' | 'agent';
  timestamp: string;
  isStreaming?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'failed' | 'streaming';
  metadata?: {
    agentRole?: string;
    replyTo?: {
      id: string;
      content: string;
      senderName: string;
    };
  };
  parentMessageId?: string;
  threadRootId?: string;
  threadDepth: number;
}

interface ThreadContainerProps {
  rootMessage: ThreadMessage;
  replies: ThreadMessage[];
  isCollapsed: boolean;
  onToggleCollapse: (threadId: string) => void;
  onReaction?: (messageId: string, reactionType: 'thumbs_up' | 'thumbs_down') => void;
  onReply?: (messageId: string, content: string, senderName: string) => void;
  chatContext?: {
    mode: 'project' | 'team' | 'agent';
    color: string;
  };
  children: React.ReactNode; // MessageBubble components
}

export function ThreadContainer({
  rootMessage,
  replies,
  isCollapsed,
  onToggleCollapse,
  children,
  chatContext
}: ThreadContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const totalReplies = replies.length;
  const uniqueParticipants = new Set([
    rootMessage.senderName,
    ...replies.map(r => r.senderName)
  ]).size;
  
  const hasReplies = totalReplies > 0;
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thread indicator line */}
      {hasReplies && !isCollapsed && (
        <div 
          className="absolute left-6 top-16 bottom-4 w-0.5 bg-gray-600 opacity-60"
          style={{ 
            background: `linear-gradient(to bottom, 
              hsla(158, 66%, 57%, 0.3) 0%, 
              hsla(158, 66%, 57%, 0.1) 100%)`
          }}
        />
      )}
      
      {/* Root message */}
      <div className="relative">
        {children}
        
        {/* Thread controls - only show if there are replies */}
        {hasReplies && (
          <AnimatePresence>
            {(isHovered || isCollapsed) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute -bottom-1 left-12 flex items-center gap-2"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleCollapse(rootMessage.id)}
                  className="h-6 px-2 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 text-xs text-gray-300 hover:text-white"
                  data-testid={`thread-toggle-${rootMessage.id}`}
                >
                  {isCollapsed ? (
                    <>
                      <ChevronRight className="w-3 h-3 mr-1" />
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {totalReplies} {totalReplies === 1 ? 'reply' : 'replies'}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      Hide thread
                    </>
                  )}
                </Button>
                
                {/* Participant count */}
                {uniqueParticipants > 1 && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded border border-gray-600/30">
                    <Users className="w-3 h-3" />
                    {uniqueParticipants}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      
      {/* Thread replies */}
      {hasReplies && !isCollapsed && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-8 relative"
            data-testid={`thread-replies-${rootMessage.id}`}
          >
            {/* Thread replies will be rendered here by parent component */}
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Collapsed thread preview */}
      {hasReplies && isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-8 mt-2 p-3 bg-gray-800/30 border border-gray-600/30 rounded-lg"
          data-testid={`thread-preview-${rootMessage.id}`}
        >
          <div className="text-xs text-gray-400 mb-1">
            Thread collapsed • {totalReplies} {totalReplies === 1 ? 'reply' : 'replies'} 
            {uniqueParticipants > 1 && ` • ${uniqueParticipants} participants`}
          </div>
          {replies.length > 0 && (
            <div className="text-sm text-gray-300 truncate">
              <span className="font-medium">{replies[replies.length - 1].senderName}:</span>{' '}
              {replies[replies.length - 1].content.substring(0, 80)}...
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}