// Intelligent Response System for AI Colleagues
// Integrates role profiles, prompt templates, and example interactions

import { getRoleProfile, type RoleProfile } from './roleProfiles';
import { buildSystemPrompt, detectUserType } from './promptTemplate';
import { getExampleInteractions } from './exampleInteractions';

interface ChatContext {
  mode: 'project' | 'team' | 'agent';
  participants: string[];
  scope: string;
  projectMemory?: string;
}

interface ResponseContext {
  userMessage: string;
  agentName: string;
  chatContext: ChatContext;
  projectSummary?: string;
  recentMessages?: string[];
  teamMemory?: string;
}

export function generateIntelligentResponse(context: ResponseContext): string {
  const { userMessage, agentName, chatContext, projectSummary = "", recentMessages = [] } = context;
  
  // Get role profile for this agent
  const roleProfile = getRoleProfile(agentName);
  if (!roleProfile) {
    return generateFallbackResponse(agentName, userMessage, chatContext);
  }

  // Detect user behavior type
  const userType = detectUserType(userMessage);
  
  // Get example interactions for this role
  const examples = getExampleInteractions(agentName);
  
  // Find similar example if available
  const similarExample = findSimilarExample(userMessage, examples);
  
  // Build contextual response
  const response = buildContextualResponse({
    userMessage,
    agentName,
    roleProfile,
    chatContext,
    userType,
    similarExample,
    projectSummary,
    recentMessages
  });

  return response;
}

function findSimilarExample(userMessage: string, examples: Array<{user: string, response: string}>): string | null {
  const lowerMessage = userMessage.toLowerCase();
  
  // Simple keyword matching for now
  for (const example of examples) {
    const exampleWords = example.user.toLowerCase().split(' ');
    const messageWords = lowerMessage.split(' ');
    
    // Check for common keywords
    const commonWords = exampleWords.filter(word => 
      messageWords.some(msgWord => msgWord.includes(word) || word.includes(msgWord))
    );
    
    if (commonWords.length >= 2) {
      return example.response;
    }
  }
  
  return null;
}

interface ContextualResponseProps {
  userMessage: string;
  agentName: string;
  roleProfile: RoleProfile;
  chatContext: ChatContext;
  userType: string;
  similarExample: string | null;
  projectSummary: string;
  recentMessages: string[];
}

function buildContextualResponse(props: ContextualResponseProps): string {
  const { userMessage, agentName, roleProfile, chatContext, userType, similarExample, projectSummary } = props;
  
  // If we have a similar example, adapt it
  if (similarExample) {
    return adaptExampleResponse(similarExample, userMessage, agentName, roleProfile);
  }
  
  // Generate role-specific response based on message content
  return generateRoleSpecificResponse(userMessage, agentName, roleProfile, chatContext, userType);
}

function adaptExampleResponse(example: string, userMessage: string, agentName: string, roleProfile: RoleProfile): string {
  // For now, return the example response
  // In a real implementation, this would use AI to adapt the example
  return example;
}

function generateRoleSpecificResponse(
  userMessage: string, 
  agentName: string, 
  roleProfile: RoleProfile, 
  chatContext: ChatContext,
  userType: string
): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Role-specific response patterns
  if (agentName === "Product Manager") {
    if (lowerMessage.includes("roadmap") || lowerMessage.includes("plan")) {
      return "Let me break this down into phases. What's our primary goal and timeline?";
    }
    if (lowerMessage.includes("priority") || lowerMessage.includes("urgent")) {
      return "I'll help prioritize. What's the impact vs effort on each item?";
    }
    if (lowerMessage.includes("stuck") || lowerMessage.includes("blocked")) {
      return "Let's identify the blocker. Is it resources, decisions, or dependencies?";
    }
  }
  
  if (agentName === "Product Designer") {
    if (lowerMessage.includes("design") || lowerMessage.includes("ui") || lowerMessage.includes("ux")) {
      return "I'll help with the design approach. What's the main user goal here?";
    }
    if (lowerMessage.includes("user") || lowerMessage.includes("flow")) {
      return "Let's map the user journey. What should feel effortless?";
    }
    if (lowerMessage.includes("confusing") || lowerMessage.includes("unclear")) {
      return "Clarity first. Let me suggest some information architecture improvements.";
    }
  }
  
  if (agentName === "UI Engineer") {
    if (lowerMessage.includes("code") || lowerMessage.includes("implement") || lowerMessage.includes("build")) {
      return "I can help implement this. What's the technical approach you're considering?";
    }
    if (lowerMessage.includes("bug") || lowerMessage.includes("error") || lowerMessage.includes("broken")) {
      return "Let me help debug this. Can you share the error details or steps to reproduce?";
    }
    if (lowerMessage.includes("performance") || lowerMessage.includes("slow")) {
      return "I'll optimize this. Usually it's bundle size, images, or inefficient renders.";
    }
  }
  
  if (agentName === "Backend Developer") {
    if (lowerMessage.includes("api") || lowerMessage.includes("server") || lowerMessage.includes("database")) {
      return "I'll handle the backend architecture. What's the data flow you need?";
    }
    if (lowerMessage.includes("auth") || lowerMessage.includes("login") || lowerMessage.includes("security")) {
      return "Security is crucial. I recommend JWT with proper validation and rate limiting.";
    }
    if (lowerMessage.includes("scale") || lowerMessage.includes("users")) {
      return "Let's plan for scale. I'll design the database and caching strategy.";
    }
  }
  
  if (agentName === "QA Lead") {
    if (lowerMessage.includes("test") || lowerMessage.includes("quality") || lowerMessage.includes("bug")) {
      return "I'll ensure quality. Let me create comprehensive test cases for this feature.";
    }
    if (lowerMessage.includes("ready") || lowerMessage.includes("ship") || lowerMessage.includes("release")) {
      return "I'll verify readiness. Need to check edge cases and user acceptance criteria.";
    }
  }
  
  // Default response based on role and user type
  return generateDefaultResponse(agentName, roleProfile, userType);
}

function generateDefaultResponse(agentName: string, roleProfile: RoleProfile, userType: string): string {
  const responses = {
    anxious: `As your ${roleProfile.roleTitle}, I'm here to help. Let's break this down step by step.`,
    decisive: `Got it. Here's my ${roleProfile.roleTitle} perspective on moving forward.`,
    reflective: `That's a thoughtful question. From my ${roleProfile.roleTitle} experience, I'd suggest considering...`,
    "fast-paced": `Quick ${roleProfile.roleTitle} take: let's focus on the essentials first.`,
    neutral: `From my ${roleProfile.roleTitle} perspective, I can help with this.`
  };
  
  return responses[userType as keyof typeof responses] || responses.neutral;
}

function generateFallbackResponse(agentName: string, userMessage: string, chatContext: ChatContext): string {
  return `Hi! I'm ${agentName} and I'm here to help with this ${chatContext.mode} discussion. What specific aspect would you like my input on?`;
}