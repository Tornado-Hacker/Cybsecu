const { spawn } = require('child_process');

// Start the server
const server = spawn('npx', ['tsx', 'watch', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '3001' }
});

// Start the client (Vite dev server)
const client = spawn('npx', ['vite', '--port', '3000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: './client'
});

console.log('Starting Cybersecurity Portfolio...');
console.log('Frontend: http://localhost:3000');
console.log('Backend: http://localhost:3001');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  server.kill();
  client.kill();
  process.exit();
});