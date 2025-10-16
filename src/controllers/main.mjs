import randomService from '../services/random.mjs';

const MainController = class MainController {
  constructor(app) {
    this.app = app;
    this.run();
  }

  run() {
    this.app.get('/main', async (req, res) => {
      try {
        const data = await randomService.getAll();
        res.status(200).json(data);
      } catch (err) {
        console.error('[ERROR] /main ->', err);
        res.status(500).json({ code: 500, message: 'Internal Server Error' });
      }
    });
  }
};

export default MainController;
