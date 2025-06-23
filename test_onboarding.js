// Test script to verify onboarding flow
console.log('Testing onboarding flow...');

// Clear localStorage to simulate first-time user
localStorage.removeItem('qnce_onboarding_completed');
console.log('Cleared onboarding flag - user will see guided tour');

// Reload to trigger first-time user experience
window.location.reload();
