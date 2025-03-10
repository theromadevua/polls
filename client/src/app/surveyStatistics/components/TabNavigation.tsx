interface TabNavigationProps {
    activeTab: 'overview' | 'individual';
    onTabChange: (tab: 'overview' | 'individual') => void;
  }
  
  export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => onTabChange('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onTabChange('individual')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'individual'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Individual Responses
          </button>
        </nav>
      </div>
    </div>
  );