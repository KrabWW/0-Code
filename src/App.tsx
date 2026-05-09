/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Workspace } from './pages/Workspace';
import { SkillsHub } from './pages/SkillsHub';
import { SkillEditor } from './pages/SkillEditor';
import { ExecutionCenter } from './pages/ExecutionCenter';
import { ExecutionMonitor } from './pages/ExecutionMonitor';
import { Connectors } from './pages/Connectors';
import { TestCenter } from './pages/TestCenter';
import { Board } from './pages/Board';
import { Runtimes } from './pages/Runtimes';
import { Reports } from './pages/Reports';
import { Chat } from './pages/Chat';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Workspace />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/board" element={<Board />} />
          <Route path="/skills" element={<SkillsHub />} />
          <Route path="/editor" element={<SkillEditor />} />
          <Route path="/runtimes" element={<Runtimes />} />
          <Route path="/execution" element={<ExecutionCenter />} />
          <Route path="/execution/:id" element={<ExecutionMonitor />} />
          <Route path="/connectors" element={<Connectors />} />
          <Route path="/test" element={<TestCenter />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

