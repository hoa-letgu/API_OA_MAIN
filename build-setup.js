const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Copy .env to dist
fs.copyFileSync('.env', 'dist/.env');

// Create production environment file
const prodEnv = `PORT=${process.env.PORT || 3000}
MONGODB_URI=mongodb://localhost:27017/api_oa
JWT_SECRET=${require('crypto').randomBytes(64).toString('hex')}
JWT_EXPIRES_IN=7d
NODE_ENV=production`;

fs.writeFileSync('dist/.env.production', prodEnv);

console.log('Build setup completed!');