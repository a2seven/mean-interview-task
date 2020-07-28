import roleModel from '../db/schemes/role.schema';


const createRole = async (roleName: string) => {
    const role = await roleModel.findOne({name: roleName});
    if (!role) {
        await roleModel.create({name: roleName});
    }
};


export const createRoles = async () => {
    await createRole('Artist');
    await createRole('Designer');
    await createRole('Art manager');
};
