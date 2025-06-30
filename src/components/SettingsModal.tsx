import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
  };
  onUpdateSettings: (settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
  }) => void;
  // New props for consolidated actions
  onRestartStory?: () => void;
  onChangeStory?: () => void;
  onShowTutorial?: () => void;
  onShowAbout?: () => void;
  onToggleDebug?: () => void;
  showDebug?: boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  onRestartStory,
  onChangeStory,
  onShowTutorial,
  onShowAbout,
  onToggleDebug,
  showDebug
}) => {
  if (!isOpen) return null;

  const handleToggle = (key: string) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="max-w-2xl w-full mx-4 bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-lg shadow-2xl border border-indigo-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Display Mode */}
          <div className="border-b border-slate-700 pb-4">
            <h3 className="text-lg font-semibold text-white mb-4">Display Mode</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="flex-1">
                  <p className="text-slate-300 font-medium">Developer Mode</p>
                  <p className="text-xs text-slate-500">Show technical information and debug features</p>
                </div>
                <button
                  onClick={() => handleToggle('developerMode')}
                  role="switch"
                  aria-checked={settings.developerMode}
                  aria-label={`Developer Mode ${settings.developerMode ? 'enabled' : 'disabled'}`}
                  className={`
                    relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                    hover:scale-105 active:scale-95
                    ${settings.developerMode ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-slate-600 hover:bg-slate-500'}
                  `}
                >
                  <span className="sr-only">Toggle Developer Mode</span>
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 
                      transition-all duration-300 ease-in-out
                      ${settings.developerMode ? 'translate-x-6 shadow-indigo-200/50' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="flex-1">
                  <p className="text-slate-300 font-medium">Variable Dashboard</p>
                  <p className="text-xs text-slate-500">Display real-time narrative variables</p>
                </div>
                <button
                  onClick={() => handleToggle('showVariableDashboard')}
                  role="switch"
                  aria-checked={settings.showVariableDashboard}
                  aria-label={`Variable Dashboard ${settings.showVariableDashboard ? 'enabled' : 'disabled'}`}
                  className={`
                    relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                    hover:scale-105 active:scale-95
                    ${settings.showVariableDashboard ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-slate-600 hover:bg-slate-500'}
                  `}
                >
                  <span className="sr-only">Toggle Variable Dashboard</span>
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 
                      transition-all duration-300 ease-in-out
                      ${settings.showVariableDashboard ? 'translate-x-6 shadow-indigo-200/50' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {settings.developerMode && (
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-slate-300 font-medium">Debug Information</p>
                    <p className="text-xs text-slate-500">Show internal state and flags (Dev Mode only)</p>
                  </div>
                  <button
                    onClick={() => handleToggle('showDebugInfo')}
                    role="switch"
                    aria-checked={settings.showDebugInfo}
                    aria-label={`Debug Information ${settings.showDebugInfo ? 'enabled' : 'disabled'}`}
                    className={`
                      relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                      transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                      hover:scale-105 active:scale-95
                      ${settings.showDebugInfo ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-slate-600 hover:bg-slate-500'}
                    `}
                  >
                    <span className="sr-only">Toggle Debug Information</span>
                    <span
                      className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 
                        transition-all duration-300 ease-in-out
                        ${settings.showDebugInfo ? 'translate-x-6 shadow-indigo-200/50' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Information */}
          <div className="text-sm text-slate-400">
            <p className="mb-2">
              <strong className="text-slate-300">Casual Mode:</strong> Clean, immersive narrative experience
            </p>
            <p>
              <strong className="text-slate-300">Developer Mode:</strong> Exposes technical details and quantum mechanics
            </p>
          </div>

          {/* Quick Actions */}
          <div className="border-b border-slate-700 pb-4">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {onRestartStory && (
                <button
                  onClick={() => {
                    onRestartStory();
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors"
                >
                  <span>🔄</span>
                  Restart Story
                </button>
              )}
              {onChangeStory && (
                <button
                  onClick={() => {
                    onChangeStory();
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 rounded-lg hover:bg-cyan-600/30 transition-colors"
                >
                  <span>📚</span>
                  Change Story
                </button>
              )}
              {onShowTutorial && (
                <button
                  onClick={() => {
                    onShowTutorial();
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-yellow-600/20 border border-yellow-500/30 text-yellow-300 rounded-lg hover:bg-yellow-600/30 transition-colors"
                >
                  <span>📖</span>
                  Tutorial
                </button>
              )}
              {onShowAbout && (
                <button
                  onClick={() => {
                    onShowAbout();
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-3 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors"
                >
                  <span>ℹ️</span>
                  About
                </button>
              )}
            </div>
          </div>

          {/* Developer Actions */}
          {settings.developerMode && (
            <div className="border-b border-slate-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Developer Tools</h3>
              <div className="flex gap-3">
                {onToggleDebug && (
                  <button
                    onClick={() => {
                      onToggleDebug();
                    }}
                    className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                      showDebug 
                        ? 'bg-gray-600/30 border-gray-500/50 text-gray-300' 
                        : 'bg-gray-600/20 border-gray-500/30 text-gray-400 hover:bg-gray-600/30'
                    }`}
                  >
                    <span>{showDebug ? '👁️' : '🔍'}</span>
                    {showDebug ? 'Hide Debug' : 'Show Debug'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
