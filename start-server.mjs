import Server from './src/server.mjs';

(async () => {
  try {
    const s = new Server();
    await s.run();
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
