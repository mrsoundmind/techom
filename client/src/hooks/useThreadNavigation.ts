import { useState, useMemo } from 'react';

interface ThreadMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  messageType: 'user' | 'agent';
  timestamp: string;
  parentMessageId?: string;
  threadRootId?: string;
  threadDepth: number;
  metadata?: {
    agentRole?: string;
    replyTo?: {
      id: string;
      content: string;
      senderName: string;
    };
  };
}

interface ThreadStructure {
  rootMessage: ThreadMessage;
  replies: ThreadMessage[];
  allMessages: ThreadMessage[];
  totalReplies: number;
  participants: string[];
}

export function useThreadNavigation(messages: ThreadMessage[]) {
  const [collapsedThreads, setCollapsedThreads] = useState<Set<string>>(new Set());
  
  // C1.3: Build thread structure from flat message list
  const threadStructure = useMemo(() => {
    const threads = new Map<string, ThreadStructure>();
    const orphanedMessages: ThreadMessage[] = [];
    
    // Sort messages by timestamp to maintain chronological order
    const sortedMessages = [...messages].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // First pass: identify root messages and build thread map
    for (const message of sortedMessages) {
      if (message.threadDepth === 0 || !message.threadRootId) {
        // This is a root message
        threads.set(message.id, {
          rootMessage: message,
          replies: [],
          allMessages: [message],
          totalReplies: 0,
          participants: [message.senderName]
        });
      }
    }
    
    // Second pass: assign replies to their threads
    for (const message of sortedMessages) {
      if (message.threadDepth > 0 && message.threadRootId) {
        const thread = threads.get(message.threadRootId);
        if (thread) {
          thread.replies.push(message);
          thread.allMessages.push(message);
          thread.totalReplies++;
          if (!thread.participants.includes(message.senderName)) {
            thread.participants.push(message.senderName);
          }
        } else {
          // Thread root not found, treat as orphaned
          orphanedMessages.push(message);
        }
      }
    }
    
    // Sort replies within each thread by timestamp
    Array.from(threads.values()).forEach(thread => {
      thread.replies.sort((a: ThreadMessage, b: ThreadMessage) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
    
    return { threads, orphanedMessages };
  }, [messages]);
  
  // Toggle thread collapse state
  const toggleThreadCollapse = (threadId: string) => {
    setCollapsedThreads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(threadId)) {
        newSet.delete(threadId);
      } else {
        newSet.add(threadId);
      }
      return newSet;
    });
  };
  
  // Check if thread is collapsed
  const isThreadCollapsed = (threadId: string) => {
    return collapsedThreads.has(threadId);
  };
  
  // Get all visible messages (considering collapsed threads)
  const getVisibleMessages = () => {
    const visibleMessages: ThreadMessage[] = [];
    
    Array.from(threadStructure.threads.values()).forEach(thread => {
      // Always show root message
      visibleMessages.push(thread.rootMessage);
      
      // Show replies only if thread is not collapsed
      if (!collapsedThreads.has(thread.rootMessage.id)) {
        visibleMessages.push(...thread.replies);
      }
    });
    
    // Add orphaned messages
    visibleMessages.push(...threadStructure.orphanedMessages);
    
    // Sort by timestamp to maintain chronological order
    return visibleMessages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };
  
  // Get thread statistics
  const getThreadStats = () => {
    const totalThreads = threadStructure.threads.size;
    const totalReplies = Array.from(threadStructure.threads.values())
      .reduce((sum, thread) => sum + thread.totalReplies, 0);
    const collapsedCount = collapsedThreads.size;
    
    return {
      totalThreads,
      totalReplies,
      collapsedCount,
      visibleMessages: getVisibleMessages().length,
      totalMessages: messages.length
    };
  };
  
  // Navigation helpers
  const getThreadForMessage = (messageId: string) => {
    for (const [threadId, thread] of Array.from(threadStructure.threads.entries())) {
      if (thread.allMessages.some((msg: ThreadMessage) => msg.id === messageId)) {
        return { threadId, thread };
      }
    }
    return null;
  };
  
  const getNextThreadMessage = (currentMessageId: string) => {
    const threadData = getThreadForMessage(currentMessageId);
    if (!threadData) return null;
    
    const { thread } = threadData;
    const currentIndex = thread.allMessages.findIndex((msg: ThreadMessage) => msg.id === currentMessageId);
    if (currentIndex >= 0 && currentIndex < thread.allMessages.length - 1) {
      return thread.allMessages[currentIndex + 1];
    }
    return null;
  };
  
  const getPreviousThreadMessage = (currentMessageId: string) => {
    const threadData = getThreadForMessage(currentMessageId);
    if (!threadData) return null;
    
    const { thread } = threadData;
    const currentIndex = thread.allMessages.findIndex((msg: ThreadMessage) => msg.id === currentMessageId);
    if (currentIndex > 0) {
      return thread.allMessages[currentIndex - 1];
    }
    return null;
  };
  
  // Collapse all threads
  const collapseAllThreads = () => {
    const allThreadIds = Array.from(threadStructure.threads.keys());
    setCollapsedThreads(new Set(allThreadIds));
  };
  
  // Expand all threads
  const expandAllThreads = () => {
    setCollapsedThreads(new Set());
  };
  
  return {
    threadStructure,
    collapsedThreads,
    toggleThreadCollapse,
    isThreadCollapsed,
    getVisibleMessages,
    getThreadStats,
    getThreadForMessage,
    getNextThreadMessage,
    getPreviousThreadMessage,
    collapseAllThreads,
    expandAllThreads,
  };
}