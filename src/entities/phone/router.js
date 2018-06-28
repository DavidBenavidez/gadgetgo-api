import { Router } from 'express';

import * as PhoneController from './controller';
import Phone from './model';

const router = Router();

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/get-phones-by-camera', PhoneController.findByCamera);
router.get('/get-phones-by-budget', PhoneController.findByBudget);
router.get('/get-phones-by-display', PhoneController.findByDisplay);
router.get('/get-phones-by-battery', PhoneController.findByBattery);
router.post('/add-phones', PhoneController.addPhones);
router.delete('/clear-phones', PhoneController.clearPhones);

export default router;

// budget, range, brand, functionality