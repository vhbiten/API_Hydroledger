import { Router } from 'express';

import { usersRoutes } from './users-routes';
import { sessionsRoutes } from './sessions-routes';
import { pocosRoutes } from './pocos-routes';
import { efluentesRoutes } from './efluentes-routes';
import { cloroResidualRoutes } from './cloro-residual-routes';


const routes = Router();

// Rotas de autenticação e usuários
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

// Rotas de registros (agrupadas sob /registros)
routes.use("/registros/pocos", pocosRoutes);
routes.use("/registros/efluentes", efluentesRoutes);
routes.use("/registros/cloro-residual", cloroResidualRoutes);

export { routes }