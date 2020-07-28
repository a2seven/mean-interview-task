import { Model, Schema, model } from 'mongoose';
import { IRole } from 'src/app/interfaces/role.interface';

const RoleSchema = new Schema({
    name: String,
});

const roleModel: Model<IRole> = model('Role', RoleSchema);

export default roleModel;
