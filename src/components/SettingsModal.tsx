import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
  onUpdateSettings: (settings: {
    developerMode: boolean;
    showVariableDashboard: boolean;
    showDebugInfo: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  }) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  if (!isOpen) return null;

  const handleToggle = (key: string) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings]
    });
  };

  const handleSpeedChange = (speed: 'slow' | 'normal' | 'fast') => {
    onUpdateSettings({
      ...settings,
      animationSpeed: speed
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
              <div className="flex items-center justify-between">
                <div>
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
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                    ${settings.developerMode ? 'bg-indigo-600' : 'bg-slate-600'}
                  `}
                >
                  <span className="sr-only">Toggle Developer Mode</span>
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                      transition duration-200 ease-in-out
                      ${settings.developerMode ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
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
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                    ${settings.showVariableDashboard ? 'bg-indigo-600' : 'bg-slate-600'}
                  `}
                >
                  <span className="sr-only">Toggle Variable Dashboard</span>
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                      transition duration-200 ease-in-out
                      ${settings.showVariableDashboard ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {settings.developerMode && (
                <div className="flex items-center justify-between">
                  <div>
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
                      transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                      ${settings.showDebugInfo ? 'bg-indigo-600' : 'bg-slate-600'}
                    `}
                  >
                    <span className="sr-only">Toggle Debug Information</span>
                    <span
                      className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                        transition duration-200 ease-in-out
                        ${settings.showDebugInfo ? 'translate-x-6' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Animation Settings */}
          <div className="border-b border-slate-700 pb-4">
            <h3 className="text-lg font-semibold text-white mb-4">Animation Speed</h3>
            <div className="flex gap-3">
              {(['slow', 'normal', 'fast'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    settings.animationSpeed === speed
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {speed}
                </button>
              ))}
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
