const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.log('❌ Please provide a middleware name');
  process.exit(1);
}

const fileName = `${name}.js`;
const filePath = path.join(__dirname, `..middleware/${fileName}`);
const content = `module.exports = (req, res, next) => {
  // TODO: Implement ${name} middleware
  next();
};`;

fs.writeFileSync(filePath, content);
console.log(`✅ Middleware '${name}' created at ${filePath}`);
