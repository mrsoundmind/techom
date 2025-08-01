import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiRequest } from '@/lib/queryClient';
import { Brain, MessageSquare, Settings, TrendingUp, Users, Plus, Save } from 'lucide-react';

interface TrainingStats {
  totalFeedback: number;
  successRate: number;
  customExamples: number;
  customProfiles: number;
  activeTrainingTypes: string[];
}

interface CustomExample {
  agentRole: string;
  userInput: string;
  idealResponse: string;
  category: string;
}

interface RoleProfile {
  agentRole: string;
  personality?: string;
  expertMindset?: string;
  communicationStyle?: string;
  responseLength?: string;
  tone?: string;
  customPrompt?: string;
  companyTerminology?: string[];
}

export function TrainingDashboard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [selectedRole, setSelectedRole] = useState('Product Manager');
  const [customExample, setCustomExample] = useState<CustomExample>({
    agentRole: 'Product Manager',
    userInput: '',
    idealResponse: '',
    category: 'general'
  });
  const [roleProfile, setRoleProfile] = useState<RoleProfile>({
    agentRole: 'Product Manager'
  });

  const availableRoles = [
    'Product Manager',
    'Product Designer', 
    'UI Engineer',
    'Backend Developer',
    'QA Lead'
  ];

  useEffect(() => {
    if (isOpen) {
      loadTrainingStats();
      loadRoleProfile(selectedRole);
    }
  }, [isOpen, selectedRole]);

  const loadTrainingStats = async () => {
    try {
      const response = await fetch('/api/training/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to load training stats:', error);
    }
  };

  const loadRoleProfile = async (role: string) => {
    try {
      const response = await fetch(`/api/training/role-profile/${role}`);
      const data = await response.json();
      if (data) {
        setRoleProfile(data);
      } else {
        setRoleProfile({ agentRole: role });
      }
    } catch (error) {
      console.error('Failed to load role profile:', error);
      setRoleProfile({ agentRole: role });
    }
  };

  const saveCustomExample = async () => {
    try {
      await fetch('/api/training/example', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customExample)
      });
      
      setCustomExample({
        agentRole: selectedRole,
        userInput: '',
        idealResponse: '',
        category: 'general'
      });
      
      loadTrainingStats();
      alert('Custom example saved! This colleague will learn from this conversation pattern.');
    } catch (error) {
      console.error('Failed to save custom example:', error);
      alert('Failed to save example. Please try again.');
    }
  };

  const saveRoleProfile = async () => {
    try {
      await fetch('/api/training/role-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleProfile)
      });
      
      loadTrainingStats();
      alert(`${selectedRole} personality updated! They will respond differently in future conversations.`);
    } catch (error) {
      console.error('Failed to save role profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-purple-500" />
            AI Training Dashboard
          </h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="p-6">
          {/* Training Overview */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-green-500" size={20} />
                  <div>
                    <div className="text-2xl font-bold">{stats.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-blue-500" size={20} />
                  <div>
                    <div className="text-2xl font-bold">{stats.totalFeedback}</div>
                    <div className="text-sm text-gray-600">Feedback Given</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center gap-2">
                  <Plus className="text-purple-500" size={20} />
                  <div>
                    <div className="text-2xl font-bold">{stats.customExamples}</div>
                    <div className="text-sm text-gray-600">Custom Examples</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center gap-2">
                  <Users className="text-orange-500" size={20} />
                  <div>
                    <div className="text-2xl font-bold">{stats.customProfiles}</div>
                    <div className="text-sm text-gray-600">Custom Profiles</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Colleague to Train:</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Training Methods Tabs */}
          <Tabs defaultValue="examples">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Custom Examples</TabsTrigger>
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="feedback">Feedback History</TabsTrigger>
            </TabsList>

            {/* Method 1: Custom Examples */}
            <TabsContent value="examples" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Train with Custom Conversations</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Show {selectedRole} exactly how to respond to specific questions
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">When user says:</label>
                    <Input
                      placeholder="e.g., help me plan a roadmap"
                      value={customExample.userInput}
                      onChange={(e) => setCustomExample(prev => ({ ...prev, userInput: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{selectedRole} should respond:</label>
                    <Textarea
                      placeholder="e.g., Let's break this into phases. First, what's your core objective and timeline?"
                      value={customExample.idealResponse}
                      onChange={(e) => setCustomExample(prev => ({ ...prev, idealResponse: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={saveCustomExample}
                    disabled={!customExample.userInput || !customExample.idealResponse}
                    className="w-full"
                  >
                    <Save size={16} className="mr-2" />
                    Save Training Example
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Method 2: Personality Customization */}
            <TabsContent value="personality" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Customize {selectedRole} Personality</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Define how this colleague should think, communicate, and behave
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Personality Style:</label>
                    <Input
                      placeholder="e.g., friendly and approachable, direct and technical, creative and inspiring"
                      value={roleProfile.personality || ''}
                      onChange={(e) => setRoleProfile(prev => ({ ...prev, personality: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Expert Mindset:</label>
                    <Textarea
                      placeholder="e.g., You think like a senior PM at a startup. You prioritize user impact and move fast."
                      value={roleProfile.expertMindset || ''}
                      onChange={(e) => setRoleProfile(prev => ({ ...prev, expertMindset: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Response Length:</label>
                      <Select 
                        value={roleProfile.responseLength || ''} 
                        onValueChange={(value) => setRoleProfile(prev => ({ ...prev, responseLength: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short & concise</SelectItem>
                          <SelectItem value="medium">Medium detail</SelectItem>
                          <SelectItem value="long">Detailed & thorough</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Communication Tone:</label>
                      <Select 
                        value={roleProfile.tone || ''} 
                        onValueChange={(value) => setRoleProfile(prev => ({ ...prev, tone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Formal & professional</SelectItem>
                          <SelectItem value="casual">Casual & friendly</SelectItem>
                          <SelectItem value="technical">Technical & precise</SelectItem>
                          <SelectItem value="friendly">Warm & encouraging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Custom Instructions:</label>
                    <Textarea
                      placeholder="e.g., Always ask follow-up questions. Use company terminology. Reference user goals."
                      value={roleProfile.customPrompt || ''}
                      onChange={(e) => setRoleProfile(prev => ({ ...prev, customPrompt: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={saveRoleProfile}
                    className="w-full"
                  >
                    <Save size={16} className="mr-2" />
                    Save Personality Profile
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Method 3: Feedback History */}
            <TabsContent value="feedback">
              <div className="bg-white dark:bg-gray-800 rounded-lg border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Training Progress</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Monitor how your feedback is improving colleague responses
                  </p>
                </div>
                <div className="p-6">
                  {stats && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {stats.activeTrainingTypes.map(type => (
                          <span key={type} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">{type}</span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>Total feedback given: {stats.totalFeedback}</p>
                        <p>Custom examples created: {stats.customExamples}</p>
                        <p>Personalities customized: {stats.customProfiles}</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm">
                          <strong>Keep training!</strong> The more feedback and examples you provide, 
                          the better your colleagues become at understanding your communication style and project needs.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}