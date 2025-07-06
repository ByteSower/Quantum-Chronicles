// SideMenu Accessibility Test Script
// Run this in the browser console to verify SideMenu functionality

console.log('🧪 Starting SideMenu Accessibility Test...');

// Test 1: Check if hamburger button exists and has proper ARIA attributes
const hamburgerButton = document.querySelector('button[aria-label="Open menu"]');
console.log('✅ Hamburger button found:', !!hamburgerButton);
console.log('✅ Has aria-label:', hamburgerButton?.getAttribute('aria-label'));
console.log('✅ Has aria-expanded:', hamburgerButton?.hasAttribute('aria-expanded'));

// Test 2: Click hamburger to open menu
if (hamburgerButton) {
  console.log('🔄 Clicking hamburger button...');
  hamburgerButton.click();
  
  setTimeout(() => {
    // Test 3: Check if menu opened
    const menu = document.querySelector('nav[aria-label="Main navigation"]');
    console.log('✅ Menu opened:', !!menu);
    
    if (menu) {
      // Test 4: Check menu items
      const menuItems = menu.querySelectorAll('button');
      console.log('✅ Menu items found:', menuItems.length);
      
      menuItems.forEach((item, index) => {
        console.log(`   Item ${index + 1}: ${item.textContent} - aria-label: ${item.getAttribute('aria-label')}`);
      });
      
      // Test 5: Check focus management
      const activeElement = document.activeElement;
      console.log('✅ Focus on first menu item:', activeElement?.textContent?.trim() === 'Home');
      
      // Test 6: Test escape key
      console.log('🔄 Testing escape key...');
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      setTimeout(() => {
        const menuAfterEscape = document.querySelector('nav[aria-label="Main navigation"]');
        console.log('✅ Menu closed after escape:', !menuAfterEscape);
        console.log('✅ Focus returned to hamburger:', document.activeElement === hamburgerButton);
        
        console.log('🎉 SideMenu accessibility test completed!');
      }, 100);
    }
  }, 100);
}

// Test helper functions
window.testSideMenuCallbacks = function() {
  console.log('🧪 Testing SideMenu Callbacks...');
  
  const hamburger = document.querySelector('button[aria-label="Open menu"]');
  if (hamburger) {
    hamburger.click();
    
    setTimeout(() => {
      const menuItems = document.querySelectorAll('nav[aria-label="Main navigation"] button');
      
      menuItems.forEach((item, index) => {
        if (item.textContent?.trim() !== '✕') {
          console.log(`🔄 Testing: ${item.textContent?.trim()}`);
          // We won't actually click to avoid disrupting the story state
          // But we can verify the click handlers exist
          console.log(`   Has onClick: ${item.onclick !== null || item.getAttribute('onclick') !== null}`);
        }
      });
      
      // Close menu
      document.querySelector('button[aria-label="Close menu"]')?.click();
    }, 100);
  }
};

console.log('💡 Run testSideMenuCallbacks() to test callback functionality');
