const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.log('❌ Please provide a module name');
  process.exit(1);
}

const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

// Folder paths
const baseDir = path.join(__dirname, '..', 'src');
const modelDir = path.join(baseDir, 'models');
const controllerDir = path.join(baseDir, 'controllers');
const routeDir = path.join(baseDir, 'routes');

// File paths
const modelPath = path.join(modelDir, `${name}.model.js`);
const controllerPath = path.join(controllerDir, `${name}.controller.js`);
const routePath = path.join(routeDir, `${name}.routes.js`);

// Ensure directories exist
[modelDir, controllerDir, routeDir, middlewareDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create Model
if (!fs.existsSync(modelPath)) {
  fs.writeFileSync(modelPath, `// Define ${capitalized} model here`);
  console.log(`✅ Model created: ${modelPath}`);
} else {
  console.log(`⚠️ Model already exists: ${modelPath}`);
}

// Create Controller
if (!fs.existsSync(controllerPath)) {
  fs.writeFileSync(controllerPath, `exports.hello = (req, res) => {
  res.json({ message: "Hello from ${capitalized}" });
};`);
  console.log(`✅ Controller created: ${controllerPath}`);
} else {
  console.log(`⚠️ Controller already exists: ${controllerPath}`);
}

// Create Route
if (!fs.existsSync(routePath)) {
  fs.writeFileSync(routePath, `
const express = require('express');
const router = express.Router();
const controller = require('../controllers/${name}.controller');

router.get('/hello', controller.hello);

module.exports = router;`);
  console.log(`✅ Route created: ${routePath}`);
} else {
  console.log(`⚠️ Route already exists: ${routePath}`);
}
