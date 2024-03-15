import { Router } from 'express'

import { healthcheck } from '../controllers/healthcheck'

const router = Router().get('/', healthcheck)

export default router
