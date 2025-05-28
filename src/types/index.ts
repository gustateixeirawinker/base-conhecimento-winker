export interface FileItem {
  id: string;
  name: string;
  description: string;
  link: string;
}

export type ModuleType = 'App' | 'ERP' | 'Flow' | 'Chat';

export interface AppState {
  App: FileItem[];
  ERP: FileItem[];
  Flow: FileItem[];
  Chat: FileItem[];
}

export interface FileFormData {
  name: string;
  description: string;
  link: string;
}