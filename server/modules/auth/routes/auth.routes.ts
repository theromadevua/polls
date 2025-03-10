import { Router} from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();

router.post('/registration', AuthController.register);
router.post('/login', AuthController.login.bind(AuthController));
router.post('/refresh', AuthController.refresh.bind(AuthController));
router.delete('/logout', AuthController.logout.bind(AuthController));
router.post('/updateUser', authMiddleware, AuthController.updateUser)
export const authRouter = router;
