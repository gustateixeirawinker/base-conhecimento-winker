import { AppState, FileItem, ModuleType } from '../types';

const STORAGE_KEY = 'winker_knowledge_base';

// Initialize localStorage with empty modules if not exists
export const initializeStorage = (): AppState => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  const initialState: AppState = {
    App: [],
    ERP: [],
    Flow: [],
    Chat: []
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
  return initialState;
};

// Get all files for a specific module
export const getModuleFiles = (module: ModuleType): FileItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  const parsedData: AppState = JSON.parse(data);
  return parsedData[module] || [];
};

// Add a new file to a module
export const addFile = (module: ModuleType, file: FileItem): void => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  
  const parsedData: AppState = JSON.parse(data);
  parsedData[module] = [...parsedData[module], file];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
};

// Update an existing file
export const updateFile = (module: ModuleType, updatedFile: FileItem): void => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  
  const parsedData: AppState = JSON.parse(data);
  parsedData[module] = parsedData[module].map(file => 
    file.id === updatedFile.id ? updatedFile : file
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
};

// Delete a file
export const deleteFile = (module: ModuleType, fileId: string): void => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  
  const parsedData: AppState = JSON.parse(data);
  parsedData[module] = parsedData[module].filter(file => file.id !== fileId);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
};

// Validate URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};