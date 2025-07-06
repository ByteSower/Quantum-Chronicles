#!/usr/bin/env node

/**
 * Security Validation Test for QNCE
 * Tests for HTML injection vulnerabilities and unsafe practices
 */

const fs = require('fs');
const path = require('path');

console.log('🔐 QNCE Security Validation Test\n');

// Test patterns that should NOT be found in the codebase
const unsafePatterns = [
  {
    pattern: /dangerouslySetInnerHTML/g,
    description: 'dangerouslySetInnerHTML usage (React XSS vector)',
    severity: 'HIGH'
  },
  {
    pattern: /innerHTML\s*=/g,
    description: 'Direct innerHTML assignment',
    severity: 'HIGH'
  },
  {
    pattern: /eval\s*\(/g,
    description: 'eval() function usage',
    severity: 'CRITICAL'
  },
  {
    pattern: /document\.write/g,
    description: 'document.write usage',
    severity: 'HIGH'
  },
  {
    pattern: /window\.eval/g,
    description: 'window.eval usage',
    severity: 'CRITICAL'
  },
  {
    pattern: /google-analytics\.com/g,
    description: 'Google Analytics tracking (policy violation)',
    severity: 'CRITICAL'
  },
  {
    pattern: /gtag\(/g,
    description: 'Google Tag Manager usage',
    severity: 'HIGH'
  }
];

// Files and directories to scan
const scanPaths = [
  'src',
  'index.html',
  'docs/index.html'
];

let totalIssues = 0;
let criticalIssues = 0;

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    unsafePatterns.forEach(({ pattern, description, severity }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          pattern: pattern.source,
          description,
          severity,
          count: matches.length,
          matches: matches.slice(0, 3) // Show first 3 matches
        });
        
        totalIssues++;
        if (severity === 'CRITICAL') {
          criticalIssues++;
        }
      }
    });
    
    return issues;
  } catch (error) {
    console.warn(`⚠️  Could not read file: ${filePath}`);
    return [];
  }
}

function scanDirectory(dirPath) {
  const results = {};
  
  function scanRecursive(currentPath) {
    const stats = fs.statSync(currentPath);
    
    if (stats.isDirectory()) {
      // Skip node_modules and other build directories
      const dirName = path.basename(currentPath);
      if (['node_modules', '.git', 'dist', 'build', '.next'].includes(dirName)) {
        return;
      }
      
      const items = fs.readdirSync(currentPath);
      items.forEach(item => {
        const itemPath = path.join(currentPath, item);
        scanRecursive(itemPath);
      });
    } else if (stats.isFile()) {
      // Only scan relevant file types
      const ext = path.extname(currentPath).toLowerCase();
      if (['.tsx', '.ts', '.jsx', '.js', '.html', '.htm'].includes(ext)) {
        const issues = scanFile(currentPath);
        if (issues.length > 0) {
          results[currentPath] = issues;
        }
      }
    }
  }
  
  if (fs.existsSync(dirPath)) {
    scanRecursive(dirPath);
  }
  
  return results;
}

// Run the security scan
console.log('📁 Scanning source files...\n');

const allResults = {};

scanPaths.forEach(scanPath => {
  if (fs.existsSync(scanPath)) {
    const stats = fs.statSync(scanPath);
    if (stats.isDirectory()) {
      const dirResults = scanDirectory(scanPath);
      Object.assign(allResults, dirResults);
    } else {
      const issues = scanFile(scanPath);
      if (issues.length > 0) {
        allResults[scanPath] = issues;
      }
    }
  }
});

// Report results
if (Object.keys(allResults).length === 0) {
  console.log('✅ No security issues found!');
  console.log('🎉 All scanned files are clean of unsafe patterns.');
} else {
  console.log('🚨 SECURITY ISSUES FOUND:\n');
  
  Object.entries(allResults).forEach(([filePath, issues]) => {
    console.log(`📄 ${filePath}:`);
    issues.forEach(issue => {
      const severityIcon = issue.severity === 'CRITICAL' ? '🔴' : '🟡';
      console.log(`  ${severityIcon} ${issue.severity}: ${issue.description}`);
      console.log(`     Pattern: ${issue.pattern}`);
      console.log(`     Occurrences: ${issue.count}`);
      if (issue.matches.length > 0) {
        console.log(`     Examples: ${issue.matches.join(', ')}`);
      }
      console.log('');
    });
  });
}

console.log('\n📊 SUMMARY:');
console.log(`🔍 Total issues found: ${totalIssues}`);
console.log(`🔴 Critical issues: ${criticalIssues}`);
console.log(`🟡 High/Medium issues: ${totalIssues - criticalIssues}`);

if (criticalIssues > 0) {
  console.log('\n❌ CRITICAL ISSUES MUST BE RESOLVED BEFORE DEPLOYMENT');
  process.exit(1);
} else if (totalIssues > 0) {
  console.log('\n⚠️  Some issues found but no critical vulnerabilities');
  process.exit(0);
} else {
  console.log('\n✅ Security validation passed!');
  process.exit(0);
}
