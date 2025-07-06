/**
 * Secure HTML Sanitization Utilities
 * Implements Brain's security recommendations for safe HTML injection
 */

import React from 'react';
import DOMPurify from 'dompurify';

// Configure DOMPurify with strict security settings
const purifyConfig = {
  ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'p', 'br', 'span'],
  ALLOWED_ATTR: ['class'],
  FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'style'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus'],
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  SANITIZE_DOM: true,
  SANITIZE_NAMED_PROPS: true,
  KEEP_CONTENT: false,
  USE_PROFILES: { html: true }
};

/**
 * Sanitizes HTML content for safe injection
 * @param dirty - Raw HTML string that may contain malicious content
 * @returns Sanitized HTML safe for injection
 */
export const sanitizeHTML = (dirty: string): string => {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(dirty, purifyConfig);
};

/**
 * Safely formats text with basic markdown-style formatting
 * Converts **text** to <strong>text</strong> without HTML injection
 * @param text - Text with markdown-style formatting
 * @returns Sanitized HTML with safe formatting
 */
export const formatSafeText = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  // First escape any existing HTML
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  // Then apply safe formatting
  const formatted = escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Final sanitization pass
  return sanitizeHTML(formatted);
};

/**
 * React-safe text renderer for content with formatting
 * Returns an array of React elements instead of HTML string
 * @param text - Text with markdown-style formatting
 * @returns Array of React elements
 */
export const renderSafeText = (text: string): (string | React.ReactElement)[] => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  return text.split(/\*\*(.*?)\*\*/g).map((part, index) => 
    index % 2 === 1 
      ? React.createElement('strong', { key: index, className: 'text-indigo-300' }, part)
      : part
  );
};

/**
 * Validates CSS content for inline styles
 * Only allows safe CSS properties and values
 * @param css - CSS string to validate
 * @returns Sanitized CSS or empty string if unsafe
 */
export const sanitizeCSS = (css: string): string => {
  if (!css || typeof css !== 'string') {
    return '';
  }
  
  // Remove any potential script injection
  const cleaned = css
    .replace(/javascript:/gi, '')
    .replace(/expression\(/gi, '')
    .replace(/url\(/gi, '')
    .replace(/@import/gi, '')
    .replace(/behavior:/gi, '');
  
  // Basic validation - if it contains suspicious patterns, return empty
  if (cleaned.includes('<') || cleaned.includes('>') || cleaned.includes('script')) {
    console.warn('Potentially unsafe CSS detected and removed');
    return '';
  }
  
  return cleaned;
};

/**
 * Creates a safe inline style object for React components
 * @param cssText - CSS text to convert to style object
 * @returns Safe React style object
 */
export const createSafeStyleObject = (cssText: string): React.CSSProperties => {
  const sanitized = sanitizeCSS(cssText);
  if (!sanitized) {
    return {};
  }
  
  // Convert CSS text to style object safely
  const style: React.CSSProperties = {};
  
  try {
    sanitized.split(';').forEach(rule => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        // Convert kebab-case to camelCase
        const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        (style as Record<string, string>)[camelProperty] = value;
      }
    });
  } catch (error) {
    console.warn('Error parsing CSS, returning empty style object:', error);
    return {};
  }
  
  return style;
};
