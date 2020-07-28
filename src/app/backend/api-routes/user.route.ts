import { Request, Response, NextFunction, Application } from 'express';
import userModel from '../db/schemes/user.schema';
import { API } from 'src/app/const/routes';
import roleModel from '../db/schemes/role.schema';

export class UserRoute {
  userRoute(app: Application): void {
    // Create User
    app
      .route(`/api/${API.CREATE_USER}`)
      .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const role = await roleModel.findOne({ name: 'Art manager' });
          const user = await userModel.findOne({ role: role._id });
          if (user && String(req.body.role) === String(role._id)) {
            res.statusMessage = 'User with Art manager Role already exists';
            res.status(500).end();
            return;
          }
          const response = await userModel.create(req.body);
          res.json(response);
        } catch (error) {
          res.statusMessage = error;
          res.status(500).end();
        }
      });

    // Get All Users
    app
      .route('/api/get-users')
      .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const params = req.query;
          const response = await userModel.find(this.createFinder(params)).populate('role');
          res.json(response);
        } catch (error) {
          res.statusMessage = error;
          res.status(500).end();
        }
      });

    // Update User
    app
      .route(`/api/${API.UPDATE_USER}/:id`)
      .put(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const role = await roleModel.findOne({ name: 'Art manager' });
          const user = await userModel.findOne({ role: role._id });
          if (
            user &&
            String(req.body.role) === String(role._id) &&
            String(req.params.id) !== String(user._id)
          ) {
            res.statusMessage = 'User with Art manager Role already exists';
            res.status(500).end();
            return;
          }
          const response = await userModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.json(response);
        } catch (error) {
          res.statusMessage = error;
          res.status(500).end();
        }
      });

    // Delete User
    app
      .route(`/api/${API.DELETE_USER}/:id`)
      .delete(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const response = await userModel.findOneAndRemove({
            _id: req.params.id,
          });
          res.json(response);
        } catch (error) {
          res.statusMessage = error;
          res.status(500).end();
        }
      });
  }

  private createFinder(params: any) {
    const finder = { $and: [] };
    if (params.roleControl) {
      finder.$and.push({ role: params.roleControl });
    }
    if (params.searchControl) {
      finder.$and.push({
        $or: [
          { firstName: { $regex: params.searchControl, $options: 'i' } },
          { lastName: { $regex: params.searchControl, $options: 'i' } },
          { email: { $regex: params.searchControl, $options: 'i' } },
        ],
      });
    }

    return finder.$and.length ? finder : {};
  }
}
