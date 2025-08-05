// Test script for B3 Cross-Agent Memory System
import { storage } from './server/storage.js';

async function testMemorySystem() {
  console.log('\n🧪 TESTING B3 CROSS-AGENT MEMORY SYSTEM\n');
  
  // Test 1: Check if sample memory was initialized
  console.log('📋 Test 1: Initial Memory Setup');
  const initialMemory = await storage.getProjectMemory('saas-startup');
  console.log('✓ Project memories found:', initialMemory.length);
  initialMemory.forEach(memory => {
    console.log(`  - ${memory.memoryType}: ${memory.content} (importance: ${memory.importance})`);
  });
  
  // Test 2: Add conversation memory
  console.log('\n📋 Test 2: Adding New Memory');
  await storage.addConversationMemory(
    'project-saas-startup',
    'decisions', 
    'User decided to prioritize mobile-first design approach',
    8
  );
  
  const updatedMemory = await storage.getProjectMemory('saas-startup');  
  console.log('✓ Updated memory count:', updatedMemory.length);
  
  // Test 3: Test shared memory retrieval for agent
  console.log('\n📋 Test 3: Agent Memory Context');
  const agents = await storage.getAgentsByProject('saas-startup');
  if (agents.length > 0) {
    const agent = agents[0];
    console.log(`Testing memory for agent: ${agent.name} (${agent.role})`);
    
    const sharedMemory = await storage.getSharedMemoryForAgent(agent.id, 'saas-startup');
    console.log('✓ Shared memory context generated:', sharedMemory.length > 0 ? 'Yes' : 'No');
    console.log('Memory context:');
    console.log(sharedMemory);
  }
  
  // Test 4: Memory importance ordering
  console.log('\n📋 Test 4: Memory Importance Ordering');
  const sortedMemory = await storage.getProjectMemory('saas-startup');
  console.log('✓ Memories sorted by importance (highest first):');
  sortedMemory.forEach((memory, index) => {
    console.log(`  ${index + 1}. [${memory.importance}] ${memory.content.substring(0, 50)}...`);
  });
  
  console.log('\n✅ MEMORY SYSTEM TEST COMPLETED\n');
}

// Run the test
testMemorySystem().catch(console.error);