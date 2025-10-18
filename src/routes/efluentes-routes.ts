import { Router } from "express"
import { EfluentesController } from "@/controllers/efluentes-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const efluentesRoutes = Router()
const efluentesController = new EfluentesController()

efluentesRoutes.use(ensureAuthenticated)
efluentesRoutes.post("/", verifyUserAuthorization(["editor", "querier"]), efluentesController.create)
efluentesRoutes.get("/index", verifyUserAuthorization(["editor"]), efluentesController.index)
efluentesRoutes.put("/update/:id", verifyUserAuthorization(["editor"]), efluentesController.update)
efluentesRoutes.delete("/delete/:id", verifyUserAuthorization(["editor"]), efluentesController.remove)

export { efluentesRoutes }
