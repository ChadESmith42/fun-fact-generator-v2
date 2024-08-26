import { Router, Request, Response } from 'express';
import { config } from 'dotenv';
import { ensureJwt } from '../modules/ensure-jwt.module';
import { UserByIdResponse } from '../models/user-by-id-response.model';
import { createNewUser, editUser, getUser, login } from '../modules/user.module';
import { EditUser } from '../models/edit-user.model';
import { RegisterUser, RegisterUserResponse } from '../models/register-user.model';
import { encryptPassword } from '../modules/encryption.module';
import { Login } from '../models/login.model';

// dotenv configuration
config();

const userRouter: Router = Router();

const oneHour = 1000 * 60 * 60;

// GET /users/:id
userRouter.get('/:id', ensureJwt, async(req: Request, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    const user: UserByIdResponse = await getUser(id);
    if(user.user) {
        res.send(user.user);    
    } else {
        res.status(404).send(user.error);
    }
    res.end();
});

// PUT /users/:id
userRouter.put('/:id', ensureJwt, async(req: any, res: Response): Promise<any> => {
    const id = parseInt(req.params.id);
    const editedUser: EditUser = req.body;
    const user: UserByIdResponse = await editUser(editedUser, id, req.token);
    if(user.user) {
      res.send(user.user);
    } else {
      res.status(404).send(user.error);
    }
  });
  
  // POST /register
  userRouter.post("/register", async (req: Request, res: Response): Promise<any> => {
    const user: RegisterUser = { ...req.body};
    user.password = encryptPassword(req.body.password);
    const newUser: RegisterUserResponse = await createNewUser(user);
    if (newUser.user) {
      const { password, ...safeUser } = newUser.user;
      res.send(safeUser);
    } else {
      res.status(500).send(newUser.error);
    }
    res.end();
  });
  
  // POST /login
  userRouter.post('/login', async (req: Request, res: Response): Promise<any> => {
    console.log('login');  
    const credentials: Login = { ...req.body };
    console.info('credentials', credentials);
    const { token, user, error } = await login(credentials);
    console.info('token', token);
    console.info('user', user);
    console.info('error', error);
    if(token) {
        res.setHeader('Authorization', `bearer ${token}`);
        res.send(user).status(200);
    } else {
        res.status(401).send(`${error}`);
    }
    res.end();
  });
  

export default userRouter;