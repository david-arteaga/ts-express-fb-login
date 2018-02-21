import { Router } from 'express';

export abstract class BaseRouter {
  router: Router
  constructor() {
    this.router = Router()
    this.init()
  }

  // set the router this router will handle
  protected abstract init(): void
}
