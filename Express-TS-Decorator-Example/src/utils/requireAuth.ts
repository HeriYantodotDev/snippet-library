import { Request, Response, NextFunction } from "express";

const authNeededHTML = `
  Sorry! You ahve to log in first!!!!
`;

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  };

  res.status(403).send(authNeededHTML);
  return;
}