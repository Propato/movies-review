import cors from "cors";
import express, { Application, Request, Response } from "express";
import ip from "ip";
import { Code } from "./enums/code.enum";
import { Status } from "./enums/status.enum";
import { HttpResponse } from "./services/response.http";
import { userRoutes , reviewRoutes, listRoutes, showRoutes } from "./routes/";

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'Application is running on:';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 8000){
        this.app = express();
        this.middleWare();
        this.routes();
    }
    
    listen(): void {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
    }

    private middleWare(): void {
        this.app.use(cors({ origin:'*'}));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/users', userRoutes);
        this.app.use('/list', listRoutes);
        this.app.use('/reviews', reviewRoutes);
        // this.app.use('/shows', showRoutes);

        this.app.get('/', (req: Request, res: Response) => {
            res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the Backend API of the Movies Reviews App'))
        });
        this.app.all('*', (req: Request, res: Response) => {
            res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND))
        });
    }
}