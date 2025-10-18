import { Router } from "express"
import { CloroResidualController } from "@/controllers/cloro-residual-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const cloroResidualRoutes = Router()
const cloroResidualController = new CloroResidualController()

cloroResidualRoutes.use(ensureAuthenticated)
cloroResidualRoutes.post("/", verifyUserAuthorization(["editor", "querier"]), cloroResidualController.create)
cloroResidualRoutes.get("/index", verifyUserAuthorization(["editor"]), cloroResidualController.index)
cloroResidualRoutes.put("/update/:id", verifyUserAuthorization(["editor"]), cloroResidualController.update)
cloroResidualRoutes.delete("/delete/:id", verifyUserAuthorization(["editor"]), cloroResidualController.remove)

export { cloroResidualRoutes }
