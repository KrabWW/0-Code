export interface Environment {
  id: string;
  name: string;
  variables: Record<string, string>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  branch: string;
  createdAt: string;
  environments: Environment[];
}

export interface ApiInterface {
  id: string;
  projectId: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
}

export interface TestCase {
  id: string;
  apiId: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'idle';
  priority: 'P0' | 'P1' | 'P2';
  lastRun?: string;
}

export interface TestScenario {
  id: string;
  projectId: string;
  name: string;
  steps: {
    type: 'api' | 'delay' | 'script';
    targetId?: string; // ApiInterface ID
    config?: any;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  code: string;
  description: string;
  version: string;
  status: 'active' | 'draft' | 'deprecated';
  type: string;
  lastUpdated: string;
  author: string;
  usageCount: number;
  successRate: number;
}

export interface ExecutionRun {
  id: string;
  skillName: string;
  startTime: string;
  duration: string;
  status: 'success' | 'running' | 'failed' | 'pending';
  operator: string;
  target: string;
  worktree?: {
    branch: string;
    repo: string;
    merged: boolean;
  };
}

export interface AnalysisReport {
  id: string;
  executionId: string;
  skillName: string;
  generatedAt: string;
  summary: string;
  status: 'passed' | 'warning' | 'failed';
  metrics: {
    accuracy?: string;
    latency?: string;
    resourceUsage?: string;
    score: number;
  };
  insights: string[];
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Basic' | 'Intermediate' | 'Expert';
  popularity: number;
}
