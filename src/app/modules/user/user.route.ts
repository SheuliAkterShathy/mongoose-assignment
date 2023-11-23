import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
// router.patch('/:id', userController.updateUser)
// router.delete('/:id', userController.deleteUser)

export const userRoutes = router;
