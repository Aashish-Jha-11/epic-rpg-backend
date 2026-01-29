import { Router, Request, Response } from 'express';

export class UserRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }
  protected registerRoutes(): void {
    this.router.get('/', this.test);
  }

  private test(req: Request, res: Response): void {
    res.status(200).send('Meow');
  }
}