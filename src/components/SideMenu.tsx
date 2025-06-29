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
        className="p-3 fixed top-4 right-4 z-50 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>
      {open && (
        <nav 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          aria-label="Main navigation"
        >
          <div 
            ref={menuRef}
            className="w-80 bg-gradient-to-b from-slate-900/95 via-indigo-950/95 to-slate-900/95 backdrop-blur-md h-full shadow-2xl border-r border-indigo-500/20 transform transition-all duration-300 ease-out"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="p-6 border-b border-indigo-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Navigation
                </h2>
                <button
                  aria-label="Close menu"
                  className="p-2 text-indigo-300 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3" role="list">
                <li role="listitem">
                  <button 
                    className="w-full text-left p-4 text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-200 focus:bg-gradient-to-r focus:from-indigo-600/20 focus:to-purple-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group border border-transparent hover:border-indigo-500/30"
                    onClick={() => handleMenuAction(onHome, 'home')}
                    aria-label="Go to home"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="font-medium">Home</span>
                    </div>
                  </button>
                </li>
                <li role="listitem">
                  <button 
                    className="w-full text-left p-4 text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-200 focus:bg-gradient-to-r focus:from-indigo-600/20 focus:to-purple-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group border border-transparent hover:border-indigo-500/30"
                    onClick={() => handleMenuAction(onTutorial, 'tutorial')}
                    aria-label="Open tutorial"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="font-medium">Tutorial</span>
                    </div>
                  </button>
                </li>
                <li role="listitem">
                  <button 
                    className="w-full text-left p-4 text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-200 focus:bg-gradient-to-r focus:from-indigo-600/20 focus:to-purple-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group border border-transparent hover:border-indigo-500/30"
                    onClick={() => handleMenuAction(onSettings, 'settings')}
                    aria-label="Open settings"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Settings</span>
                    </div>
                  </button>
                </li>
                <li role="listitem">
                  <button 
                    className="w-full text-left p-4 text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-200 focus:bg-gradient-to-r focus:from-indigo-600/20 focus:to-purple-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group border border-transparent hover:border-indigo-500/30"
                    onClick={() => handleMenuAction(onRestart, 'restart_story')}
                    aria-label="Restart story"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="font-medium">Restart Story</span>
                    </div>
                  </button>
                </li>
                <li role="listitem">
                  <button 
                    className="w-full text-left p-4 text-white hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-200 focus:bg-gradient-to-r focus:from-indigo-600/20 focus:to-purple-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 group border border-transparent hover:border-indigo-500/30"
                    onClick={() => handleMenuAction(onToggleVariables, 'variables')}
                    aria-label="Toggle variables dashboard"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="font-medium">Variables</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
