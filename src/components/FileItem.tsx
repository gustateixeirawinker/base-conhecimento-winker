import React, { useState } from 'react';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { FileItem as FileItemType, ModuleType } from '../types';
import FileForm from './FileForm';
import DeleteConfirmation from './DeleteConfirmation';

interface FileItemProps {
  file: FileItemType;
  module: ModuleType;
  onUpdate: (module: ModuleType, file: FileItemType) => void;
  onDelete: (module: ModuleType, fileId: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, module, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg">
      {isEditing ? (
        <FileForm
          initialData={file}
          onSubmit={(updatedFile) => {
            onUpdate(module, { ...updatedFile, id: file.id });
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg text-gray-800">{file.name}</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                aria-label="Editar arquivo"
              >
                <Pencil size={18} />
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Excluir arquivo"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          {file.description && (
            <p className="text-gray-600 mt-1 mb-3">{file.description}</p>
          )}
          
          <a 
            href={file.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink size={16} className="mr-1" />
            Acessar conteúdo
          </a>
        </>
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          itemName={file.name}
          onConfirm={() => {
            onDelete(module, file.id);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default FileItem;