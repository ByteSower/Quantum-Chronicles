import { useState } from 'react';

interface SideMenuProps {
  onHome?: () => void;
  onTutorial?: () => void;
  onSettings?: () => void;
  onRestart?: () => void;
  onToggleVariables?: () => void;
}

export function SideMenu({ 
  onHome, 
  onTutorial, 
  onSettings, 
  onRestart, 
  onToggleVariables 
}: SideMenuProps) {
  const [open, setOpen] = useState(false);
  
  const handleMenuAction = (action?: () => void) => {
    if (action) action();
    setOpen(false); // Close menu after action
  };
  
  return (
    <>
      <button
        aria-label="Open menu"
        className="p-2 fixed top-4 right-4 z-50 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        ☰
      </button>
      {open && (
        <nav className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="w-64 bg-white h-full shadow-lg p-4 transform transition-transform">
            <button
              aria-label="Close menu"
              className="mb-4 text-xl hover:text-gray-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <ul className="space-y-2">
              <li>
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleMenuAction(onHome)}
                  aria-label="Go to home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleMenuAction(onTutorial)}
                  aria-label="Open tutorial"
                >
                  Tutorial
                </button>
              </li>
              <li>
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleMenuAction(onSettings)}
                  aria-label="Open settings"
                >
                  Settings
                </button>
              </li>
              <li>
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleMenuAction(onRestart)}
                  aria-label="Restart story"
                >
                  Restart Story
                </button>
              </li>
              <li>
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleMenuAction(onToggleVariables)}
                  aria-label="Toggle variables dashboard"
                >
                  Variables
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
