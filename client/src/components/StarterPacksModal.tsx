import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  Users, 
  Sparkles,
  Briefcase,
  ShoppingBag,
  Palette,
  User,
  TrendingUp,
  Settings,
  GraduationCap,
  Lightbulb
} from 'lucide-react';
// Temporary inline template data until import issues are resolved
interface StarterPack {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  members: string[];
  welcomeMessage: string;
}

interface TemplateCategory {
  id: string;
  title: string;
  icon: string;
  packs: StarterPack[];
}

// Simplified template data for testing
const starterPacksByCategory: Record<string, TemplateCategory> = {
  business: {
    id: "business",
    title: "Business + Startups",
    icon: "Briefcase",
    packs: [
      {
        id: "saas-startup",
        title: "SaaS Startup",
        description: "Perfect for launching software products and digital platforms",
        emoji: "🚀",
        color: "blue",
        members: ["Product Manager", "Technical Lead", "Copywriter"],
        welcomeMessage: "Ready to build your SaaS product!"
      },
      {
        id: "ai-tool-startup",
        title: "AI Tool Startup",
        description: "Build cutting-edge AI-powered tools and applications",
        emoji: "🤖",
        color: "purple",
        members: ["AI Developer", "Product Manager", "Growth Marketer"],
        welcomeMessage: "Let's create innovative AI tools!"
      }
    ]
  },
  creative: {
    id: "creative",
    title: "Creative & Content",
    icon: "Palette",
    packs: [
      {
        id: "creative-studio",
        title: "Creative Studio",
        description: "Full-service creative team for branding and design",
        emoji: "🎨",
        color: "purple",
        members: ["Creative Director", "Brand Strategist", "Copywriter"],
        welcomeMessage: "Ready to bring creative visions to life!"
      }
    ]
  }
};

const getHatchTemplate = (name: string) => ({
  name,
  role: name,
  description: `Expert ${name} with specialized skills`,
  color: "blue" as const,
  category: "general"
});

// Icon mapping for categories
const categoryIcons = {
  Briefcase,
  ShoppingBag,
  Palette,
  User,
  TrendingUp,
  Settings,
  GraduationCap,
  Lightbulb
};

interface StarterPacksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onSelectTemplate: (pack: StarterPack) => void;
  isLoading?: boolean;
  selectedPackId?: string;
}

export default function StarterPacksModal({
  isOpen,
  onClose,
  onBack,
  onSelectTemplate,
  isLoading = false,
  selectedPackId
}: StarterPacksModalProps) {
  const [activeCategory, setActiveCategory] = useState('business');
  const [selectedPack, setSelectedPack] = useState<string | null>(selectedPackId || null);

  const handleSelectPack = (pack: StarterPack) => {
    setSelectedPack(pack.id);
    onSelectTemplate(pack);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#23262B] rounded-2xl w-full max-w-6xl max-h-[90vh] border border-[#43444B] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#43444B] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="text-[#A6A7AB] hover:text-[#F1F1F3] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-xl font-semibold text-[#F1F1F3] mb-1">
                Choose Your Starter Template
              </h2>
              <p className="text-[#A6A7AB] text-sm">
                Select a pre-built team to get started quickly, or explore ideas if you're not sure what to build.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#A6A7AB] hover:text-[#F1F1F3] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Navigation */}
        <div className="px-6 py-4 border-b border-[#43444B]">
          <div className="flex gap-2 overflow-x-auto">
            {Object.entries(starterPacksByCategory).map(([categoryId, category]: [string, TemplateCategory]) => {
              const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons] || Briefcase;
              const packCount = category.packs.length;
              
              return (
                <button
                  key={categoryId}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    activeCategory === categoryId 
                      ? 'bg-[#6C82FF] text-white' 
                      : 'bg-[#37383B] text-[#A6A7AB] hover:bg-[#43444B] hover:text-[#F1F1F3]'
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="text-sm font-medium">{category.title}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    activeCategory === categoryId 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[#43444B] text-[#A6A7AB]'
                  }`}>
                    {packCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {starterPacksByCategory[activeCategory]?.packs.map(pack => (
              <TemplateCard 
                key={pack.id} 
                pack={pack} 
                isSelected={selectedPack === pack.id}
                isLoading={isLoading && selectedPack === pack.id}
                onSelect={() => handleSelectPack(pack)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  pack: StarterPack;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

function TemplateCard({ pack, isSelected, isLoading, onSelect }: TemplateCardProps) {
  return (
    <motion.div
      className={`bg-[#37383B] rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'border-[#6C82FF] bg-[#6C82FF]/5 scale-[0.98]' 
          : 'border-[#43444B] hover:border-[#6C82FF]/50'
      }`}
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Pack Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
            pack.color === 'blue' ? 'bg-[#6C82FF]/20' :
            pack.color === 'green' ? 'bg-[#47DB9A]/20' :
            pack.color === 'purple' ? 'bg-[#9F7BFF]/20' :
            pack.color === 'amber' ? 'bg-[#FFB547]/20' :
            pack.color === 'red' ? 'bg-[#FF4E6A]/20' :
            'bg-[#6C82FF]/20'
          }`}>
            {pack.emoji}
          </div>
          <div className="flex-1">
            <h3 className="text-[#F1F1F3] text-sm mb-1 flex items-center gap-2">
              {pack.title}
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="text-[#6C82FF]"
                >
                  <Sparkles size={12} />
                </motion.div>
              )}
            </h3>
            <p className="text-[#A6A7AB] text-xs leading-relaxed">
              {pack.description}
            </p>
          </div>
        </div>
        <div className="ml-2 text-[#A6A7AB] flex items-center gap-1">
          <Users size={12} />
          <span className="text-xs">{pack.members.length}</span>
        </div>
      </div>

      {/* Team Preview */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {pack.members.slice(0, 3).map((memberName: string) => {
            const hatch = getHatchTemplate(memberName);
            return (
              <div key={memberName} className="flex items-center gap-1 bg-[#23262B] rounded px-2 py-1">
                <div className={`w-4 h-4 rounded-full ${
                  hatch?.color === 'blue' ? 'bg-[#6C82FF]' :
                  hatch?.color === 'green' ? 'bg-[#47DB9A]' :
                  hatch?.color === 'purple' ? 'bg-[#9F7BFF]' :
                  hatch?.color === 'amber' ? 'bg-[#FFB547]' :
                  'bg-[#6C82FF]'
                }`} />
                <span className="text-xs text-[#F1F1F3]">{memberName}</span>
              </div>
            );
          })}
          
          {pack.members.length > 3 && (
            <div className="flex items-center justify-center bg-[#23262B] rounded px-2 py-1">
              <span className="text-xs text-[#A6A7AB]">+{pack.members.length - 3}</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-3 pt-3 border-t border-[#43444B]">
        <button
          className={`w-full px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium ${
            isSelected 
              ? 'bg-[#6C82FF] text-white' 
              : 'bg-[#43444B] hover:bg-[#6C82FF] text-[#F1F1F3] hover:text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : isSelected ? 'Starting...' : 'Use Pack'}
        </button>
      </div>
    </motion.div>
  );
}