import { useState } from 'react';
import { Bot, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';

interface Agent {
  id: string;
  name: string;
  role: string;
  color: string;
  teamId: string;
  projectId: string;
}

interface Team {
  id: string;
  name: string;
  emoji: string;
  projectId: string;
}

interface ChatTypeSelectorProps {
  projectId: string;
  onChatSelect: (chatInfo: {
    type: 'project' | 'team' | 'hatch';
    conversationId: string;
    projectId: string;
    teamId?: string;
    agentId?: string;
    agentName?: string;
    agentColor?: string;
  }) => void;
}

export function ChatTypeSelector({ projectId, onChatSelect }: ChatTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<'project' | 'team' | 'hatch'>('project');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');

  // Fetch teams for this project
  const { data: teams = [] } = useQuery({
    queryKey: ['/api/teams'],
    select: (data: Team[]) => data.filter(team => team.projectId === projectId)
  });

  // Fetch agents for this project
  const { data: agents = [] } = useQuery({
    queryKey: ['/api/agents'],
    select: (data: Agent[]) => data.filter(agent => agent.projectId === projectId)
  });

  // Filter agents by selected team for team chat
  const teamAgents = selectedTeamId 
    ? agents.filter(agent => agent.teamId === selectedTeamId)
    : [];

  const handleStartChat = () => {
    let conversationId = '';
    let chatInfo: any = {
      type: selectedType,
      projectId: projectId
    };

    switch (selectedType) {
      case 'project':
        conversationId = `project-${projectId}`;
        break;
      case 'team':
        if (!selectedTeamId) return;
        conversationId = `team-${selectedTeamId}`;
        chatInfo.teamId = selectedTeamId;
        break;
      case 'hatch':
        if (!selectedAgentId) return;
        const selectedAgent = agents.find(a => a.id === selectedAgentId);
        conversationId = `hatch-${selectedAgentId}`;
        chatInfo.agentId = selectedAgentId;
        chatInfo.agentName = selectedAgent?.name;
        chatInfo.agentColor = selectedAgent?.color;
        break;
    }

    onChatSelect({
      ...chatInfo,
      conversationId
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-6">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Start a Conversation</h2>
          <p className="text-gray-400">Choose who you'd like to chat with</p>
        </div>

        {/* Chat Type Selection */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={selectedType === 'project' ? 'default' : 'outline'}
              className={`h-20 flex flex-col gap-2 ${
                selectedType === 'project' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setSelectedType('project')}
            >
              <Building className="w-6 h-6" />
              <span className="text-sm">Project Chat</span>
            </Button>
            
            <Button
              variant={selectedType === 'team' ? 'default' : 'outline'}
              className={`h-20 flex flex-col gap-2 ${
                selectedType === 'team' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setSelectedType('team')}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Team Chat</span>
            </Button>
            
            <Button
              variant={selectedType === 'hatch' ? 'default' : 'outline'}
              className={`h-20 flex flex-col gap-2 ${
                selectedType === 'hatch' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setSelectedType('hatch')}
            >
              <Bot className="w-6 h-6" />
              <span className="text-sm">Hatch Chat</span>
            </Button>
          </div>

          {/* Additional Selectors */}
          {selectedType === 'team' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Team
              </label>
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Choose a team..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id} className="text-white hover:bg-gray-700">
                      {team.emoji} {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedType === 'hatch' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Hatch
              </label>
              <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Choose a hatch..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id} className="text-white hover:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${agent.color}-500`} />
                        <span>{agent.name}</span>
                        <span className="text-gray-400 text-sm">({agent.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Chat Description */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">
            {selectedType === 'project' && 'Project Chat'}
            {selectedType === 'team' && 'Team Chat'}
            {selectedType === 'hatch' && 'Hatch Chat'}
          </h3>
          <p className="text-gray-400 text-sm">
            {selectedType === 'project' && 'Discuss project-wide topics, share updates, and coordinate across all teams.'}
            {selectedType === 'team' && 'Collaborate with your team members and coordinate team-specific tasks.'}
            {selectedType === 'hatch' && 'Have a private 1-on-1 conversation with your AI teammate.'}
          </p>
        </div>

        {/* Start Chat Button */}
        <Button
          onClick={handleStartChat}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={
            (selectedType === 'team' && !selectedTeamId) ||
            (selectedType === 'hatch' && !selectedAgentId)
          }
        >
          Start Chat
        </Button>
      </div>
    </div>
  );
}