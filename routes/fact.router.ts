import { Request, Response, Router } from 'express';

const factRouter = Router();

factRouter.get('/', async (req: Request, res: Response) => {
    console.log('Fact requested!');
    const fact = 'I craft gluten-free postcards.';
    res.send(fact).status(200);
});

export default factRouter;