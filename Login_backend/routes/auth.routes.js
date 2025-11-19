import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/role.middleware.js';

import { body }  from 'express-validator';

const router = express.Router();

import { login, getUserAll, createUser, updateUserbyId, deleteUserbyId, getUserById, getDashboard, requestPasswordReset, resetPassword, verifyEmail } from '../controllers/auth.controllers.js'
console.log("CARGANDO RUTAS .... ")

router.get("/", (req, res) => {
    res.send("Raiz de la web")
})

router.get("/seguridad", (req, res) => {
    res.send("Desde el LOGIN API/SEGURIDAD")
})

router.get('/usuarios', getUserAll)

router.post('/login', 
  body('email').isEmail(),
  body('password').notEmpty(),
  login)

router.post('/register', 
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña mínima de 6 caracteres'),
  body('telefono').optional().isMobilePhone().withMessage('Número de teléfono inválido'), 
  createUser)

router.put('/actualiza/:id', updateUserbyId)
router.delete('/eliminar/:id', deleteUserbyId)
router.get('/usuarios/:id', getUserById)


router.get('/dashboard', authMiddleware, (req, res) => {
  console.log("UserID en dashboard:", req.userId);    
  res.send(`Bienvenido usuario ${req.userId}`);
});

router.get('/reporte', authMiddleware, getDashboard)

router.get('/admin', authMiddleware, roleMiddleware(['admin', 'user']), (req, res) => {
  res.send(`Bienvenido al panel de administrador, usuario ${req.userId}`);
}); 

router.post('/request-reset', requestPasswordReset);

router.post('/reset-password/:token',
  body('password').isLength({ min: 6 }),
  resetPassword);

router.get('/verify/:token', verifyEmail);

export default router;
