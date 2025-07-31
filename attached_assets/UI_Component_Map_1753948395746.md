# 🧩 UI Component Map - Hatchin Frontend

**Project**: Hatchin - No-Code AI Creation Workspace  
**Document**: Complete UI Component Catalog and Behavior Map  
**Version**: 1.0  
**Last Updated**: January 29, 2025

---

## 📖 Overview

This document serves as a comprehensive catalog of all reusable UI components in the Hatchin frontend. Each component is documented with its props, behavior, backend integration, and usage patterns to help developers understand, reuse, and extend the existing component library.

**Component Organization**: Components are grouped by functionality and UI purpose, focusing on the core Hatchin features: Projects, Teams, and Hatches.

---

# 🎛️ **NAVIGATION COMPONENTS**

## **ProjectSidebar**

**Location**: `/components/ProjectSidebar.tsx`  
**Panel**: Left Sidebar (Main Navigation)

**UI Role & Purpose**: Primary navigation component displaying hierarchical project structure with teams and hatches. Enables project switching, team management, and hatch organization.

**Visual Description**: Collapsible sidebar with nested project/team/hatch tree structure, action buttons, and context menus. Features drag-and-drop support and inline editing capabilities.

**Props**:
```typescript
interface ProjectSidebarProps {
  setSidebarOpen: (open: boolean) => void;
  projects: Project[];
  teams: Team[];
  agents: Agent[];
  onCreateProject: (project: Project) => void;
  onCreateIdeaProject: () => string | null;
  onCreateProjectFromStarterPack: (templateData: TemplateData) => string | null;
  activeProjectId?: string;
  onSelectProject: (projectId: string) => void;
  activeAgentId: string | null;
  onSelectAgent: (agentId: string, projectId: string) => void;
  onSelectTeam: (teamId: string, projectId: string) => void;
  onAddAgent: (agent: Agent) => void;
  onAddTeam: (team: Team, agents: Agent[] | Agent) => void;
  onDeleteProject: () => void;
  onDeleteTeam: () => void;
  onDeleteAgent: () => void;
  onRenameTeam: () => void;
  onRenameAgent: () => void;
  onShowTeamDashboard: () => void;
  onMoveAgent: () => void;
  activeTeamId: string | null;
  showAnimation: () => void;
}
```

**Backend API Interaction**: None directly (uses props data from parent state)  
**State Triggers**: onClick selection updates active project/team/hatch state

**State & Side Effects**:
- Manages local collapsed/expanded state for project trees
- Triggers animations via `showAnimation` prop
- Updates global app state through callback props

**Related Components**: SlimSidebar, NewProjectDialog, NewAgentDialog, TeamHatchDialog

**UI States**:
- **Empty State**: Shows "Add your first project" with gentle glow animation
- **Active Selection**: Highlights selected project/team/hatch with accent colors
- **Hover States**: Shows action buttons and context options
- **Drag State**: Visual feedback during drag-and-drop operations

**Behavior Rules**:
- **Responsive**: Converts to mobile overlay on small screens
- **Keyboard Navigation**: Arrow keys for tree navigation
- **Animation**: Smooth expand/collapse with Framer Motion
- **Context Menu**: Right-click for rename/delete/move options

**Sample JSX**:
```jsx
<ProjectSidebar 
  setSidebarOpen={setSidebarOpen}
  projects={projects}
  teams={teams}
  agents={agents}
  activeProjectId={activeProjectId}
  onSelectProject={handleSelectProject}
  onCreateProject={handleCreateProject}
  showAnimation={showEggHatching}
/>
```

---

## **SlimSidebar**

**Location**: `/components/SlimSidebar.tsx`  
**Panel**: Left Sidebar (Collapsed State)

**UI Role & Purpose**: Minimal sidebar shown when main sidebar is collapsed. Provides quick access to expand sidebar and essential navigation.

**Visual Description**: Narrow vertical bar with expand button and minimal branding/icons.

**Props**:
```typescript
interface SlimSidebarProps {
  setSidebarOpen: (open: boolean) => void;
}
```

**Backend API Interaction**: None  
**State Triggers**: onClick to expand main sidebar

**State & Side Effects**: Controls sidebar visibility state only

**Related Components**: ProjectSidebar (counterpart)

**UI States**:
- **Default**: Minimalist design with hover effects
- **Hover**: Subtle highlight and tooltip showing expand action

**Behavior Rules**:
- **Animation**: Smooth transition when toggling sidebar
- **Responsive**: Hidden on mobile (uses overlay instead)
- **Keyboard**: Ctrl+B shortcut to toggle

**Sample JSX**:
```jsx
<SlimSidebar setSidebarOpen={setSidebarOpen} />
```

---

## **DynamicSidebar**

**Location**: `/components/DynamicSidebar.tsx`  
**Panel**: Right Sidebar (Context-Aware)

**UI Role & Purpose**: Adaptive right panel that displays different content based on current selection (Project Brain, Team Dashboard, Hatch Profile).

**Visual Description**: Right-aligned panel with dynamic content that changes based on active selection. Features collapsible sections and context-aware actions.

**Props**:
```typescript
interface DynamicSidebarProps {
  brainOpen: boolean;
  setBrainOpen: (open: boolean) => void;
  activeProject: Project | null;
  activeTeam: Team | null;
  activeAgent: Agent | null;
  projectAgents: Agent[];
  projectBrainData: Record<string, ProjectBrainData>;
  onUpdateBrainData: (projectId: string, data: ProjectBrainData) => void;
  onSelectAgent: (agentId: string | null) => void;
  onCompleteMilestone: (projectId: string, milestoneIndex: number) => void;
}
```

**Backend API Interaction**:
- **Project Brain**: Updates project documentation and timeline via `onUpdateBrainData`
- **Milestone Completion**: Triggers confetti animation and updates progress

**State & Side Effects**:
- Dynamically renders ProjectBrain, TeamDashboard, or HatchProfile based on active selection
- Manages collapsible section states
- Triggers milestone completion celebrations

**Related Components**: ProjectBrain, TeamDashboard, HatchProfile, SlimBrain

**UI States**:
- **Project Selected**: Shows ProjectBrain with documents, progress, timeline
- **Team Selected**: Displays TeamDashboard with metrics and member performance
- **Hatch Selected**: Renders HatchProfile with personality and task details
- **Nothing Selected**: Shows default project overview or getting started content

**Behavior Rules**:
- **Context Switching**: Smoothly transitions between different content types
- **Mobile Responsive**: Becomes full-screen overlay on mobile devices
- **Animation**: Uses Framer Motion for content transitions

**Sample JSX**:
```jsx
<DynamicSidebar
  brainOpen={brainOpen}
  setBrainOpen={setBrainOpen}
  activeProject={activeProject}
  activeTeam={activeTeam}
  activeAgent={activeAgent}
  onUpdateBrainData={handleUpdateBrainData}
  onCompleteMilestone={handleCompleteMilestone}
/>
```

---

## **SlimBrain**

**Location**: `/components/SlimBrain.tsx`  
**Panel**: Right Sidebar (Collapsed State)

**UI Role & Purpose**: Collapsed state of the right sidebar, shows minimal brain icon with expand functionality.

**Props**:
```typescript
interface SlimBrainProps {
  setBrainOpen: (open: boolean) => void;
}
```

**Sample JSX**:
```jsx
<SlimBrain setBrainOpen={setBrainOpen} />
```

---

# 💬 **CHAT COMPONENTS**

## **EnhancedMultiAgentChat**

**Location**: `/components/EnhancedMultiAgentChat.tsx`  
**Panel**: Middle Panel (Main Chat Interface)

**UI Role & Purpose**: Primary chat interface supporting multiple conversation modes (Project, Team, Hatch). Handles dynamic headers, agent interactions, and welcome messages.

**Visual Description**: Full-height chat interface with dynamic header, message area, and input field. Features typing indicators, message bubbles, and context-aware suggestions.

**Props**:
```typescript
interface EnhancedMultiAgentChatProps {
  activeProject: Project | null;
  projectAgents: Agent[];
  projectTeams: Team[];
  onAddAgent: (agent: Agent) => void;
  onAddTeam: (team: Team, agents: Agent[] | Agent) => void;
  activeAgentId: string | null;
  activeTeamId: string | null;
  onSelectAgent: (agentId: string | null) => void;
  activeAgent: Agent | null;
  teamJustAdded: boolean;
  onTeamMessageShown: () => void;
  showAnimation: () => void;
  mayaWelcomeMessage: string | null;
  onMayaWelcomeShown: () => void;
}
```

**Backend API Interaction**:
- **Message Sending**: POST to `/api/messages` when user sends messages
- **AI Responses**: Calls OpenAI API for hatch personality responses
- **Conversation History**: GET/POST to maintain chat persistence

**State & Side Effects**:
- Manages conversation history and typing states
- Handles welcome message display and dismissal
- Coordinates with animation system for celebrations
- Updates conversation context based on active selection

**Related Components**: ChatInput, ChatMessage, AgentSelector, TeamIntroduction

**UI States**:
- **Empty Project**: Shows getting started content with action buttons
- **Active Hatch Chat**: Individual conversation with selected hatch
- **Team Chat**: Multi-agent conversation with team members
- **Project Chat**: High-level project coordination interface
- **Welcome States**: Special welcome messages for Maya and new teams

**Behavior Rules**:
- **Dynamic Headers**: Changes header content based on chat context (Hatch name, Team name, Project name)
- **Message Persistence**: All conversations saved and restored across sessions
- **Context Awareness**: Each message includes relevant project/team/hatch context
- **Animation Integration**: Triggers egg hatching and confetti for special events

**Sample JSX**:
```jsx
<EnhancedMultiAgentChat
  activeProject={activeProject}
  projectAgents={projectAgents}
  activeAgentId={activeAgentId}
  activeTeamId={activeTeamId}
  onSelectAgent={handleSelectAgent}
  mayaWelcomeMessage={mayaWelcomeMessage}
  onMayaWelcomeShown={handleMayaWelcomeShown}
  showAnimation={showEggHatching}
/>
```

---

## **ChatInput**

**Location**: `/components/ChatInput.tsx` (inferred from usage patterns)  
**Panel**: Bottom of Chat Interface

**UI Role & Purpose**: Text input component for sending messages in chat interface. Features auto-resize, keyboard shortcuts, and attachment support.

**Visual Description**: Expandable textarea with send button, attachment icon, and character count. Includes placeholder text and smooth animations.

**Behavior Rules**:
- **Auto-resize**: Textarea expands as user types longer messages
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Character Limit**: Visual feedback for long messages
- **Attachment Support**: File upload button for document sharing

---

## **ChatMessage**

**Location**: `/components/ChatMessage.tsx` (inferred)  
**Panel**: Chat Message Area

**UI Role & Purpose**: Individual message bubble component displaying user or AI messages with proper styling and metadata.

**Visual Description**: Styled message bubbles with sender identification, timestamp, and message content. Different styling for user vs AI messages.

**Behavior Rules**:
- **Message Types**: Supports text, system messages, and rich content
- **Timestamps**: Shows relative time (e.g., "2 minutes ago")
- **Sender Identification**: Avatar and name for multi-agent conversations
- **Actions**: Message reactions, copy, and reference functionality

---

# 🃏 **CARD COMPONENTS**

## **HatchCard**

**Location**: `/components/HatchCard.tsx` (inferred from patterns)  
**Panel**: Various (Sidebar, Right Panel, Modals)

**UI Role & Purpose**: Compact card displaying hatch information including name, role, personality traits, and current status.

**Visual Description**: Small card with hatch avatar, name, role, and colored accent based on hatch color scheme. Shows active/inactive status.

**Props** (inferred):
```typescript
interface HatchCardProps {
  hatch: Agent;
  isActive?: boolean;
  onClick?: () => void;
  showActions?: boolean;
  compact?: boolean;
}
```

**UI States**:
- **Active**: Highlighted with accent color when selected
- **Inactive**: Muted appearance when not selected
- **Hover**: Shows action buttons and additional information
- **Compact**: Minimal version for tight spaces

**Behavior Rules**:
- **Color Coding**: Background accent matches hatch personality color
- **Click Action**: Selects hatch and opens individual chat
- **Context Menu**: Right-click for rename, delete, move options
- **Drag Support**: Can be dragged between teams (planned feature)

---

## **TeamSummaryCard**

**Location**: `/components/TeamSummaryCard.tsx`  
**Panel**: Right Sidebar (Team Dashboard)

**UI Role & Purpose**: Overview card showing team metrics, performance, and member summary.

**Visual Description**: Larger card with team name, member count, performance metrics, activity timeline, and quick action buttons.

**Props**:
```typescript
interface TeamSummaryCardProps {
  team: Team;
  metrics: TeamMetrics;
  members: Agent[];
  onViewDetails: () => void;
  onManageTeam: () => void;
}
```

**Backend API Interaction**:
- **Team Metrics**: GET `/api/teams/{id}/metrics` for performance data
- **Activity Data**: GET `/api/teams/{id}/activity` for timeline information

**UI States**:
- **Loading**: Skeleton loading while fetching metrics
- **Active**: Full metrics display with charts and member list
- **Error**: Error state if metrics fail to load

---

# 📋 **PANEL COMPONENTS**

## **ProjectBrain**

**Location**: `/components/ProjectBrain.tsx`  
**Panel**: Right Sidebar (Project Context)

**UI Role & Purpose**: Displays project documentation, progress tracking, timeline, and milestone management. Acts as project knowledge base and progress dashboard.

**Visual Description**: Structured panel with collapsible sections for documents, progress bar, timeline milestones, and action buttons.

**Props**:
```typescript
interface ProjectBrainProps {
  project: Project;
  brainData: ProjectBrainData;
  onUpdateBrainData: (data: ProjectBrainData) => void;
  onCompleteMilestone: (milestoneIndex: number) => void;
}
```

**Backend API Interaction**:
- **Document Management**: GET/POST `/api/projects/{id}/documents`
- **Progress Updates**: PUT `/api/projects/{id}/progress`
- **Timeline Management**: GET/POST `/api/projects/{id}/timeline`

**State & Side Effects**:
- Manages document editing and creation
- Tracks milestone completion and progress updates
- Syncs with project-wide state for timeline coordination

**Related Components**: DocumentSummary, ProgressBar, TimelineItem

**UI States**:
- **Document View**: List of project documents with preview and edit capabilities
- **Progress Tracking**: Visual progress bar and completion percentage
- **Timeline View**: Chronological milestone list with status indicators
- **Edit Mode**: Inline editing for documents and milestone details

**Behavior Rules**:
- **Real-time Updates**: Changes sync immediately to project state
- **Milestone Celebration**: Triggers confetti animation when milestones completed
- **Document Management**: Create, edit, and organize project documentation
- **Progress Visualization**: Charts and graphs for project progress tracking

---

## **TeamDashboard**

**Location**: `/components/TeamDashboard.tsx`  
**Panel**: Middle Panel (Replaces Chat) or Right Sidebar

**UI Role & Purpose**: Comprehensive team analytics and management interface showing performance metrics, member details, activity timelines, and team coordination tools.

**Visual Description**: Dashboard layout with metric cards, charts, member performance tables, and activity graphs. Features tabs for different metric views.

**Props**:
```typescript
interface TeamDashboardProps {
  team: Team;
  teamMetrics: TeamMetrics;
  agents: Agent[];
  onRenameTeam: () => void;
  onRenameAgent: () => void;
  onClose: () => void;
}
```

**Backend API Interaction**:
- **Team Analytics**: GET `/api/teams/{id}/analytics` for comprehensive metrics
- **Member Performance**: GET `/api/teams/{id}/members/performance`
- **Activity Timeline**: GET `/api/teams/{id}/activity/timeline`

**State & Side Effects**:
- Fetches and displays real-time team performance data
- Manages metric visualization and filtering
- Coordinates team member management actions

**Related Components**: MetricCard, PerformanceChart, ActivityTimeline, MemberList

**UI States**:
- **Overview**: High-level team metrics and performance summary
- **Members**: Detailed member performance and task assignments
- **Activity**: Timeline view of team activity and milestones
- **Settings**: Team configuration and member management

**Behavior Rules**:
- **Real-time Metrics**: Auto-refreshes performance data
- **Interactive Charts**: Clickable charts for detailed drill-down
- **Member Management**: Inline editing and task assignment
- **Export Capability**: Export reports and analytics data

---

# 🔄 **MODAL & DIALOG COMPONENTS**

## **OnboardingModal**

**Location**: `/components/OnboardingModal.tsx`  
**Panel**: Full-screen Overlay

**UI Role & Purpose**: First-time user onboarding flow with multiple paths: "Start with Idea" (Maya), "Use Starter Pack" (templates), or "Start from Scratch".

**Visual Description**: Full-screen modal with step-by-step onboarding flow, illustrations, and clear action buttons. Features progress indicators and smooth transitions.

**Props**:
```typescript
interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (path: 'idea' | 'template' | 'scratch', templateName?: string, templateData?: TemplateData) => void;
  activeProject: Project | null;
  existingAgents: Agent[];
  onAddAgent: (agent: Agent) => void;
  onAddTeam: (team: Team, agents: Agent[] | Agent) => void;
  showAnimation: () => void;
}
```

**Backend API Interaction**:
- **Onboarding Tracking**: POST `/api/users/onboarding/complete`
- **Template Loading**: GET `/api/templates` for starter pack options

**State & Side Effects**:
- Manages multi-step onboarding flow state
- Creates initial projects based on user selection
- Sets localStorage flag for completed onboarding
- Triggers animations for project creation

**Related Components**: StarterPacksModal, TeamTemplateScreen

**UI States**:
- **Welcome Screen**: Introduction and path selection
- **Idea Path**: Maya introduction and idea development
- **Template Path**: Starter pack selection and customization
- **Completion**: Success state with next steps

**Behavior Rules**:
- **Step Navigation**: Forward/back navigation with progress tracking
- **Path Branching**: Different flows based on user selection
- **Data Persistence**: Saves progress during multi-step flow
- **Animation Integration**: Egg hatching for project creation

---

## **ReturningUserWelcome**

**Location**: `/components/ReturningUserWelcome.tsx`  
**Panel**: Full-screen Overlay

**UI Role & Purpose**: Welcome screen for returning users offering quick access to last project, new idea development, or starter packs.

**Props**:
```typescript
interface ReturningUserWelcomeProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueLastProject: () => void;
  onStartWithIdea: () => void;
  onUseStarterPack: () => void;
  lastActiveProject: { name: string; description: string } | null;
}
```

**UI States**:
- **Last Project Available**: Shows recent project with continue option
- **No Recent Project**: Focus on new project creation options
- **Quick Actions**: Fast access to common user workflows

---

## **NewProjectDialog**

**Location**: `/components/NewProjectDialog.tsx`  
**Panel**: Modal Dialog

**UI Role & Purpose**: Project creation form with name, description, color selection, and initial setup options.

**Props**:
```typescript
interface NewProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}
```

**Backend API Interaction**:
- **Project Creation**: POST `/api/projects` with project data
- **Validation**: Client-side validation for required fields

---

## **NewAgentDialog**

**Location**: `/components/NewAgentDialog.tsx`  
**Panel**: Modal Dialog

**UI Role & Purpose**: Hatch creation interface with role selection, personality customization, and team assignment.

**Props**:
```typescript
interface NewAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAgent: (agent: Agent) => void;
  projectId: string;
  availableTeams: Team[];
}
```

**Backend API Interaction**:
- **Hatch Creation**: POST `/api/agents` with hatch configuration
- **Template Loading**: GET `/api/hatch-templates` for personality options

---

# ✨ **ANIMATION & FEEDBACK COMPONENTS**

## **EggHatchingAnimation**

**Location**: `/components/animations/EggHatchingAnimation.tsx`  
**Panel**: Full-screen Overlay

**UI Role & Purpose**: Celebratory animation shown when creating new hatches, teams, or completing onboarding. Provides visual feedback for important actions.

**Visual Description**: Animated egg that cracks and hatches with particle effects and smooth transitions.

**Props**:
```typescript
interface EggHatchingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  onComplete: () => void;
}
```

**State & Side Effects**:
- Plays automatically when mounted
- Calls onComplete when animation finishes
- Blocks user interaction during animation

**Behavior Rules**:
- **Duration**: 2-3 second animation sequence
- **Blocking**: Prevents user actions during animation
- **Audio**: Optional sound effects (if enabled)
- **Responsive**: Scales appropriately on mobile devices

**Sample JSX**:
```jsx
<EggHatchingAnimation 
  size="lg" 
  onComplete={hideEggHatching}
/>
```

---

## **ConfettiAnimation**

**Location**: `/components/animations/ConfettiAnimation.tsx`  
**Panel**: Full-screen Overlay

**UI Role & Purpose**: Celebration animation for milestone completion, project launches, and major achievements.

**Props**:
```typescript
interface ConfettiAnimationProps {
  onComplete: () => void;
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;
}
```

**Behavior Rules**:
- **Non-blocking**: Allows user interaction during animation
- **Particle System**: Physics-based confetti particles
- **Customizable**: Different intensities for different achievements

---

# 🔧 **UTILITY & SYSTEM COMPONENTS**

## **ErrorBoundary**

**Location**: `/components/ErrorBoundary.tsx`  
**Panel**: Wrapper Component

**UI Role & Purpose**: Catches JavaScript errors in component tree and displays fallback UI instead of crashing the app.

**Props**:
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}
```

**State & Side Effects**:
- Catches and logs errors for debugging
- Displays user-friendly error message
- Prevents entire app crashes from component errors

**Behavior Rules**:
- **Error Isolation**: Prevents error propagation to parent components
- **Logging**: Sends error reports for debugging (planned)
- **Recovery**: Provides reset functionality to recover from errors

---

## **EnhancedHatchTeamStack**

**Location**: `/components/EnhancedHatchTeamStack.tsx`  
**Panel**: Various (Displays Hatch Groups)

**UI Role & Purpose**: Visual component for displaying groups of hatches with team organization and visual stacking effects.

**Visual Description**: Stack of hatch avatars with visual depth, showing team membership and individual hatch status.

**Props**:
```typescript
interface EnhancedHatchTeamStackProps {
  hatches: Agent[];
  team?: Team;
  maxVisible?: number;
  onClick?: () => void;
  showTeamLabel?: boolean;
}
```

**UI States**:
- **Team Stack**: Shows multiple hatches grouped by team
- **Individual Stack**: Shows single hatch with context
- **Overflow**: Shows "+N more" indicator for large teams
- **Empty**: Placeholder for teams without hatches

**Behavior Rules**:
- **Visual Stacking**: CSS transforms for depth effect
- **Hover Effects**: Individual hatch highlighting on hover
- **Click Actions**: Team selection or individual hatch selection
- **Responsive**: Adapts stack size for different screen sizes

---

# 📊 **DATA DISPLAY COMPONENTS**

## **ProgressBar**

**Location**: Various components (inferred)  
**Panel**: Project Brain, Team Dashboard

**UI Role & Purpose**: Visual progress indicator for projects, milestones, and tasks.

**Props**:
```typescript
interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  color?: 'blue' | 'green' | 'purple' | 'amber';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

**Behavior Rules**:
- **Animated**: Smooth transitions when value changes
- **Color Coded**: Different colors for different project types
- **Responsive**: Scales appropriately on mobile

---

## **MetricCard**

**Location**: Used in TeamDashboard (inferred)  
**Panel**: Team Dashboard, Project Brain

**UI Role & Purpose**: Displays key performance metrics with visual emphasis and trend indicators.

**Props**:
```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  color?: string;
}
```

**Visual Description**: Card with large metric value, descriptive title, trend arrow, and optional icon.

**Behavior Rules**:
- **Trend Indicators**: Green/red arrows for positive/negative changes
- **Animation**: Count-up animation for numeric values
- **Color Coding**: Different accent colors for different metric types

---

# 🔍 **INPUT & FORM COMPONENTS**

## **SearchBar**

**Location**: `/components/SearchBar.tsx`  
**Panel**: Header or Sidebar

**UI Role & Purpose**: Global search functionality for finding projects, teams, hatches, and conversations.

**Props**:
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  showFilters?: boolean;
  filters?: SearchFilters;
}
```

**Backend API Interaction**:
- **Search API**: GET `/api/search?q={query}&type={type}`
- **Autocomplete**: GET `/api/search/suggestions?q={partial}`

**Behavior Rules**:
- **Real-time Search**: Debounced search as user types
- **Keyboard Navigation**: Arrow keys to navigate results
- **Filter Support**: Type-specific filtering (projects, teams, hatches)
- **Recent Searches**: Shows recent search history

---

# 📱 **RESPONSIVE & MOBILE COMPONENTS**

## **Mobile Navigation Overlay**

**Location**: Integrated in App.tsx  
**Panel**: Mobile Overlay

**UI Role & Purpose**: Mobile-specific navigation overlay that replaces desktop sidebar on small screens.

**Visual Description**: Full-screen overlay with mobile-optimized navigation, touch-friendly buttons, and swipe gestures.

**Behavior Rules**:
- **Touch Optimized**: Larger touch targets for mobile interaction
- **Swipe Gestures**: Swipe to open/close navigation
- **Backdrop Dismiss**: Tap outside to close overlay
- **Responsive Breakpoints**: Activates below 768px screen width

**UI States**:
- **Closed**: Hidden off-screen with smooth transition
- **Open**: Full overlay with navigation content
- **Transitioning**: Smooth slide animation during open/close

---

# 🏗️ **LAYOUT & STRUCTURE COMPONENTS**

## **Three-Panel Layout Container**

**Location**: App.tsx main structure  
**Panel**: Root Layout

**UI Role & Purpose**: Core application layout managing three-panel structure with responsive behavior and state coordination.

**Visual Description**: Flex-based layout with left sidebar (260px), flexible center panel, and right sidebar (280px). Includes mobile responsiveness and panel toggle functionality.

**State Management**:
- **Sidebar States**: `sidebarOpen`, `brainOpen` for panel visibility
- **Active Selection**: `activeProjectId`, `activeTeamId`, `activeAgentId`
- **Mobile State**: `mobileNavOpen` for mobile navigation

**Responsive Behavior**:
- **Desktop**: Three-panel layout with collapsible sidebars
- **Tablet**: Two-panel layout with toggleable right sidebar
- **Mobile**: Single panel with overlay navigation

**Keyboard Shortcuts**:
- **Ctrl+B**: Toggle left sidebar
- **Ctrl+P**: Toggle right sidebar (brain)
- **Ctrl+Shift+R**: Reset onboarding (development)

---

# 🎨 **STYLING & THEMING**

## **Color System & Variants**

**Project Colors**: `blue`, `green`, `purple`, `amber`  
**Component Variants**: Each component supports project color theming

**Theme Integration**:
- All components use CSS custom properties from `/styles/globals.css`
- Dark mode enforced by default with Tailwind V4
- Consistent color mapping across all components

**Animation System**:
- Framer Motion integration for smooth transitions
- Context-based animation coordination via `AnimationContext`
- Performance-optimized animations with proper cleanup

---

# 🔄 **STATE MANAGEMENT PATTERNS**

## **Data Flow Architecture**

**State Sources**:
- **Local State**: Component-specific state (UI state, form inputs)
- **App State**: Global application state managed in App.tsx
- **Context**: Animation state via AnimationContext
- **Backend State**: API data cached in component state

**Update Patterns**:
- **Prop Drilling**: Simple state passed down via props
- **Callback Propagation**: Child components update parent state via callbacks
- **Context Usage**: Animation coordination via React Context
- **Local Storage**: Persistence for onboarding state and user preferences

**Backend Integration**:
- **Optimistic Updates**: UI updates immediately, backend syncs asynchronously
- **Error Handling**: Graceful fallbacks with ErrorBoundary components
- **Loading States**: Skeleton components during data fetching

---

# 📋 **COMPONENT USAGE SUMMARY**

## **By Panel Location**

**Left Sidebar**:
- ProjectSidebar (main navigation)
- SlimSidebar (collapsed state)
- Mobile navigation overlay

**Center Panel**:
- EnhancedMultiAgentChat (primary interface)
- TeamDashboard (analytics view)
- OnboardingModal (first-time setup)
- ReturningUserWelcome (returning user flow)

**Right Sidebar**:
- DynamicSidebar (context-aware content)
- ProjectBrain (project documentation)
- TeamDashboard (team analytics)
- HatchProfile (individual hatch details)
- SlimBrain (collapsed state)

## **By Functionality**

**Project Management**: ProjectSidebar, NewProjectDialog, ProjectBrain, ProjectOverview  
**Team Coordination**: TeamDashboard, TeamSummaryCard, EnhancedHatchTeamStack  
**Hatch Interaction**: HatchCard, NewAgentDialog, EnhancedMultiAgentChat  
**User Onboarding**: OnboardingModal, ReturningUserWelcome, StarterPacksModal  
**System Feedback**: EggHatchingAnimation, ConfettiAnimation, ErrorBoundary

---

**Last Updated**: January 29, 2025 - Version 1.0  
**Next Review**: Component performance optimization and mobile UX improvements

*This document serves as the definitive catalog of all UI components in Hatchin. All components should follow these patterns and specifications for consistency and maintainability.*