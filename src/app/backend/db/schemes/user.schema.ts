import { Model, Schema, model } from 'mongoose';
import { IUser } from 'src/app/interfaces/user.interface';


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

const userModel: Model<IUser> = model('User', UserSchema);

export default userModel;
