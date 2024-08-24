import { Request, Response, Router } from 'express';
import { getFactoid } from '../modules/fact.module';

const factRouter = Router();

factRouter.get('/', async (req: Request, res: Response) => {
    console.log('Fact requested!');
    const fact = { message: getFactoid() };
    res.send(fact).status(200);
});

export default factRouter;