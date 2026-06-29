import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("funcionando perfeitamente")
})


export default router;