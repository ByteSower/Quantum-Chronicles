// Accessibility utilities for Quantum Chronicles
// Enhanced ARIA support, keyboard navigation, and focus management

export interface AccessibilityConfig {
  enableScreenReaderAnnouncements: boolean;
  enableKeyboardNavigation: boolean;
  enableFocusTrapping: boolean;
  announceContentChanges: boolean;
}

class AccessibilityManager {
  private config: AccessibilityConfig = {
    enableScreenReaderAnnouncements: true,
    enableKeyboardNavigation: true,
    enableFocusTrapping: true,
    announceContentChanges: true,
  };

  private announcer: HTMLElement | null = null;

  constructor() {
    this.initializeAnnouncer();
    this.setupKeyboardNavigation();
  }

  // Create a live region for screen reader announcements
  private initializeAnnouncer() {
    if (typeof window === 'undefined') return;

    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.setAttribute('class', 'sr-only');
    this.announcer.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(this.announcer);
  }

  // Announce content to screen readers
  public announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.config.enableScreenReaderAnnouncements || !this.announcer) return;

    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = message;

    // Clear after announcement to avoid repetition
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }

  // Set up global keyboard navigation
  private setupKeyboardNavigation() {
    if (typeof window === 'undefined' || !this.config.enableKeyboardNavigation) return;

    document.addEventListener('keydown', (event) => {
      // Skip navigation if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'Escape':
          this.closeTopModal();
          break;
        case 'Tab':
          // Let browser handle tab navigation but ensure focus visibility
          this.ensureFocusVisibility();
          break;
      }
    });
  }

  // Close the topmost modal when Escape is pressed
  private closeTopModal() {
    const modals = document.querySelectorAll('[role="dialog"], .modal, [data-modal]');
    const topModal = Array.from(modals).pop() as HTMLElement;
    
    if (topModal) {
      const closeButton = topModal.querySelector('[data-close], .close, [aria-label*="close" i]') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  }

  // Ensure focus is visible when navigating with keyboard
  private ensureFocusVisibility() {
    document.body.classList.add('keyboard-navigation');
  }

  // Focus management for modals and overlays
  public trapFocus(container: HTMLElement, initialFocus?: HTMLElement) {
    if (!this.config.enableFocusTrapping) return () => {};

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus initial element or first focusable element
    const elementToFocus = initialFocus || firstFocusable;
    if (elementToFocus) {
      elementToFocus.focus();
    }

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab (backwards)
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab (forwards)
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  // Announce content changes for dynamic content
  public announceContentChange(type: 'story' | 'choice' | 'variable' | 'navigation', content: string) {
    if (!this.config.announceContentChanges) return;

    const messages = {
      story: `New story content: ${content.slice(0, 100)}${content.length > 100 ? '...' : ''}`,
      choice: `New choice available: ${content}`,
      variable: `Variable updated: ${content}`,
      navigation: `Navigation: ${content}`,
    };

    this.announce(messages[type]);
  }

  // Add ARIA labels to dynamic elements
  public enhanceElement(element: HTMLElement, options: {
    label?: string;
    description?: string;
    role?: string;
    expanded?: boolean;
    pressed?: boolean;
    current?: string;
  }) {
    if (options.label) {
      element.setAttribute('aria-label', options.label);
    }
    if (options.description) {
      element.setAttribute('aria-describedby', options.description);
    }
    if (options.role) {
      element.setAttribute('role', options.role);
    }
    if (options.expanded !== undefined) {
      element.setAttribute('aria-expanded', String(options.expanded));
    }
    if (options.pressed !== undefined) {
      element.setAttribute('aria-pressed', String(options.pressed));
    }
    if (options.current) {
      element.setAttribute('aria-current', options.current);
    }
  }

  // Configure accessibility settings
  public updateConfig(newConfig: Partial<AccessibilityConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}

// Export singleton instance
export const accessibilityManager = new AccessibilityManager();

// Utility functions for common accessibility patterns
export const a11y = {
  // Create unique IDs for ARIA relationships
  generateId: (prefix: string = 'qnce') => 
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Check if user prefers reduced motion
  prefersReducedMotion: () => 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  // Get appropriate ARIA label for choice buttons
  getChoiceLabel: (choiceText: string, index: number, isAvailable: boolean) => {
    const status = isAvailable ? 'available' : 'locked';
    return `Choice ${index + 1}: ${choiceText}. Status: ${status}`;
  },

  // Get ARIA label for variable displays
  getVariableLabel: (name: string, value: number, change?: number) => {
    const changeText = change ? `, ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}` : '';
    return `${name}: ${value}${changeText}`;
  },

  // Create keyboard event handler for button-like elements
  handleButtonKey: (callback: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  },
};

export default accessibilityManager;
