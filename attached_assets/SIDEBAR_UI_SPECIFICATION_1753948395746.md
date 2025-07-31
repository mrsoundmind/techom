# Hatchin Sidebar UI Specification

## Overview
Create a comprehensive sidebar component for the Hatchin AI collaboration app that supports both collapsed and expanded states, with dynamic content management for projects, teams, and AI agents (called "Hatches").

---

## 🎨 **COLOR PALETTE**

### Core Colors (HEX Values)
```
Primary Background: #23262B (Main sidebar background)
Secondary Background: #37383B (Card/panel backgrounds)
Hover Background: #43444B (Interactive element hover states)
Border Color: #43444B (All borders and separators)

Text Colors:
- Primary Text: #F1F1F3 (Main text, headings)
- Secondary Text: #A6A7AB (Muted text, descriptions)

Accent Colors:
- Primary Blue: #6C82FF (Active states, primary actions)
- Success Green: #47DB9A (Success states, completed items)
- Warning Amber: #FF9A47 (Warning states, in-progress items)
- Purple: #9F7BFF (Alternative accent)
- Error Red: #FF4E6A (Error states, destructive actions)
```

---

## 📐 **LAYOUT STRUCTURE**

### Collapsed Sidebar (56px width)
```
┌─────────────────┐
│  [LOGO] 32x32   │ ← App logo with gradient
│                 │
│  [→] Expand     │ ← Expand button with tooltip
│                 │
│  [🔔] w/badge   │ ← Notification bell with count
│                 │
│  ────────       │ ← Project indicators (1px height bars)
│  ────────       │
│  ────────       │
│                 │
│       ⋮         │ ← Spacer
│                 │
│  [⚙] Settings   │ ← Settings button
│  [JS] Avatar    │ ← User avatar (32x32)
└─────────────────┘
```

### Expanded Sidebar (320px width)
```
┌─────────────────────────────────────────────────────────────────┐
│ [LOGO] Hatchin                              [←] Collapse       │ ← Header (64px height)
├─────────────────────────────────────────────────────────────────┤
│ [🔍] Search projects, teams, hatches...                       │ ← Search bar (48px height)
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [+] Add Project                                                 │ ← Add project button
│                                                                 │
│ [▶] Project Name                                          [⋯]   │ ← Expandable project item
│   └─ [👥] Team Alpha                                      [⋯]   │   ← Team with expand/collapse
│       ├─ [🤖] Agent Sarah                                      │   ← Individual agent
│       └─ [🤖] Agent Mike                                       │
│   └─ [🤖] Solo Agent                                           │   ← Unassigned agent
│                                                                 │
│ [▼] Active Project                                        [⋯]   │ ← Expanded project
│   └─ [👥▼] Design Team                                    [⋯]   │   ← Expanded team
│       ├─ [🤖●] Agent Alex    (active)                          │   ← Active agent with indicator
│       └─ [🤖] Agent Emma                                       │
│                                                                 │
│ ⋮                                                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ [JS] John Smith                                           [⋯]   │ ← Profile section
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔤 **TYPOGRAPHY SPECIFICATIONS**

### Font Sizes & Weights
```
Headers (Project Names): 14px, Medium (500)
Team Names: 14px, Medium (500)  
Agent Names: 12px, Regular (400)
Descriptions/Meta: 12px, Regular (400)
Button Text: 14px, Medium (500)
Search Placeholder: 14px, Regular (400)
Tooltips: 12px, Regular (400)
```

### Line Heights
```
All text elements: 1.5 (150% of font size)
Buttons: 1.2 (120% of font size)
```

---

## 📏 **SPACING & DIMENSIONS**

### Component Heights
```
Header: 64px
Search Bar: 48px
Project Item: 36px (collapsed), auto (expanded)
Team Item: 32px (collapsed), auto (expanded)  
Agent Item: 28px
Buttons: 36px (primary), 28px (secondary)
```

### Padding & Margins
```
Sidebar Internal Padding: 16px
Component Horizontal Padding: 12px
Component Vertical Padding: 6px
Between Sections: 24px
Between Items: 4px
Icon-to-text Spacing: 8px
Nested Item Indentation: 24px
```

### Border Radius
```
Sidebar Container: 0px (sharp edges)
Buttons: 6px
Cards/Dropdowns: 8px
User Avatar: 50% (circular)
Icons: 4px (slight rounding)
```

---

## 🎯 **ICON SPECIFICATIONS**

### Icon Library: Lucide React
### Icon Sizes
```
Navigation Icons: 20px x 20px
Expand/Collapse Arrows: 14px x 14px  
Project Icons: 12px x 12px
Team Icons: 12px x 12px
Agent Icons: 8px x 8px
Action Icons (more menu): 14px x 14px
```

### Icon Mapping
```
Projects: FileText icon
Teams: Users icon  
Agents: User icon
Expand Arrow: ChevronRight icon
Collapse Arrow: ChevronLeft icon
Add: Plus icon
Search: Search icon
Settings: Settings icon
More Actions: MoreHorizontal icon
Notifications: Bell icon
```

### Icon Colors
```
Default: #A6A7AB (secondary text)
Hover: #F1F1F3 (primary text)
Active: #6C82FF (primary blue)
Color-coded: Match entity color (blue/green/purple/amber)
```

---

## ⚡ **INTERACTIVE STATES**

### Button States
```
Default: 
  Background: transparent
  Text: #A6A7AB
  Border: none

Hover:
  Background: #43444B
  Text: #F1F1F3
  Border: none
  Transition: all 200ms ease

Active/Selected:
  Background: #43444B
  Text: #F1F1F3
  Left Border: 3px solid #6C82FF

Disabled:
  Background: transparent
  Text: #A6A7AB (50% opacity)
  Cursor: not-allowed
```

### Dropdown Menu States
```
Background: #37383B
Border: 1px solid #43444B
Text: #F1F1F3
Item Hover: #43444B
Item Active: #43444B
Destructive Items: #FF4E6A text
```

---

## 🗂️ **HIERARCHICAL ORGANIZATION**

### Visual Hierarchy
```
Level 1 - Projects:
  - Icon: 16px FileText
  - Text: 14px Medium
  - Expand Arrow: Left-aligned
  - Actions Menu: Right-aligned (on hover)
  - Background: Hover #43444B

Level 2 - Teams (Indented 12px):
  - Icon: 12px Users with color background
  - Text: 14px Medium  
  - Expand Arrow: Left-aligned
  - Actions Menu: Right-aligned (on hover)
  - Background: Hover #43444B

Level 3 - Agents (Indented 24px from project):
  - Icon: 8px User with color background
  - Text: 12px Regular
  - Active Indicator: 6px blue dot (right-aligned)
  - Actions Menu: Right-aligned (on hover)
  - Background: Hover #43444B
```

### Color Coding System
```
Projects: Use assigned color for icon background
Teams: Inherit project color or use own assigned color
Agents: Inherit team color or use own assigned color

Color Backgrounds (20% opacity):
- Blue: rgba(108, 130, 255, 0.2)
- Green: rgba(71, 219, 154, 0.2)  
- Purple: rgba(159, 123, 255, 0.2)
- Amber: rgba(255, 154, 71, 0.2)
```

---

## 🔄 **ANIMATIONS & TRANSITIONS**

### Expand/Collapse Animations
```
Sidebar Width Transition: 
  Duration: 300ms
  Easing: cubic-bezier(0.4, 0.0, 0.2, 1)
  Property: width

Arrow Rotation:
  Duration: 200ms  
  Easing: ease-in-out
  Transform: rotate(90deg) for expanded

Content Fade:
  Duration: 150ms
  Easing: ease-in
  Property: opacity
  Delay: 100ms for expand, 0ms for collapse
```

### Hover Animations
```
Background Color Transition:
  Duration: 200ms
  Easing: ease-in-out
  Property: background-color

Text Color Transition:
  Duration: 200ms
  Easing: ease-in-out  
  Property: color

Scale on Hover (buttons):
  Transform: scale(1.02)
  Duration: 150ms
  Easing: ease-out
```

### Active State Indicators
```
Active Agent Indicator:
  6px circular dot
  Color: #6C82FF
  Position: right-aligned
  Animation: gentle pulse (2s infinite)

Active Project/Team Border:
  3px left border
  Color: #6C82FF
  Transition: width 200ms ease
```

---

## 🎮 **INTERACTIVE ELEMENTS**

### Context Menus (Right-click or ⋯ button)
```
Project Menu:
  - View Overview
  - Rename Project  
  - Archive Project
  - Delete Project (destructive)

Team Menu:
  - View Dashboard
  - Rename Team
  - Add Member
  - Delete Team (destructive)

Agent Menu:
  - View Profile
  - Edit Agent
  - Move to Team
  - Delete Agent (destructive)
```

### Drag & Drop Functionality
```
Draggable Elements:
  - Agents (can be moved between teams)
  - Teams (can be reordered within projects)

Drop Zones:
  - Team containers (for agents)
  - Project containers (for teams)
  - "Unassigned" area (for agents without teams)

Visual Feedback:
  - Drag: 50% opacity on dragged element
  - Drop Zone: 2px dashed border #6C82FF
  - Valid Drop: Green border highlight
  - Invalid Drop: Red border highlight
```

---

## 🔍 **SEARCH FUNCTIONALITY**

### Search Bar
```
Placeholder: "Search projects, teams, hatches..."
Background: #37383B
Border: 1px solid #43444B
Height: 40px
Icon: Search (16px, left side)
Clear Button: X icon (14px, right side, on input)

Search Results:
  - Highlight matching text with #6C82FF background
  - Show hierarchy breadcrumbs
  - Group by type (Projects > Teams > Agents)
  - Empty state: "No results found" with suggestion
```

---

## ♿ **ACCESSIBILITY FEATURES**

### Keyboard Navigation
```
Tab Order:
  1. Sidebar toggle button
  2. Search bar
  3. Add project button
  4. Project items (in order)
  5. Team items (in order)  
  6. Agent items (in order)
  7. User profile menu

Keyboard Shortcuts:
  - Ctrl/Cmd + B: Toggle sidebar
  - Ctrl/Cmd + K: Focus search
  - Enter: Activate focused item
  - Space: Expand/collapse focused item
  - Arrow Keys: Navigate between items
  - Escape: Close dropdowns/modals
```

### Focus States
```
Focus Ring: 2px solid #6C82FF, 2px offset
Focus Background: Same as hover state
Focus Text: High contrast #F1F1F3
```

### Screen Reader Support
```
ARIA Labels:
  - "Expand sidebar" / "Collapse sidebar"
  - "Project [name], [expanded/collapsed]"
  - "Team [name], [expanded/collapsed], [member count] members"
  - "Agent [name], [status]"
  - "More actions for [item name]"

Role Attributes:
  - navigation (sidebar container)
  - tree (project hierarchy)
  - treeitem (individual items)
  - button (interactive elements)
```

---

## 📱 **RESPONSIVE BEHAVIOR**

### Breakpoints
```
Desktop (1024px+): Full expanded sidebar (320px)
Tablet (768px-1023px): Collapsed by default, overlay when expanded
Mobile (<768px): Hidden by default, full-screen overlay when shown
```

### Mobile Adaptations
```
Touch Targets: Minimum 44px height
Swipe Gestures: Swipe right to open, swipe left to close
Overlay: Semi-transparent backdrop (#000 40% opacity)
Close Button: Prominent X in top-right corner
```

---

## 🎁 **SPECIAL FEATURES**

### Empty States
```
No Projects: 
  Icon: Large folder icon (48px)
  Title: "No projects yet"
  Description: "Create your first project to get started"
  Action: "Add Project" button

No Team Members:
  Icon: Users icon (32px)
  Title: "No team members"  
  Description: "Add agents to collaborate"
  Action: "Add Hatch" button
```

### Loading States
```
Skeleton Loading:
  - Project items: Gray rectangles with shimmer
  - Text: Varying width gray bars
  - Icons: Gray circles
  - Animation: Subtle left-to-right shimmer
```

### Notification System
```
Notification Badge:
  - Position: Top-right of notification bell
  - Size: 18px circular
  - Color: #FF4E6A background, white text
  - Text: Count (max "99+")
  - Animation: Gentle scale on update
```

---

## 🔧 **IMPLEMENTATION NOTES**

### Required Libraries
```
- React 18+
- Lucide React (icons)
- Framer Motion (animations)
- React DnD (drag & drop)
- Tailwind CSS (styling)
```

### State Management
```
- Sidebar collapsed/expanded state
- Active project/team/agent selection
- Search query and results
- Loading states for async operations
- Notification counts and states
```

### Performance Optimizations
```
- Virtualization for large lists (100+ items)
- Debounced search (300ms delay)
- Memoized components for static items
- Lazy loading for nested content
```

This specification provides a complete foundation for implementing the Hatchin sidebar with precise visual guidelines, interaction patterns, and accessibility features. The design maintains consistency with the dark theme and emphasizes the collaborative AI nature of the application.