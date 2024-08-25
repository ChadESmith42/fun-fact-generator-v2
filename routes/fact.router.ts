import { Request, Response, Router } from 'express';
import { getFactoid, saveFactoid, updateFactoidVote } from '../modules/fact.module';
import { Factoid } from '../models/factoid.model';

const factRouter = Router();

function isFactoid(obj: any): obj is Factoid {
    return obj && typeof obj === 'object' && 'id' in obj && 'factoid' in obj && 'createdDate' in obj && 'votes' in obj;
}

factRouter.get('/', async (req: Request, res: Response) => {
    console.log('Fact requested!');
    const fact = { message: getFactoid() };
    res.send(fact).status(200);
});

factRouter.post('/', async (req: Request, res: Response) => {
    try {
        const fact:Factoid = req.body;
        console.log(fact);
        if(fact.votes) {
            const result = await updateFactoidVote(fact, fact.votes === 1 ? 1 : -1);
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
        res.status(500).json({ error: error.message });
    }
});




export default factRouter;