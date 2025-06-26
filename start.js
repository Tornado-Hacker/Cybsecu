const { spawn } = require('child_process');

// Start the development server
const dev = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

dev.on('error', (error) => {
  console.error('Failed to start development server:', error);
});

dev.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
});