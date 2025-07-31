// Template system for starter packs and agent creation

export interface TemplateData {
  id: string;
  title: string;
  description: string;
  category: string;
  color: 'blue' | 'green' | 'purple' | 'amber';
  icon: string;
  members: string[];
  tags: string[];
}

export interface HatchTemplate {
  name: string;
  role: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'amber';
  expertise?: string[];
}

// Starter pack templates for project creation
export const teamTemplates: TemplateData[] = [
  {
    id: "saas-startup",
    title: "SaaS Startup",
    description: "Build and launch your software-as-a-service product with expert guidance",
    category: "business",
    color: "blue",
    icon: "🚀",
    members: ["Maya", "Alex", "Jordan", "Casey"],
    tags: ["product", "tech", "growth"]
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    description: "Full-service creative agency managing client projects and campaigns",
    category: "creative",
    color: "purple",
    icon: "🎨",
    members: ["Riley", "Sam", "Charlie", "Taylor"],
    tags: ["design", "creative", "branding"]
  },
  {
    id: "influencer-brand",
    title: "Influencer Brand",
    description: "Personal brand and content creation business with audience growth",
    category: "creative",
    color: "green",
    icon: "📱",
    members: ["Morgan", "Avery", "Blake", "River"],
    tags: ["content", "social", "brand"]
  },
  {
    id: "consulting-firm",
    title: "Consulting Firm",
    description: "Strategic consulting and advisory services for business transformation",
    category: "business",
    color: "amber",
    icon: "💼",
    members: ["Cameron", "Drew", "Quinn", "Sage"],
    tags: ["strategy", "advisory", "business"]
  },
  {
    id: "tech-incubator",
    title: "Tech Incubator",
    description: "Supporting early-stage startups and MVP development programs",
    category: "tech",
    color: "blue",
    icon: "⚡",
    members: ["Finley", "Rowan", "Skyler", "Phoenix"],
    tags: ["startup", "mvp", "acceleration"]
  }
];

// Individual agent/hatch templates for team member creation
export const allHatchTemplates: HatchTemplate[] = [
  // SaaS Startup Team
  {
    name: "Maya",
    role: "Product Manager",
    description: "Expert in product strategy, roadmapping, and turning ideas into actionable plans. Specializes in user research and market validation.",
    color: "blue",
    expertise: ["Product Strategy", "User Research", "Roadmapping", "Market Analysis"]
  },
  {
    name: "Alex",
    role: "Lead Developer",
    description: "Full-stack developer with expertise in modern web technologies, architecture design, and technical leadership.",
    color: "blue",
    expertise: ["Full-Stack Development", "System Architecture", "Team Leadership", "DevOps"]
  },
  {
    name: "Jordan",
    role: "UX Designer",
    description: "User experience designer focused on creating intuitive, user-centered digital products and interfaces.",
    color: "blue",
    expertise: ["User Experience", "Interface Design", "Prototyping", "User Testing"]
  },
  {
    name: "Casey",
    role: "Marketing Specialist",
    description: "Digital marketing expert specializing in growth strategies, customer acquisition, and brand development.",
    color: "blue",
    expertise: ["Digital Marketing", "Growth Strategy", "Content Marketing", "Analytics"]
  },
  
  // Creative Studio Team
  {
    name: "Riley",
    role: "Creative Director",
    description: "Visionary creative leader with expertise in brand strategy, campaign development, and creative team management.",
    color: "purple",
    expertise: ["Creative Strategy", "Brand Development", "Campaign Management", "Team Leadership"]
  },
  {
    name: "Sam",
    role: "Graphic Designer",
    description: "Visual designer specializing in branding, print design, and digital graphics with a keen eye for aesthetics.",
    color: "purple",
    expertise: ["Graphic Design", "Branding", "Print Design", "Visual Identity"]
  },
  {
    name: "Charlie",
    role: "Video Producer",
    description: "Video production specialist handling everything from concept to final cut, including motion graphics and editing.",
    color: "purple",
    expertise: ["Video Production", "Motion Graphics", "Editing", "Storytelling"]
  },
  {
    name: "Taylor",
    role: "Content Writer",
    description: "Content strategist and writer creating compelling copy for various mediums and brand communications.",
    color: "purple",
    expertise: ["Content Strategy", "Copywriting", "Brand Voice", "SEO Writing"]
  },
  
  // Influencer Brand Team
  {
    name: "Morgan",
    role: "Content Creator",
    description: "Multi-platform content creator with expertise in video production, photography, and audience engagement.",
    color: "green",
    expertise: ["Content Creation", "Video Production", "Photography", "Social Media"]
  },
  {
    name: "Avery",
    role: "Community Manager",
    description: "Community building expert focused on audience growth, engagement strategies, and brand loyalty.",
    color: "green",
    expertise: ["Community Management", "Engagement Strategy", "Brand Loyalty", "Customer Relations"]
  },
  {
    name: "Blake",
    role: "Brand Strategist",
    description: "Personal brand expert helping develop authentic brand identity and strategic positioning in the market.",
    color: "green",
    expertise: ["Brand Strategy", "Personal Branding", "Market Positioning", "Authenticity"]
  },
  {
    name: "River",
    role: "Analytics Specialist",
    description: "Data-driven analyst tracking performance metrics, audience insights, and growth optimization strategies.",
    color: "green",
    expertise: ["Analytics", "Performance Tracking", "Data Analysis", "Growth Optimization"]
  },
  
  // Consulting Firm Team
  {
    name: "Cameron",
    role: "Strategy Consultant",
    description: "Senior strategy consultant with expertise in business transformation, operational excellence, and strategic planning.",
    color: "amber",
    expertise: ["Strategic Planning", "Business Transformation", "Operational Excellence", "Change Management"]
  },
  {
    name: "Drew",
    role: "Business Analyst",
    description: "Business analysis expert specializing in process optimization, requirements gathering, and solution design.",
    color: "amber",
    expertise: ["Business Analysis", "Process Optimization", "Requirements Gathering", "Solution Design"]
  },
  {
    name: "Quinn",
    role: "Project Manager",
    description: "Experienced project manager ensuring successful delivery of consulting engagements and client satisfaction.",
    color: "amber",
    expertise: ["Project Management", "Client Relations", "Delivery Excellence", "Team Coordination"]
  },
  {
    name: "Sage",
    role: "Research Analyst",
    description: "Market research specialist providing data-driven insights, competitive analysis, and industry trends.",
    color: "amber",
    expertise: ["Market Research", "Competitive Analysis", "Industry Trends", "Data Analysis"]
  },
  
  // Tech Incubator Team
  {
    name: "Finley",
    role: "Startup Mentor",
    description: "Experienced entrepreneur and mentor guiding early-stage startups through ideation to market launch.",
    color: "blue",
    expertise: ["Startup Mentoring", "Entrepreneurship", "Business Development", "Market Entry"]
  },
  {
    name: "Rowan",
    role: "Technical Advisor",
    description: "Technical expert helping startups with architecture decisions, technology stack, and development best practices.",
    color: "blue",
    expertise: ["Technical Architecture", "Technology Stack", "Development Best Practices", "Code Review"]
  },
  {
    name: "Skyler",
    role: "Investment Analyst",
    description: "Investment specialist evaluating startup potential, funding strategies, and financial planning for growth.",
    color: "blue",
    expertise: ["Investment Analysis", "Funding Strategy", "Financial Planning", "Valuation"]
  },
  {
    name: "Phoenix",
    role: "Growth Hacker",
    description: "Growth specialist focused on rapid user acquisition, retention strategies, and scaling methodologies.",
    color: "blue",
    expertise: ["Growth Hacking", "User Acquisition", "Retention Strategy", "Scaling"]
  }
];

// Helper function to get template by ID
export const getTemplateById = (id: string): TemplateData | undefined => {
  return teamTemplates.find(template => template.id === id);
};

// Helper function to get hatch template by name
export const getHatchTemplateByName = (name: string): HatchTemplate | undefined => {
  return allHatchTemplates.find(hatch => hatch.name === name);
};

// Helper function to get templates by category
export const getTemplatesByCategory = (category: string): TemplateData[] => {
  if (category === 'all') return teamTemplates;
  return teamTemplates.filter(template => template.category === category);
};

// Available categories for filtering
export const templateCategories = ['all', 'business', 'creative', 'tech'];