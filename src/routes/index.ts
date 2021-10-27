import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json('Hello, world!'));

export default router;
