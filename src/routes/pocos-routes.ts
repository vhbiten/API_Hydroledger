import { Router } from "express"
import { PocosController } from "@/controllers/pocos-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const pocosRoutes = Router()
const pocosController = new PocosController()

pocosRoutes.use(ensureAuthenticated)
pocosRoutes.post("/", verifyUserAuthorization(["editor", "querier"]), pocosController.create)
pocosRoutes.get("/index", verifyUserAuthorization(["editor"]), pocosController.index)
pocosRoutes.put("/update/:id", verifyUserAuthorization(["editor"]), pocosController.update)
pocosRoutes.delete("/delete/:id", verifyUserAuthorization(["editor"]), pocosController.remove)

export { pocosRoutes }
