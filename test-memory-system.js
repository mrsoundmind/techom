import WebSocket from 'ws';

// Comprehensive memory system test
console.log('🧪 Starting B3 Memory System Test\n');

const ws = new WebSocket('ws://localhost:5000/ws');
let testStep = 0;

ws.on('open', function open() {
  console.log('✅ Connected to WebSocket\n');
  
  // Join conversation
  ws.send(JSON.stringify({
    type: 'join_conversation',
    conversationId: 'project-saas-startup'
  }));
  
  setTimeout(() => runTest(), 1000);
});

function runTest() {
  testStep++;
  
  if (testStep === 1) {
    console.log('🔬 TEST 1: User name introduction and decision storage');
    sendMessage('Hi! My name is TestUser and I decided we should build a mobile-first MVP for our SaaS startup. This is a key decision.');
    
  } else if (testStep === 2) {
    console.log('\n🔬 TEST 2: Memory recall test');
    sendMessage('Do you remember my name? What decision did I make about the MVP?');
    
  } else if (testStep === 3) {
    console.log('\n🔬 TEST 3: Project requirements and goals');
    sendMessage('Our main goal is to acquire 1000 users in 6 months. We need to focus on user acquisition strategy.');
    
  } else if (testStep === 4) {
    console.log('\n🔬 TEST 4: Cross-conversation memory test');
    sendMessage('What are all the key points you remember from our conversations so far?');
    
  } else {
    console.log('\n🏁 Memory system test completed');
    setTimeout(() => ws.close(), 2000);
  }
}

function sendMessage(content) {
  ws.send(JSON.stringify({
    type: 'send_message_streaming',
    conversationId: 'project-saas-startup',
    message: {
      id: 'test-' + Date.now(),
      conversationId: 'project-saas-startup',
      userId: 'memory-tester',
      content: content,
      messageType: 'user',
      timestamp: new Date().toISOString(),
      senderName: 'Memory Tester',
      metadata: {
        routing: {
          type: 'project',
          scope: 'SaaS Startup project (5 colleagues)',
          participantCount: 5,
          recipients: ['Product Manager', 'Product Designer', 'UI Engineer', 'Backend Developer', 'QA Lead']
        },
        memory: {
          projectMemory: 'Project: SaaS Startup',
          memoryScope: 'project-wide',
          canWrite: true
        }
      }
    }
  }));
}

ws.on('message', function message(data) {
  const msg = JSON.parse(data.toString());
  
  if (msg.type === 'streaming_completed') {
    console.log('✅ AI Response completed\n');
    setTimeout(() => runTest(), 3000); // Wait 3 seconds before next test
    
  } else if (msg.type === 'new_message' && msg.message?.messageType === 'agent') {
    console.log('🤖 Agent Response:', msg.message.content.substring(0, 150) + '...\n');
  }
});

ws.on('close', function close() {
  console.log('✅ Test completed - WebSocket closed');
});

// Auto-close after 25 seconds
setTimeout(() => {
  if (ws.readyState === WebSocket.OPEN) {
    console.log('\n⏰ Test timeout - closing connection');
    ws.close();
  }
}, 25000);