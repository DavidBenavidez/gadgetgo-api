import { Router } from 'express';
import phoneRouter from './entities/phone/router';
import laptopRouter from './entities/laptop/router';
import mouseRouter from './entities/mouse/router';
import headphoneRouter from './entities/headphone/router';

const router = Router();

router.use(phoneRouter);
router.use(laptopRouter);
router.use(mouseRouter);
router.use(headphoneRouter);

export default router;