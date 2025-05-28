import React, { useState, useEffect } from 'react';
import { FileText, MessageSquare, GitBranch, Smartphone, Database } from 'lucide-react';
import { AppState, FileItem, ModuleType } from './types';
import FileList from './components/FileList';
import NotificationToast, { ToastType } from './components/NotificationToast';
import { 
  initializeStorage, 
  getModuleFiles, 
  addFile, 
  updateFile, 
  deleteFile 
} from './utils/storage';

interface Notification {
  type: ToastType;
  message: string;
}

const moduleInfo = {
  Chat: {
    icon: MessageSquare,
    description: 'Tutoriais e recursos sobre nosso sistema de atendimento via chat.',
    color: 'bg-blue-600',
    textColor:'text-yellow-400',
    
  },
  Flow: {
    icon: GitBranch,
    description: 'Materiais sobre automações e fluxos de atendimento.',
    color: 'bg-green-500',
    textColor:'text-black',

  },
  App: {
    icon: Smartphone,
    description: 'Guia de uso do nosso aplicativo para dispositivos móveis.',
    color: 'bg-pink-800',
    textColor:'text-yellow-400',

  },
  ERP: {
    icon: Database,
    description: 'Recursos e manuais do nosso sistema de gestão (ERP).',
    color: 'bg-blue-900',
    textColor:'text-green-500',

  }
};

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('Chat');
  const [data, setData] = useState<AppState>({
    App: [],
    ERP: [],
    Flow: [],
    Chat: []
  });
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const initialData = initializeStorage();
    setData(initialData);
  }, []);

  const showNotification = (type: ToastType, message: string) => {
    setNotification({ type, message });
  };

  const handleAddFile = (module: ModuleType, file: FileItem) => {
    addFile(module, file);
    setData(prevData => ({
      ...prevData,
      [module]: [...prevData[module], file]
    }));
    showNotification('success', 'Arquivo adicionado com sucesso!');
  };

  const handleUpdateFile = (module: ModuleType, updatedFile: FileItem) => {
    updateFile(module, updatedFile);
    setData(prevData => ({
      ...prevData,
      [module]: prevData[module].map(file => 
        file.id === updatedFile.id ? updatedFile : file
      )
    }));
    showNotification('success', 'Arquivo atualizado com sucesso!');
  };

  const handleDeleteFile = (module: ModuleType, fileId: string) => {
    deleteFile(module, fileId);
    setData(prevData => ({
      ...prevData,
      [module]: prevData[module].filter(file => file.id !== fileId)
    }));
    showNotification('info', 'Arquivo excluído com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">
            Base de Conhecimento Winker
          </h1>
          <p className="text-black">
            Encontre aqui tutoriais, vídeos e materiais explicativos sobre nossos produtos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(moduleInfo).map(([module, info]) => {
            const Icon = info.icon;
            return (
              <button
                key={module}
                onClick={() => setActiveModule(module as ModuleType)}
                className={`${info.color} rounded-lg p-6 text-left transition-shadow hover:shadow-lg ${
                  activeModule === module ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Icon className="h-6 w-6 text-white mb-4" />
                <h2 className={`text-xl font-semibold ${info.textColor} mb-2`}>{module}</h2>
<p className={`${info.textColor} text-sm`}>{info.description}</p>

              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeModule}</h2>
          <FileList
            files={data[activeModule]}
            module={activeModule}
            onAddFile={handleAddFile}
            onUpdateFile={handleUpdateFile}
            onDeleteFile={handleDeleteFile}
          />
        </div>
      </div>

      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;