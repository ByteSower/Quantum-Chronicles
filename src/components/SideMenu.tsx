import { useState, useEffect, useRef } from 'react';
import { trackSideMenuEvent } from '../utils/analytics';

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
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleMenuAction = (action?: () => void, destination?: string) => {
    if (destination) {
      trackSideMenuEvent.navigate(destination);
    }
    if (action) action();
    setOpen(false); // Close menu after action
    trackSideMenuEvent.close();
  };

  const toggleMenu = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    if (newOpenState) {
      trackSideMenuEvent.open();
    } else {
      trackSideMenuEvent.close();
    }
  };

  // Handle escape key and click outside
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trackSideMenuEvent.close();
        trackSideMenuEvent.keyboardNavigation('escape_close');
        buttonRef.current?.focus(); // Return focus to hamburger button
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        trackSideMenuEvent.close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open && menuRef.current) {
      // Focus the first menu item when opened
      const firstMenuItem = menuRef.current.querySelector('button');
      firstMenuItem?.focus();
    }
  }, [open]);
  
  return (
    <>
      <button
        ref={buttonRef}
        aria-label="Open menu"
        aria-expanded={open}
        className="p-2 fixed top-4 right-4 z-50 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        onClick={toggleMenu}
      >
        ☰
      </button>
      {open && (
        <nav 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-label="Main navigation"
        >
          <div 
            ref={menuRef}
            className="w-64 bg-white h-full shadow-lg p-4 transform transition-transform"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              aria-label="Close menu"
              className="mb-4 text-xl hover:text-gray-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <ul className="space-y-2" role="list">
              <li role="listitem">
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleMenuAction(onHome, 'home')}
                  aria-label="Go to home"
                >
                  Home
                </button>
              </li>
              <li role="listitem">
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleMenuAction(onTutorial, 'tutorial')}
                  aria-label="Open tutorial"
                >
                  Tutorial
                </button>
              </li>
              <li role="listitem">
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleMenuAction(onSettings, 'settings')}
                  aria-label="Open settings"
                >
                  Settings
                </button>
              </li>
              <li role="listitem">
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleMenuAction(onRestart, 'restart_story')}
                  aria-label="Restart story"
                >
                  Restart Story
                </button>
              </li>
              <li role="listitem">
                <button 
                  className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleMenuAction(onToggleVariables, 'variables')}
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
