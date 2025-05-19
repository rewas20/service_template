const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.log('❌ Please provide a repository name');
  process.exit(1);
}

const dirPath = path.join(__dirname, '../repositories'); // Assuming 'repositories' is under 'src'
const repoPath = path.join(dirPath, `${name}.repository.js`);
const className = `${name.charAt(0).toUpperCase() + name.slice(1)}Repository`;

const content = `class ${className} {
  // Implement repository methods
}

module.exports = new ${className}();`;

// Create directory if not exists
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Create file only if it doesn't exist
if (fs.existsSync(repoPath)) {
  console.log(`⚠️ Repository '${name}' already exists at ${repoPath}`);
} else {
  fs.writeFileSync(repoPath, content);
  console.log(`✅ Repository '${name}' created at ${repoPath}`);
}
