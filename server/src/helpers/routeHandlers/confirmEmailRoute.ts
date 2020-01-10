import expressAsyncHandler = require("express-async-handler");
import { MyContext } from "../../ts/context";
import { nodeLogger } from "../helpers";

export const confirmEmailRoute = expressAsyncHandler(async (req: MyContext['req'], res, next) => {
  // http://test.worksoft.systems/account/confirm/USER_ID

  nodeLogger(req.params)
  nodeLogger("THIS IS A LOG")

  res.send('thanks')
})