import { Router } from 'express';

import * as LaptopController from './controller';

const router = Router();

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/get-laptops-by-range', LaptopController.findByRange);
router.get('/get-laptops-by-budget', LaptopController.findByBudget);
router.post('/add-laptop', LaptopController.addLaptop);
router.delete('/clear-laptops', LaptopController.clearLaptops);

export default router;