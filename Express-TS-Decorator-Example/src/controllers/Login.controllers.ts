import { Request, Response } from "express";
import { routerConfig, get, post, bodyValidator } from "../decorators";

const loginHTML = `
  <form method="POST">
  <div>
    <label>Email</label>
    <input name="email" />
  </div>
  <div>
    <label>Password</label>
    <input name= "password" type="Password" />
  </div>
  <div>
    <button>Submit</button>
  </div>
  </form>
`;

const emptyHTML = `
  <h1>
    Hey Input it correctly please!
  </h1>
`;

const invalidPasswordHTML = `
  <h1>
    Invalid email or password
  </h1>
`;

@routerConfig('/auth')
class LoginControllers {

  @get('/login')
  getLogin(req: Request, res: Response) {
    res.send(loginHTML);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const {email, password} = req.body;

    if (!email || !password) {
      res.send(emptyHTML);
      return;
    };

    if (email !== 'test@test.com' && password !== '123') {
      res.send(invalidPasswordHTML);
      return;
    };

    req.session = {loggedIn : true}
    res.redirect('/');
  };

  @get('/logout')
  postLogout(req: Request, res: Response) {
    if (req.session) {
      req.session.loggedIn = false;
      res.redirect('/');
    };
  };

};