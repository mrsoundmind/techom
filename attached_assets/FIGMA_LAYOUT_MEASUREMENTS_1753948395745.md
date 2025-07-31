# 📐 Figma Layout Measurements & Grid System

## 🎯 **DESKTOP LAYOUT (1440px × 900px)**

### **Master Frame Structure**
```
┌─────────────────────────────────────────────────────────────────┐
│                          1440px                                │
├──────────┬─────────────────────────────────────┬───────────────┤
│   260px  │                1000px               │     280px     │ 900px
│          │                                     │               │
│ Sidebar  │           Main Content             │  Brain Panel  │
│ #23262B  │            #23262B                 │   #23262B     │
│          │         (rounded 16px)             │ (rounded 16px)│
│          │                                     │               │
├──────────┴─────────────────────────────────────┴───────────────┤
└─────────────────────────────────────────────────────────────────┘
```

### **Spacing & Margins**
- **Outer margin**: 10px on all sides
- **Panel gap**: 12px between main content and brain panel
- **Inner padding**: 20px within each panel
- **Component spacing**: 16px between major sections

---

## 📱 **MOBILE LAYOUT (375px × 812px)**

### **Mobile Frame Structure**
```
┌─────────────────────────────────┐
│            375px               │
├─────────────────────────────────┤ 60px (header)
│        Mobile Header           │
│        #23262B                 │
├─────────────────────────────────┤
│                                │ 752px (content)
│      Main Content              │
│      #23262B                   │
│   (no border radius)           │
│                                │
│                                │
└─────────────────────────────────┘
```

### **Mobile Sidebar Overlay**
```
┌─────┬───────────────────────────┐
│280px│         95px             │
│     │    (backdrop)            │
│Side │    rgba(0,0,0,0.5)       │
│bar  │                          │
│Over │    Tap to close          │
│lay  │                          │
│     │                          │
└─────┴───────────────────────────┘
```

---

## 🎨 **COMPONENT MEASUREMENTS**

### **1. Project Sidebar (Left Panel)**

**Overall Container**:
- Width: 260px
- Height: 100vh
- Background: #23262B
- Border-right: 1px solid #43444B

**Header Section**:
- Height: 64px
- Padding: 16px 20px
- Border-bottom: 1px solid #43444B

**Logo/Title**:
- Font: 18px medium
- Color: #F1F1F3
- Position: Left-aligned

**Collapse Button**:
- Size: 32px × 32px
- Position: Top-right, 16px from edges
- Background: Transparent hover #43444B
- Icon: 16px

**Projects List Container**:
- Padding: 16px 0
- Scroll: Auto overflow

**Project Card**:
- Height: 72px
- Margin: 0 12px 8px 12px
- Padding: 12px 16px
- Border-radius: 8px
- Background: Transparent hover #43444B
- Selected state: #6C82FF/10 bg + 3px left border #6C82FF

**Project Card Content**:
- Project dot: 12px circle, 4px from left
- Title: 14px medium #F1F1F3, 20px from left
- Description: 12px normal #A6A7AB, 4px top margin
- Agent count: 12px normal #A6A7AB, right-aligned

**Team/Agent Items** (nested):
- Height: 44px
- Left indent: 32px from container edge
- Padding: 8px 16px 8px 0

**Avatar**:
- Size: 24px circle
- Background: Accent color (varies)
- Text: 12px medium #FFFFFF (initials)

**Add Project Button**:
- Height: 40px
- Margin: 16px 12px 20px 12px
- Background: #6C82FF
- Border-radius: 8px
- Text: 14px medium #FFFFFF
- Icon: 16px plus sign

### **2. Main Content Panel (Center)**

**Container**:
- Width: Flex-grow (≈880px on 1440px screen)
- Height: calc(100vh - 20px)
- Background: #23262B
- Border-radius: 16px
- Margin: 10px (desktop), 0 (mobile)

**Chat Mode Header**:
- Height: 80px
- Padding: 20px 24px
- Border-bottom: 1px solid #43444B

**Mode Selector Tabs**:
- Tab height: 36px
- Tab padding: 12px 20px
- Gap: 8px between tabs
- Active: #6C82FF background
- Inactive: #43444B background
- Border-radius: 6px

**Chat Messages Area**:
- Padding: 24px
- Max-width: 100% (constrained by container)
- Scroll: Auto overflow

**Message Spacing**:
- Between messages: 16px
- Between message groups: 24px
- From edges: 0px (full width)

**Message Bubble - User**:
- Max-width: 70%
- Padding: 12px 16px
- Background: #6C82FF
- Border-radius: 16px 16px 4px 16px
- Position: Right-aligned
- Text: 14px normal #FFFFFF

**Message Bubble - AI**:
- Max-width: 70%
- Padding: 12px 16px
- Background: #43444B
- Border-radius: 16px 16px 16px 4px
- Position: Left-aligned
- Text: 14px normal #F1F1F3

**Chat Input Area**:
- Height: 80px
- Padding: 20px 24px
- Border-top: 1px solid #43444B
- Background: #23262B

**Input Field**:
- Height: 40px
- Padding: 8px 16px
- Background: #37383B
- Border: 1px solid #43444B
- Border-radius: 20px
- Font: 14px normal #F1F1F3

**Send Button**:
- Size: 40px circle
- Background: #6C82FF
- Position: 12px from right edge
- Icon: 18px arrow/send

### **3. Brain Panel (Right)**

**Container**:
- Width: 280px
- Height: 100vh
- Background: #23262B
- Border-left: 1px solid #43444B
- Border-radius: 16px

**Header**:
- Height: 64px
- Padding: 20px
- Border-bottom: 1px solid #43444B

**Title**:
- Font: 16px medium #F1F1F3
- Position: Left-aligned

**Collapse Button**:
- Size: 24px × 24px
- Position: Right-aligned
- Icon: 16px

**Content Sections**:
- Padding: 20px
- Section spacing: 24px

**Progress Ring**:
- Size: 84px diameter
- Stroke width: 6px
- Center position: Horizontally centered
- Text: 20px medium #F1F1F3

**Document Cards**:
- Height: Auto (min 60px)
- Padding: 16px
- Background: #37383B
- Border-radius: 8px
- Margin: 8px 0

**Timeline Container**:
- Padding: 0 8px

**Timeline Item**:
- Height: 52px
- Padding: 12px 0

**Timeline Indicator**:
- Size: 10px circle
- Position: 0px from left
- Colors: #47DB9A (complete), #6C82FF (active), #43444B (pending)

**Timeline Content**:
- Left margin: 24px
- Title: 14px medium #F1F1F3
- Date: 12px normal #A6A7AB, 4px top margin

---

## 📊 **SPACING GRID SYSTEM**

### **Base Grid**: 8px
- All measurements are multiples of 8px
- Text baseline: 4px subgrid for typography
- Component spacing: 8px, 16px, 24px, 32px

### **Component Padding Standards**:
- **Small components** (buttons, inputs): 8px-12px
- **Medium components** (cards, list items): 16px
- **Large components** (panels, modals): 20px-24px
- **Container padding**: 24px-32px

### **Margin Standards**:
- **Between related items**: 8px
- **Between component groups**: 16px
- **Between major sections**: 24px
- **Between panels**: 32px

---

## 🎯 **RESPONSIVE BREAKPOINTS**

### **Desktop Large** (1440px+):
- Full 3-panel layout
- Sidebar: 260px fixed
- Brain: 280px fixed
- Content: Remaining space

### **Desktop** (1024px - 1440px):
- Collapsible panels
- Sidebar: 260px → 56px (collapsed)
- Brain: 280px → 40px (collapsed)
- Content: Expands to fill

### **Tablet** (768px - 1024px):
- Brain panel becomes overlay
- Sidebar remains inline but narrower
- Content takes priority

### **Mobile** (375px - 768px):
- Single panel view
- Sidebar becomes slide-out overlay
- Brain becomes modal overlay
- Mobile header: 60px fixed

---

## 🎨 **FIGMA GRID SETUP**

### **Layout Grid**:
- Type: Columns
- Count: 12
- Gutter: 24px
- Margin: 20px
- Color: #6C82FF at 10% opacity

### **Baseline Grid**:
- Size: 8px
- Color: #43444B at 5% opacity
- Subdivision: 4px for typography alignment

### **Measurement Guidelines**:
- Use consistent 8px spacing units
- Align all elements to baseline grid
- Maintain aspect ratios for interactive elements
- Use auto-layout for dynamic content areas

This measurement guide ensures pixel-perfect recreation of your Hatchin interface in Figma with proper responsive behavior and consistent spacing throughout.