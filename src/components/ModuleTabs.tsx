import React from 'react';
import { ModuleType } from '../types';

interface ModuleTabsProps {
  activeModule: ModuleType;
  onChange: (module: ModuleType) => void;
}

const modules: ModuleType[] = ['App', 'ERP', 'Flow', 'Chat'];

const ModuleTabs: React.FC<ModuleTabsProps> = ({ activeModule, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {modules.map((module) => (
          <button
            key={module}
            onClick={() => onChange(module)}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors
              ${
                activeModule === module
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
            aria-current={activeModule === module ? 'page' : undefined}
          >
            {module}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ModuleTabs;