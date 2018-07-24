import { Router } from 'express';

import * as GlobeController from './controller';

const router = Router();

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/get-token', GlobeController.getToken);

export default router;
