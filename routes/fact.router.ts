import { Request, Response, Router } from 'express';
import { getFactoid, getNewestFactoids, getPopularFactoids, saveFactoid, updateFactoidVote } from '../modules/fact.module';
import { Factoid } from '../models/factoid.model';

const factRouter = Router();

function isFactoid(obj: any): obj is Factoid {
    return obj && typeof obj === 'object' && 'id' in obj && 'factoid' in obj && 'createdDate' in obj && 'votes' in obj;
}

factRouter.get('/', async (req: Request, res: Response) => {
    const fact = { message: getFactoid() };
    res.send(fact).status(200);
});

factRouter.post('/', async (req: Request, res: Response) => {
    try {
        const fact: Factoid = req.body;

        if (fact.vote) {
            const result = await updateFactoidVote(fact, fact.vote);
            return result ? res.send(result) : res.status(500).send('Could not update fact.');
        }

        const saved: Factoid | unknown = await saveFactoid(fact);

        if (isFactoid(saved)) {
            res.status(204).send();
        } else {
            const result = await updateFactoidVote(fact, 1);
            return result ? res.send(result) : res.status(500).send('Could not update fact.');
        }
    } catch (error: any) {
        console.error('Error in factRouter.post:', error);
        res.status(500).json({ error: error.message });
    }
});

factRouter.get('/popular', async (req: Request, res: Response) => {
    const queryLimit = parseInt(req.query.queryLimit as string) || 100;
    try {
        const popular = await getPopularFactoids(queryLimit);
        if(popular?.length && popular.length > 0) {
            res.send(popular);
        } else {
            res.status(500).send('Could not get popular facts.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get popular facts.');
    }
});

factRouter.get('/latest', async (req: Request, res: Response) => {
    const queryLimit = parseInt(req.query.queryLimit as string) || 100;
    try {
        const newest = await getNewestFactoids(queryLimit);
        if(newest?.length && newest.length > 0) {
            res.send(newest);
        } else {
            res.status(500).send('Could not get newest facts.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not get newest facts.');
    }
});

export default factRouter;