import express from 'express';
import {signup,userLogin} from '../controller/userController'

const router = express.Router();

router.post('/signup',signup);
router.post('/login',userLogin);




export default router;