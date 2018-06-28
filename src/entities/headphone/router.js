import { Router } from 'express';

import * as HeadphoneController from './controller';

const router = Router();

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/get-headphones-by-range', HeadphoneController.findByRange);
router.get('/get-headphones-by-budget', HeadphoneController.findByBudget);
router.post('/add-headphone', HeadphoneController.addHeadphone);
router.delete('/clear-headphones', HeadphoneController.clearHeadphones);

export default router;