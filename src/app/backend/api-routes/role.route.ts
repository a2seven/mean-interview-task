import { Request, Response, NextFunction, Application } from 'express';
import roleModel from '../db/schemes/role.schema';
import { API } from 'src/app/const/routes';

export class RoleRoute {
  roleRoute(app: Application): void {
    // Get All Roles
    app
      .route(`/api/${API.GET_ALL_ROLES}`)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const response = await roleModel.find({});
          res.json(response);
        } catch (error) {
          res.statusMessage = error;
          res.status(500).end();
        }
      });
  }
}
