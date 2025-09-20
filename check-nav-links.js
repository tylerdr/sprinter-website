const navConfig = {
  main: [
    // Solutions
    "/operating-partner",
    "/solutions/ap-automation",
    "/solutions/quote-intelligence",
    "/solutions/3pl-ops",
    "/partnership",
    "/pe-services",
    "/operating-partner#workshop",
    "/operating-partner#pilot",
    "/operating-partner#scoreboard",
    "/use-cases",
    "/use-cases/industries",
    "/use-cases/roles",
    
    // Results
    "/case-studies",
    "/labs/roi-calculator",
    "/downloads/no-api-cookbook",
    
    // Approach
    "/approach",
    "/approach/wedge",
    "/approach#four-pillars",
    "/approach#change-playbook",
    
    // Industries
    "/industries/private-equity",
    "/industries/healthcare",
    "/industries/financial-services",
    "/industries/manufacturing",
    "/industries/logistics",
    "/industries",
    
    // Resources
    "/labs",
    "/tools",
    "/ai-assessment",
    "/blog",
    "/downloads/governance-pack",
    "/education",
    "/education#executive",
    "/education#portfolio",
    
    // CTA
    "/contact"
  ]
};

const fs = require('fs');
const path = require('path');

console.log("Checking navigation links...\n");

const appDir = path.join(__dirname, 'app');
const missingPages = [];
const existingPages = [];

navConfig.main.forEach(link => {
  // Remove hash fragments for file checking
  const cleanLink = link.split('#')[0];
  
  // Check for page existence
  const possiblePaths = [
    path.join(appDir, cleanLink, 'page.tsx'),
    path.join(appDir, cleanLink, 'page.js'),
    path.join(appDir, cleanLink + '.tsx'),
    path.join(appDir, cleanLink + '.js'),
  ];
  
  const exists = possiblePaths.some(p => fs.existsSync(p));
  
  if (exists || link.includes('#')) {
    existingPages.push(link);
  } else {
    missingPages.push(link);
  }
});

console.log(`✅ Existing pages (${existingPages.length}):`);
existingPages.forEach(p => console.log(`   ${p}`));

console.log(`\n❌ Missing pages (${missingPages.length}):`);
missingPages.forEach(p => console.log(`   ${p}`));

console.log(`\nTotal: ${existingPages.length}/${navConfig.main.length} pages exist`);
