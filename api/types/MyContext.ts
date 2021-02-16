import { Request, Response } from 'express'

export interface MyContext {
  req: Request
  res: Response
}

/* Next: We create a middleware fuction isAuth */
