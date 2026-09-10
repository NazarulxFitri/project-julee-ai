import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatView from './components/ChatView';
import TerminalView from './components/TerminalView';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isThinking, setIsThinking] = useState(false);
  const [pendingDeploy, setPendingDeploy] = useState(false);

  const connectedIntegrations = {
    github: true,
    vercel: true
  };

  // Initial messages from Julee
  const [messages, setMessages] = useState([
    {
      sender: 'julee',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Hello! I'm Julee, your 24/7 AI partner. I'm trained to ask for explicit project confirmation before running any deployment pipeline.",
      actionCard: {
        title: 'Cloud Engine Online (Confirmation Safeguard Active)',
        detail: 'Safeguard: Always asks target project before executing build & push.',
        url: 'https://project-julee-ai.vercel.app'
      }
    },
    {
      sender: 'julee',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Whenever you say 'deploy', I'll ask you to confirm which project you want to target (e.g. project-julee-ai or muslim-companion)!"
    }
  ]);

  // Terminal Logs state
  const [logs, setLogs] = useState([
    { timestamp: '21:28:10', category: 'SYSTEM', message: 'Julee Cloud Engine initialized on node vps-us-east (Engine: Gemini 3.6 Flash Medium).' },
    { timestamp: '21:28:12', category: 'GIT', message: 'Authenticated with GitHub PAT for repo NazarulxFitri/project-julee-ai.' },
    { timestamp: '21:28:15', category: 'VERCEL', message: 'Vercel Deployment API connected. Production domain: project-julee-ai.vercel.app.' },
    { timestamp: '21:29:01', category: 'AGENT', message: 'Project Confirmation Rule active. Will prompt user before any push or deploy.' }
  ]);

  const handleSendMessage = (text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const lowerText = text.toLowerCase().trim();
    
    // Add User Message
    const userMsg = { sender: 'user', time: timeStr, text };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    // Simulate Agent execution & response
    setTimeout(() => {
      let replyText = '';
      let codeSnippet = null;
      let actionCard = null;
      let newLogCategory = 'AGENT';
      let newLogMsg = '';

      const taskId = `TASK-${Math.floor(1000 + Math.random() * 9000)}`;

      // Check if user is responding to a pending project confirmation
      const isProjectSpecified = lowerText.includes('julee') || lowerText.includes('muslim') || lowerText.includes('project');

      if (pendingDeploy || (lowerText.includes('deploy') && isProjectSpecified) || (lowerText.includes('push') && isProjectSpecified)) {
        const targetRepo = lowerText.includes('muslim') ? 'NazarulxFitri/muslim-companion' : 'NazarulxFitri/project-julee-ai';
        const targetDomain = lowerText.includes('muslim') ? 'muslim-companion.vercel.app' : 'project-julee-ai.vercel.app';

        replyText = `Confirmed! Executing Deployment Pipeline for **${targetRepo}**:\n\n1. ✅ **Build Check**: Ran \`npm run build\` inside project folder — 0 errors.\n2. ✅ **Lint Check**: Code linting & structure verified.\n3. ✅ **Stage Changes**: Executed \`git add .\`\n4. ✅ **Git Commit**: Created signed commit.\n5. ✅ **Git Push**: Pushed to \`origin/main\` on GitHub.\n6. 🚀 **Vercel Auto-Deploy**: Live on production SSL!`;
        codeSnippet = `$ cd "${targetRepo.split('/')[1]}"\n$ npm run build (OK)\n$ git add .\n$ git commit -m "deploy: updates pushed by Julee"\n$ git push origin main\n> Vercel build triggered: https://${targetDomain}`;
        actionCard = {
          title: `Deployment Complete for ${targetRepo.split('/')[1]}`,
          detail: 'Passed: Build ➔ Lint ➔ Add ➔ Commit ➔ Push ➔ Vercel Live',
          url: `https://${targetDomain}`
        };
        newLogCategory = 'VERCEL';
        newLogMsg = `Confirmed target project ${targetRepo}. Executed build ➔ lint ➔ add ➔ commit ➔ push ➔ Vercel deploy. Status: 200 OK.`;
        setPendingDeploy(false);

      } else if (lowerText === 'deploy' || lowerText === 'push' || lowerText.includes('deploy') || lowerText.includes('push')) {
        replyText = `Which project would you like me to deploy?\n\n1. 🎯 **project-julee-ai** (Julee Control Dashboard)\n2. 🎯 **muslim-companion** (Muslim Companion App)\n\nReply with the project name to confirm execution!`;
        newLogCategory = 'AGENT';
        newLogMsg = `Prompted user for target project confirmation before deployment.`;
        setPendingDeploy(true);

      } else if (lowerText.includes('name') || lowerText.includes('who are you') || lowerText.includes('who r u')) {
        replyText = "My name is Julee! ⚡ I'm your autonomous 24/7 AI partner built to assist you with your day-to-day routine, project development, and strict deployment pipelines with project confirmation safeguards.";
        newLogCategory = 'AGENT';
        newLogMsg = `Answered identity question.`;

      } else if (lowerText.includes('status') || lowerText.includes('uptime') || lowerText.includes('health')) {
        replyText = `System Health Report: Julee 24/7 Cloud Runner is active and operating with 99.99% uptime on Gemini 3.6 Flash (Medium). Memory usage: 42MB. Confirmation Safeguards enabled.`;
        newLogCategory = 'SYSTEM';
        newLogMsg = `Performed 24/7 cloud health check. System operating normally.`;

      } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey') || lowerText.includes('talk')) {
        replyText = `Hey there! 😊 I'm right here with you. Tell me what project you'd like to work on, or say 'deploy' when you're ready!`;
        newLogCategory = 'AGENT';
        newLogMsg = `Replied conversationally to greeting.`;

      } else {
        replyText = `I hear you! I've noted: "${text}". Changes remain local. Say 'deploy' whenever you're ready, and I'll ask you which project to target!`;
        newLogCategory = 'AGENT';
        newLogMsg = `Processed note: "${text}". Kept changes local.`;
      }

      // Append terminal log
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: newLogCategory,
        message: newLogMsg
      }]);

      // Append Julee reply
      setMessages(prev => [...prev, {
        sender: 'julee',
        time: timeStr,
        text: replyText,
        codeSnippet,
        codeLanguage: 'bash',
        actionCard
      }]);

      setIsThinking(false);
    }, 900);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleRunDiagnostic = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      ...prev,
      { timestamp: timeStr, category: 'SYSTEM', message: 'Running comprehensive diagnostic check...' },
      { timestamp: timeStr, category: 'GIT', message: 'GitHub connection ping: 34ms (OK)' },
      { timestamp: timeStr, category: 'VERCEL', message: 'Vercel API ping: 22ms (OK)' },
      { timestamp: timeStr, category: 'AGENT', message: 'All systems operational. Cloud worker ready.' }
    ]);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          connectedIntegrations={connectedIntegrations}
        />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'chat' && (
            <ChatView
              messages={messages}
              onSendMessage={handleSendMessage}
              isThinking={isThinking}
            />
          )}

          {activeTab === 'terminal' && (
            <TerminalView
              logs={logs}
              onClearLogs={handleClearLogs}
              onRunDiagnostic={handleRunDiagnostic}
            />
          )}
        </main>
      </div>
    </div>
  );
}
