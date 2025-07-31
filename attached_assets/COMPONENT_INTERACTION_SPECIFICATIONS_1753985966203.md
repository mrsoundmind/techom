# 🧩 Component-Level Interaction Specifications
**Detailed behavior for each major component**

---

## 📑 **TABLE OF CONTENTS**

1. [ProjectSidebar Interactions](#projectsidebar-interactions)
2. [EnhancedMultiAgentChat Interactions](#enhancedmultiagentchat-interactions)
3. [DynamicSidebar (Brain Panel) Interactions](#dynamicsidebar-brain-panel-interactions)
4. [Modal Component Interactions](#modal-component-interactions)
5. [Animation Component Interactions](#animation-component-interactions)

---

## 🗂️ **PROJECTSIDEBAR INTERACTIONS**

### **Component Structure**
```typescript
interface ProjectSidebarProps {
  setSidebarOpen: (open: boolean) => void;
  projects: Project[];
  teams: Team[];
  agents: Agent[];
  activeProjectId: string | null;
  activeAgentId: string | null;
  activeTeamId: string | null;
  onSelectProject: (id: string) => void;
  onSelectAgent: (agentId: string, projectId: string) => void;
  onSelectTeam: (teamId: string, projectId: string) => void;
  // ... other handlers
}
```

### **Header Section Interactions**

#### **1. Collapse Button**
```typescript
// Location: Top-right of sidebar header
// Trigger: onClick
// Action: setSidebarOpen(false)
// Visual: Chevron icon pointing left
// Result: Sidebar collapses to SlimSidebar
```

**Interaction Flow:**
- **Hover**: Button background changes to `hover:bg-[#43444B]`
- **Click**: Triggers collapse animation
- **Focus**: Keyboard accessible with tab navigation

#### **2. Add Project Button**
```typescript
// Location: Bottom of sidebar
// Trigger: onClick → opens project creation modal
// Visual: Plus icon with "Add Project" text
// States: Default, hover, loading (during creation)
```

**Interaction Flow:**
- **Default**: `bg-[#6C82FF]` with white text
- **Hover**: `bg-[#5A6FE8]` (darker blue)
- **Click**: Opens NewProjectDialog modal
- **Loading**: Shows spinner if project creation in progress

### **Project List Interactions**

#### **1. Project Card Selection**
```typescript
// Visual States:
// - Default: Transparent background
// - Hover: bg-[#43444B]
// - Selected: bg-[#6C82FF]/10 with left border-[#6C82FF]
// - Focus: Ring outline for keyboard navigation

const ProjectCard = ({ project, isActive, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`
        cursor-pointer p-3 rounded-lg transition-all duration-200
        ${isActive ? 'bg-[#6C82FF]/10 border-l-2 border-[#6C82FF]' : 'hover:bg-[#43444B]'}
      `}
      onClick={() => onSelect(project.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project content */}
    </div>
  );
};
```

**Interaction Flow:**
1. **Mouse Enter**: Background fades to hover color
2. **Click**: Project becomes active, triggers selection cascade
3. **Mouse Leave**: Background returns to default
4. **Keyboard Navigation**: Tab focus with visible outline

#### **2. Project Color Indicator**
```typescript
// Visual: 12px circle with project color
// Colors: amber, green, blue, purple
// No interaction (visual only)

const colorMap = {
  amber: '#F59E0B',
  green: '#10B981', 
  blue: '#3B82F6',
  purple: '#8B5CF6'
};
```

#### **3. Project Expansion State**
```typescript
// Projects can be expanded/collapsed to show teams/agents
// Default: Expanded if active project
// Trigger: Click on expand/collapse icon

const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

const toggleProjectExpansion = (projectId: string) => {
  setExpandedProjects(prev => {
    const newSet = new Set(prev);
    if (newSet.has(projectId)) {
      newSet.delete(projectId);
    } else {
      newSet.add(projectId);
    }
    return newSet;
  });
};
```

### **Team/Agent Nested Items**

#### **1. Team Item Interactions**
```typescript
// Visual: Indented 16px from project edge
// Height: 40px
// States: Default, hover, selected

const TeamItem = ({ team, isActive, onSelect }) => (
  <div
    className={`
      ml-4 p-2 rounded cursor-pointer transition-colors
      ${isActive ? 'bg-[#6C82FF]/10' : 'hover:bg-[#43444B]'}
    `}
    onClick={() => onSelect(team.id, team.projectId)}
  >
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded bg-[#43444B] flex items-center justify-center">
        <UsersIcon className="w-3 h-3 text-[#A6A7AB]" />
      </div>
      <span className="text-sm text-[#F1F1F3]">{team.name}</span>
      <Badge className="text-xs">{team.members?.length || 0}</Badge>
    </div>
  </div>
);
```

#### **2. Agent Item Interactions**
```typescript
// Visual: Indented 16px, avatar + name + role
// States: Default, hover, selected, online/offline

const AgentItem = ({ agent, isActive, onSelect }) => (
  <div
    className={`
      ml-4 p-2 rounded cursor-pointer transition-colors
      ${isActive ? 'bg-[#6C82FF]/10' : 'hover:bg-[#43444B]'}
    `}
    onClick={() => onSelect(agent.id, agent.projectId)}
  >
    <div className="flex items-center gap-2">
      <Avatar size="sm" color={agent.color}>
        {agent.name.slice(0, 2)}
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-[#F1F1F3] truncate">{agent.name}</div>
        <div className="text-xs text-[#A6A7AB] truncate">{agent.role}</div>
      </div>
      <div className="w-2 h-2 bg-[#47DB9A] rounded-full" /> {/* Online indicator */}
    </div>
  </div>
);
```

### **Context Menu Interactions**

#### **Right-Click Context Menus**
```typescript
// Available on project/team/agent items
// Options vary by item type

const ProjectContextMenu = {
  options: [
    'Rename Project',
    'Change Color',
    'Add Team',
    'Add Agent',
    'Duplicate Project',
    'Delete Project'
  ]
};

const TeamContextMenu = {
  options: [
    'Rename Team',
    'Add Member',
    'Team Settings',
    'Delete Team'
  ]
};

const AgentContextMenu = {
  options: [
    'Rename Agent',
    'Change Role',
    'Move to Team',
    'Agent Settings',
    'Delete Agent'
  ]
};
```

---

## 💬 **ENHANCEDMULTIAGENTCHAT INTERACTIONS**

### **Component States**
```typescript
// Chat modes determine interface behavior
type ChatMode = 'project' | 'team' | 'agent';

const [chatMode, setChatMode] = useState<ChatMode>('project');
const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
```

### **Chat Header Interactions**

#### **1. Chat Mode Selector**
```typescript
// Three tab-style buttons
// Active state shows accent background

const ChatModeSelector = () => (
  <div className="flex gap-1 p-1 bg-[#43444B] rounded">
    {(['project', 'team', 'agent'] as ChatMode[]).map(mode => (
      <button
        key={mode}
        className={`
          px-3 py-1 rounded text-sm transition-colors
          ${chatMode === mode 
            ? 'bg-[#6C82FF] text-white' 
            : 'text-[#A6A7AB] hover:text-[#F1F1F3]'
          }
        `}
        onClick={() => setChatMode(mode)}
      >
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </button>
    ))}
  </div>
);
```

**Mode-Specific Behavior:**
- **Project Mode**: Shows project-wide conversation
- **Team Mode**: Shows team-specific conversation (if team selected)
- **Agent Mode**: Shows 1:1 conversation with specific agent

#### **2. Agent/Team Selector**
```typescript
// Appears when in agent/team mode
// Dropdown showing available agents/teams

const AgentSelector = ({ agents, selectedAgent, onSelect }) => (
  <Select value={selectedAgent} onValueChange={onSelect}>
    <SelectTrigger className="w-48">
      <SelectValue placeholder="Select agent..." />
    </SelectTrigger>
    <SelectContent>
      {agents.map(agent => (
        <SelectItem key={agent.id} value={agent.id}>
          <div className="flex items-center gap-2">
            <Avatar size="xs" color={agent.color}>
              {agent.name.slice(0, 2)}
            </Avatar>
            <span>{agent.name}</span>
            <Badge variant="outline">{agent.role}</Badge>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
```

### **Message Area Interactions**

#### **1. Message Display Logic**
```typescript
// Messages filtered by current context
const getMessagesForContext = () => {
  switch (chatMode) {
    case 'project':
      return messages.filter(m => m.projectId === activeProjectId);
    case 'team':
      return messages.filter(m => m.teamId === selectedTeam);
    case 'agent':
      return messages.filter(m => 
        m.agentId === selectedAgent || 
        (m.senderId === currentUserId && m.recipientId === selectedAgent)
      );
  }
};
```

#### **2. Message Bubble Interactions**
```typescript
// Different styles for user vs AI messages
// Hover shows timestamp and actions

const MessageBubble = ({ message, isUser }) => {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`
          max-w-[70%] p-3 rounded-lg
          ${isUser 
            ? 'bg-[#6C82FF] text-white rounded-br-sm' 
            : 'bg-[#43444B] text-[#F1F1F3] rounded-bl-sm'
          }
        `}
      >
        <div className="text-sm">{message.content}</div>
        {showActions && (
          <div className="flex gap-2 mt-2 text-xs opacity-70">
            <span>{message.timestamp}</span>
            <button>Reply</button>
            <button>Copy</button>
            <button>More</button>
          </div>
        )}
      </div>
    </div>
  );
};
```

#### **3. Typing Indicators**
```typescript
// Shows when other participants are typing
// Different colors for different agents

const TypingIndicator = ({ typingUsers }) => (
  <div className="flex items-center gap-2 px-4 py-2 text-sm text-[#A6A7AB]">
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-[#6C82FF] rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-[#6C82FF] rounded-full animate-bounce [animation-delay:0.1s]" />
      <div className="w-2 h-2 bg-[#6C82FF] rounded-full animate-bounce [animation-delay:0.2s]" />
    </div>
    <span>
      {typingUsers.map(user => user.name).join(', ')} 
      {typingUsers.length === 1 ? ' is' : ' are'} typing...
    </span>
  </div>
);
```

### **Input Area Interactions**

#### **1. Message Input Field**
```typescript
// Auto-expanding textarea with placeholder text
// Different placeholders based on context

const getPlaceholder = () => {
  switch (chatMode) {
    case 'project':
      return `Message ${activeProject?.name}...`;
    case 'team':
      return selectedTeam ? `Message ${selectedTeam.name}...` : 'Select a team...';
    case 'agent':
      return selectedAgent ? `Message ${selectedAgent.name}...` : 'Select an agent...';
  }
};

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-[#43444B]">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={getPlaceholder()}
          disabled={disabled}
          className="w-full resize-none bg-[#37383B] border border-[#43444B] rounded-lg px-3 py-2 text-[#F1F1F3] placeholder-[#A6A7AB]"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="p-2 bg-[#6C82FF] hover:bg-[#5A6FE8] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
      >
        <SendIcon className="w-5 h-5 text-white" />
      </button>
    </form>
  );
};
```

#### **2. Attachment Interactions**
```typescript
// File upload, image paste, link sharing
// Drag & drop support

const AttachmentButton = ({ onAttach }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    onAttach(files);
  };
  
  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 text-[#A6A7AB] hover:text-[#F1F1F3] rounded"
      >
        <PaperclipIcon className="w-5 h-5" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />
    </>
  );
};
```

### **Welcome Message System**

#### **Maya Welcome Message**
```typescript
// Special welcome message for Maya projects
// Dismissible, auto-shows on Maya creation

const MayaWelcomeMessage = ({ message, onDismiss }) => (
  <div className="bg-gradient-to-r from-[#6C82FF]/20 to-[#9F7BFF]/20 border border-[#6C82FF]/30 rounded-lg p-4 mb-4">
    <div className="flex items-start gap-3">
      <Avatar size="sm" color="blue">
        M
      </Avatar>
      <div className="flex-1">
        <div className="font-medium text-[#F1F1F3] mb-1">Maya</div>
        <div className="text-sm text-[#F1F1F3]">{message}</div>
      </div>
      <button
        onClick={onDismiss}
        className="text-[#A6A7AB] hover:text-[#F1F1F3]"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);
```

#### **Team Welcome Message**
```typescript
// Welcome message for newly created teams
// Shows team member introductions

const TeamWelcomeMessage = ({ team, members, onDismiss }) => (
  <div className="bg-[#47DB9A]/20 border border-[#47DB9A]/30 rounded-lg p-4 mb-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-medium text-[#F1F1F3]">Welcome to {team.name}! 🎉</h3>
      <button onClick={onDismiss} className="text-[#A6A7AB] hover:text-[#F1F1F3]">
        <XIcon className="w-4 h-4" />
      </button>
    </div>
    <div className="space-y-2">
      {members.map(member => (
        <div key={member.id} className="flex items-center gap-2 text-sm">
          <Avatar size="xs" color={member.color}>
            {member.name.slice(0, 2)}
          </Avatar>
          <span className="text-[#F1F1F3]">{member.name}</span>
          <span className="text-[#A6A7AB]">• {member.role}</span>
        </div>
      ))}
    </div>
  </div>
);
```

---

## 🧠 **DYNAMICSIDEBAR (BRAIN PANEL) INTERACTIONS**

### **Panel Header**

#### **1. Collapse Button**
```typescript
// Location: Top-right of brain panel
// Trigger: onClick → setBrainOpen(false)
// Visual: Chevron pointing right

const BrainHeader = ({ onCollapse }) => (
  <div className="flex items-center justify-between p-4 border-b border-[#43444B]">
    <h2 className="text-lg font-medium text-[#F1F1F3]">Project Brain</h2>
    <button
      onClick={onCollapse}
      className="p-1 text-[#A6A7AB] hover:text-[#F1F1F3] rounded"
    >
      <ChevronRightIcon className="w-5 h-5" />
    </button>
  </div>
);
```

### **Progress Ring Interactions**

#### **1. Progress Visualization**
```typescript
// SVG circle with animated progress
// Shows project completion percentage

const ProgressRing = ({ progress, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#43444B"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#47DB9A"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold text-[#F1F1F3]">{progress}%</span>
      </div>
    </div>
  );
};
```

#### **2. Progress Interaction**
```typescript
// Click to show detailed breakdown
// Hover to show time spent

const [showProgressDetail, setShowProgressDetail] = useState(false);

const handleProgressClick = () => {
  setShowProgressDetail(true);
  // Could open modal with detailed progress breakdown
};
```

### **Documents Section**

#### **1. Document Card Interactions**
```typescript
// Cards show project documents/knowledge
// Click to open, hover for preview

const DocumentCard = ({ document, onOpen, onPreview }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="bg-[#37383B] rounded-lg p-3 cursor-pointer hover:bg-[#43444B] transition-colors"
      onClick={() => onOpen(document)}
      onMouseEnter={() => {
        setIsHovered(true);
        onPreview(document);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center bg-${document.color}-500/20`}>
          <FileIcon className={`w-4 h-4 text-${document.color}-400`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[#F1F1F3] truncate">{document.title}</h4>
          <p className="text-sm text-[#A6A7AB] line-clamp-2">{document.description}</p>
        </div>
        {isHovered && (
          <div className="text-[#A6A7AB]">
            <ExternalLinkIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};
```

### **Timeline Section**

#### **1. Timeline Item Interactions**
```typescript
// Timeline shows project milestones
// Click to mark complete, edit details

const TimelineItem = ({ item, index, onComplete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#47DB9A';
      case 'In Progress': return '#6C82FF';
      case 'Upcoming': return '#A6A7AB';
      default: return '#A6A7AB';
    }
  };
  
  return (
    <div
      className="relative flex items-start gap-3 pb-4 last:pb-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline connector line */}
      <div className="absolute left-2 top-6 bottom-0 w-px bg-[#43444B]" />
      
      {/* Status indicator */}
      <button
        onClick={() => item.status !== 'Completed' && onComplete(index)}
        className={`
          relative z-10 w-4 h-4 rounded-full border-2 transition-colors
          ${item.status === 'Completed' 
            ? 'bg-[#47DB9A] border-[#47DB9A]' 
            : 'bg-[#23262B] border-[#43444B] hover:border-[#6C82FF]'
          }
        `}
      >
        {item.status === 'Completed' && (
          <CheckIcon className="w-2 h-2 text-white absolute inset-0.5" />
        )}
      </button>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-[#F1F1F3]">{item.title}</h4>
          {isHovered && (
            <button
              onClick={() => onEdit(index)}
              className="p-1 text-[#A6A7AB] hover:text-[#F1F1F3] rounded"
            >
              <EditIcon className="w-3 h-3" />
            </button>
          )}
        </div>
        <p className="text-xs text-[#A6A7AB] mt-1">{item.date}</p>
      </div>
    </div>
  );
};
```

#### **2. Add Milestone Interaction**
```typescript
// Button to add new milestones
// Inline editing or modal form

const AddMilestoneButton = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  
  const handleSubmit = () => {
    if (title.trim() && date.trim()) {
      onAdd({ title: title.trim(), date: date.trim(), status: 'Upcoming' });
      setTitle('');
      setDate('');
      setIsAdding(false);
    }
  };
  
  if (isAdding) {
    return (
      <div className="bg-[#37383B] rounded-lg p-3 space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Milestone title..."
          className="w-full bg-[#23262B] border border-[#43444B] rounded px-2 py-1 text-sm text-[#F1F1F3]"
          autoFocus
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Target date..."
          className="w-full bg-[#23262B] border border-[#43444B] rounded px-2 py-1 text-sm text-[#F1F1F3]"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-[#6C82FF] text-white rounded text-sm"
          >
            Add
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-3 py-1 bg-[#43444B] text-[#F1F1F3] rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full p-3 border-2 border-dashed border-[#43444B] rounded-lg text-[#A6A7AB] hover:border-[#6C82FF] hover:text-[#6C82FF] transition-colors"
    >
      <PlusIcon className="w-4 h-4 mx-auto mb-1" />
      <span className="text-sm">Add Milestone</span>
    </button>
  );
};
```

### **Agent Context Panel**

#### **When Agent is Selected**
```typescript
// Brain panel shows agent-specific information
// Performance metrics, recent activity, capabilities

const AgentContextPanel = ({ agent, metrics }) => (
  <div className="space-y-6 p-4">
    {/* Agent header */}
    <div className="flex items-center gap-3">
      <Avatar size="lg" color={agent.color}>
        {agent.name.slice(0, 2)}
      </Avatar>
      <div>
        <h3 className="font-medium text-[#F1F1F3]">{agent.name}</h3>
        <p className="text-sm text-[#A6A7AB]">{agent.role}</p>
      </div>
    </div>
    
    {/* Performance metrics */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#37383B] rounded-lg p-3">
        <div className="text-2xl font-semibold text-[#F1F1F3]">{metrics.tasksCompleted}</div>
        <div className="text-xs text-[#A6A7AB]">Tasks Completed</div>
      </div>
      <div className="bg-[#37383B] rounded-lg p-3">
        <div className="text-2xl font-semibold text-[#F1F1F3]">{metrics.responseTime}</div>
        <div className="text-xs text-[#A6A7AB]">Avg Response</div>
      </div>
    </div>
    
    {/* Recent activity */}
    <div>
      <h4 className="font-medium text-[#F1F1F3] mb-2">Recent Activity</h4>
      <div className="space-y-2">
        {metrics.recentActivity?.map((activity, index) => (
          <div key={index} className="text-sm text-[#A6A7AB] flex justify-between">
            <span>{activity.description}</span>
            <span>{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

---

## 🎭 **MODAL COMPONENT INTERACTIONS**

### **OnboardingModal**

#### **Step Navigation**
```typescript
// Multi-step modal with progress indicator
// Steps: Welcome → Path Selection → Template Selection (if applicable) → Complete

const [currentStep, setCurrentStep] = useState(0);
const [selectedPath, setSelectedPath] = useState<'idea' | 'template' | 'scratch' | null>(null);

const steps = [
  'Welcome',
  'Choose Path',
  ...(selectedPath === 'template' ? ['Select Template'] : []),
  'Complete'
];

const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
```

#### **Path Selection Interactions**
```typescript
// Three main paths with different visual treatments
const PathSelector = ({ onSelect, selected }) => (
  <div className="grid gap-4">
    {[
      {
        id: 'idea',
        title: 'Start with an Idea',
        description: 'Work with Maya to develop your concept',
        icon: LightbulbIcon,
        color: 'blue'
      },
      {
        id: 'template',
        title: 'Use a Starter Pack',
        description: 'Begin with a pre-built team template',
        icon: TemplateIcon,
        color: 'green'
      },
      {
        id: 'scratch',
        title: 'Continue from Scratch',
        description: 'Explore existing projects and build manually',
        icon: BuildIcon,
        color: 'purple'
      }
    ].map(path => (
      <button
        key={path.id}
        onClick={() => onSelect(path.id)}
        className={`
          p-4 rounded-lg border-2 transition-all text-left
          ${selected === path.id
            ? `border-${path.color}-500 bg-${path.color}-500/10`
            : 'border-[#43444B] hover:border-[#6C82FF]'
          }
        `}
      >
        <path.icon className="w-8 h-8 mb-2 text-[#6C82FF]" />
        <h3 className="font-medium text-[#F1F1F3] mb-1">{path.title}</h3>
        <p className="text-sm text-[#A6A7AB]">{path.description}</p>
      </button>
    ))}
  </div>
);
```

### **Template Selection Modal**
```typescript
// Grid of template cards
// Filter by category, search functionality

const TemplateGrid = ({ templates, onSelect, selectedTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-4">
      {/* Search and filter */}
      <div className="flex gap-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search templates..."
          className="flex-1 bg-[#37383B] border border-[#43444B] rounded px-3 py-2 text-[#F1F1F3]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#37383B] border border-[#43444B] rounded px-3 py-2 text-[#F1F1F3]"
        >
          <option value="all">All Categories</option>
          <option value="business">Business</option>
          <option value="creative">Creative</option>
          <option value="tech">Technology</option>
        </select>
      </div>
      
      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`
              p-4 rounded-lg border text-left transition-all
              ${selectedTemplate?.id === template.id
                ? 'border-[#6C82FF] bg-[#6C82FF]/10'
                : 'border-[#43444B] hover:border-[#6C82FF]'
              }
            `}
          >
            <h4 className="font-medium text-[#F1F1F3] mb-1">{template.title}</h4>
            <p className="text-sm text-[#A6A7AB] mb-2">{template.description}</p>
            <div className="flex flex-wrap gap-1">
              {template.members.slice(0, 3).map((member, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {member}
                </Badge>
              ))}
              {template.members.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.members.length - 3} more
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

## ✨ **ANIMATION COMPONENT INTERACTIONS**

### **EggHatchingAnimation**

#### **Animation Sequence**
```typescript
// SVG-based animation with multiple stages
// Stages: Egg appears → Cracks form → Shell breaks → Agent emerges

const EggHatchingAnimation = ({ size = 'lg', onComplete }) => {
  const [stage, setStage] = useState('egg'); // 'egg' | 'cracking' | 'hatching' | 'complete'
  
  useEffect(() => {
    const sequence = [
      { stage: 'egg', duration: 500 },
      { stage: 'cracking', duration: 1500 },
      { stage: 'hatching', duration: 1000 },
      { stage: 'complete', duration: 500 }
    ];
    
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    
    const nextStage = () => {
      if (currentIndex < sequence.length - 1) {
        currentIndex++;
        setStage(sequence[currentIndex].stage);
        timeoutId = setTimeout(nextStage, sequence[currentIndex].duration);
      } else {
        onComplete();
      }
    };
    
    timeoutId = setTimeout(nextStage, sequence[0].duration);
    
    return () => clearTimeout(timeoutId);
  }, [onComplete]);
  
  return (
    <div className="relative">
      {/* Egg SVG with crack animations */}
      <svg width="120" height="140" viewBox="0 0 120 140">
        {/* Base egg shape */}
        <ellipse
          cx="60"
          cy="80"
          rx="40"
          ry="50"
          fill="#F1F1F3"
          stroke="#43444B"
          strokeWidth="2"
        />
        
        {/* Crack patterns - animated based on stage */}
        {(stage === 'cracking' || stage === 'hatching') && (
          <g className="animate-[crack-appear_0.5s_ease-out]">
            <path
              d="M45 60 L50 75 L45 90"
              stroke="#43444B"
              strokeWidth="2"
              fill="none"
              className="animate-[draw-line_1s_ease-out]"
            />
            <path
              d="M75 65 L70 80 L75 95"
              stroke="#43444B"
              strokeWidth="2"
              fill="none"
              className="animate-[draw-line_1s_ease-out_0.3s]"
            />
          </g>
        )}
        
        {/* Hatching effect */}
        {stage === 'hatching' && (
          <g className="animate-[shell-break_1s_ease-out]">
            {/* Egg pieces moving apart */}
            <ellipse
              cx="45"
              cy="70"
              rx="15"
              ry="20"
              fill="#F1F1F3"
              className="animate-[piece-left_1s_ease-out]"
            />
            <ellipse
              cx="75"
              cy="70"
              rx="15"
              ry="20"
              fill="#F1F1F3"
              className="animate-[piece-right_1s_ease-out]"
            />
          </g>
        )}
        
        {/* Agent emerges */}
        {(stage === 'hatching' || stage === 'complete') && (
          <circle
            cx="60"
            cy="80"
            r="25"
            fill="#6C82FF"
            className="animate-[agent-appear_0.5s_ease-out]"
          />
        )}
      </svg>
      
      {/* Particle effects */}
      {stage === 'hatching' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#47DB9A] rounded-full animate-[particle-burst_1s_ease-out]"
              style={{
                left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 30}%`,
                top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 30}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

### **ConfettiAnimation**

#### **Physics-Based Particle System**
```typescript
// Canvas-based confetti with realistic physics
// Multiple shapes, colors, gravity, rotation

const ConfettiAnimation = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Confetti particle class
    class ConfettiParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      shape: 'rect' | 'circle';
      size: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.3;
        this.color = ['#6C82FF', '#47DB9A', '#9F7BFF', '#FF4E6A', '#F59E0B'][
          Math.floor(Math.random() * 5)
        ];
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        this.size = Math.random() * 8 + 4;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // Gravity
        this.rotation += this.rotationSpeed;
        
        // Slight air resistance
        this.vx *= 0.99;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        
        if (this.shape === 'rect') {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
      
      isOffScreen() {
        return this.y > canvas.height + 50;
      }
    }
    
    // Create initial particles
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new ConfettiParticle());
    }
    
    let startTime = Date.now();
    const duration = 2500;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed > duration) {
        onComplete();
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw(ctx);
        
        if (particle.isOffScreen()) {
          particles.splice(i, 1);
        }
      }
      
      // Add new particles during first half of animation
      if (elapsed < duration / 2 && particles.length < 120) {
        particles.push(new ConfettiParticle());
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onComplete]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
};
```

This comprehensive component interaction guide provides developers with the exact implementation details needed to recreate every interaction in the Hatchin application. Each component section includes the TypeScript interfaces, event handlers, visual states, and animation sequences required for pixel-perfect implementation.