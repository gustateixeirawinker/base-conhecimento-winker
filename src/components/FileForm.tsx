import React, { useState } from 'react';
import { FileItem, FileFormData } from '../types';
import { isValidUrl } from '../utils/storage';

interface FileFormProps {
  initialData?: FileItem;
  onSubmit: (data: FileFormData) => void;
  onCancel: () => void;
}

const FileForm: React.FC<FileFormProps> = ({
  initialData = { id: '', name: '', description: '', link: '' },
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FileFormData>({
    name: initialData.name,
    description: initialData.description,
    link: initialData.link,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FileFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FileFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FileFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.link.trim()) {
      newErrors.link = 'Link é obrigatório';
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = 'URL inválida. Inclua http:// ou https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
          Link <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://exemplo.com"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.link ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default FileForm;