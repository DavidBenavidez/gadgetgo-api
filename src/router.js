import { Router } from 'express';
import phoneRouter from './entities/phone/router';

const router = Router();

router.use(phoneRouter);

export default router;
