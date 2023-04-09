import { routerConfig, get, use } from "../decorators";
import { Request,  Response} from "express";
import { requireAuth } from "../utils/requireAuth";

const secretHTML = `
  <h1>
    You are logged in User! This is a secret page
  </h1>
`;

@routerConfig('')
class Secret {

  @get('/secret')
  @use(requireAuth)
  getSecret(req: Request, res: Response){
    res.send(secretHTML);
  };
};