import { Router } from 'express';

import * as MouseController from './controller';

const router = Router();

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/get-mice-by-range', MouseController.findByRange);
router.get('/get-mice-by-budget', MouseController.findByBudget);
router.post('/add-mouse', MouseController.addMouse);
router.delete('/clear-mice', MouseController.clearMice);

export default router;