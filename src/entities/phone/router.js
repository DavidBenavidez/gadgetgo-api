import { Router } from 'express';

import * as PhoneController from './controller';

const router = Router();

router.get('/get-phones-by-camera', PhoneController.findByCamera);
router.get('/get-phones-by-budget', PhoneController.findByBudget);
router.get('/get-phones-by-display', PhoneController.findByDisplay);
router.get('/get-phones-by-battery', PhoneController.findByBattery);
router.post('/add-phones', PhoneController.addPhones);
router.delete('/clear-phones', PhoneController.clearPhones);

export default router;
