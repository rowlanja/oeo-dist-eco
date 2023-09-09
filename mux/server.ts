import {Express, Request, Response} from "express";
import express from "express";
import { createVc } from "./app/create-and-sign-vc"

const asyncMiddleware = fn =>
(req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

export class Server {

    private app: Express;

    constructor(app: Express) {
        this.app = app;
        this.app.use(express.json({
            type: ['application/json', 'text/plain']
        }))
        this.app.get("/api", (req: Request, res: Response): void => {
            console.log('called api')
            res.send("You have reached the API!");
        })

        this.app.post("/create", asyncMiddleware(async(req: Request, res: Response) => {
            console.log('receiving data ...');
            let sk = req.body['sk']
            console.log('sk is ', sk);
            let vc = await createVc(sk)

            res.send(JSON.stringify({vc: vc}));
        }))
        
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}