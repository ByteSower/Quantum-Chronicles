import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('🔍 Running accessibility audit on Quantum Chronicles...');
  
  try {
    // Navigate to the application
    await page.goto('http://localhost:5173/Quantum-Chronicles/');
    
    // Wait for the app to load
    await page.waitForSelector('body', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('📱 Testing main interface...');
    
    // Run axe accessibility tests
    const results = await new AxePuppeteer(page).analyze();
    
    console.log('\n📊 Accessibility Audit Results:');
    console.log('================================');
    
    if (results.violations.length === 0) {
      console.log('✅ No accessibility violations found!');
    } else {
      console.log(`❌ Found ${results.violations.length} accessibility issues:`);
      
      results.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id} - ${violation.impact}`);
        console.log(`   Description: ${violation.description}`);
        console.log(`   Help: ${violation.help}`);
        console.log(`   Nodes affected: ${violation.nodes.length}`);
        
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   - Node ${nodeIndex + 1}: ${node.target.join(', ')}`);
          if (node.failureSummary) {
            console.log(`     Issue: ${node.failureSummary}`);
          }
        });
      });
    }
    
    // Test with different states
    console.log('\n🎯 Testing story interaction...');
    
    let resultsAfterInteraction = null;
    
    try {
      // Wait for intro modal to appear and close it
      await page.waitForSelector('.modal, [role="dialog"]', { timeout: 5000 });
      
      // Close intro modal if present
      const closeButton = await page.$('button[data-close], .close, [aria-label*="close" i]');
      if (closeButton) {
        await closeButton.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Test choice interaction
      const choiceButton = await page.$('.choice-button');
      if (choiceButton) {
        console.log('✅ Choice buttons found');
        // Test keyboard navigation
        await choiceButton.focus();
        await page.keyboard.press('Tab');
        console.log('✅ Keyboard navigation tested');
      }
      
      // Run another accessibility test after interaction
      resultsAfterInteraction = await new AxePuppeteer(page).analyze();
      
      console.log('\n📊 Post-interaction Accessibility Results:');
      console.log('==========================================');
      
      if (resultsAfterInteraction.violations.length === 0) {
        console.log('✅ No accessibility violations found after interaction!');
      } else {
        console.log(`❌ Found ${resultsAfterInteraction.violations.length} accessibility issues after interaction`);
      }
      
    } catch (error) {
      console.log('⚠️  Could not test interactions:', error.message);
    }
    
    console.log('\n📈 Summary:');
    console.log(`- Initial violations: ${results.violations.length}`);
    console.log(`- Post-interaction violations: ${resultsAfterInteraction?.violations?.length || 'N/A'}`);
    
    if (results.passes) {
      console.log(`- Successful accessibility checks: ${results.passes.length}`);
    }
    
  } catch (error) {
    console.error('❌ Failed to run accessibility test:', error.message);
  } finally {
    await browser.close();
    console.log('\n🏁 Accessibility audit complete!');
  }
})().catch(console.error);
