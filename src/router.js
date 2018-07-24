import { Router } from 'express';
import phoneRouter from './entities/phone/router';
import globeRouter from './entities/globe/router';

const router = Router();

router.use(phoneRouter);
router.use(globeRouter);

export default router;
