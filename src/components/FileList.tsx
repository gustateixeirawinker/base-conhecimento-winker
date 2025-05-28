import React, { useState } from 'react';
import { PlusCircle, FileText, Video } from 'lucide-react';
import { FileItem as FileItemType, ModuleType } from '../types';
import FileForm from './FileForm';

interface FileListProps {
  files: FileItemType[];
  module: ModuleType;
  onAddFile: (module: ModuleType, file: FileItemType) => void;
  onUpdateFile: (module: ModuleType, file: FileItemType) => void;
  onDeleteFile: (module: ModuleType, fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  module,
  onAddFile,
  onUpdateFile,
  onDeleteFile,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);

  const handleAddFile = (fileData: Omit<FileItemType, 'id'>) => {
    const newFile: FileItemType = {
      ...fileData,
      id: Date.now().toString(),
    };
    onAddFile(module, newFile);
    setShowAddForm(false);
  };

  const getFileIcon = (link: string) => {
    if (link.includes('youtube.com') || link.includes('vimeo.com')) {
      return <Video className="h-5 w-5 text-red-500" />;
    }
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  return (
    <div>
      <button
        onClick={() => setShowAddForm(true)}
        className="mb-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        Adicionar arquivo
      </button>

      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Adicionar novo arquivo</h3>
          <FileForm
            onSubmit={handleAddFile}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {files.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum arquivo cadastrado neste módulo.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-start p-4 bg-white rounded-lg border border-gray-100">
              <div className="flex-shrink-0">
                {getFileIcon(file.link)}
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
                {file.description && (
                  <p className="mt-1 text-gray-600">{file.description}</p>
                )}
                <a
                  href={file.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-600 hover:text-blue-800"
                >
                  Acessar conteúdo
                </a>
              </div>
              <div className="flex-shrink-0 ml-4 space-x-2">
                <button
                  onClick={() => setEditingFile(file.id)}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteFile(module, file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              {editingFile === file.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                    <h3 className="text-lg font-bold mb-4">Editar arquivo</h3>
                    <FileForm
                      initialData={file}
                      onSubmit={(data) => {
                        onUpdateFile(module, { ...data, id: file.id });
                        setEditingFile(null);
                      }}
                      onCancel={() => setEditingFile(null)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;