const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    registerUser: async (req, res)=> {
        try{
        const user = await prisma.users.create({
            data:{
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profile: {
                    create:{
                        identity_number: req.body.identity_number,
                        identity_type: req.body.identity_type,
                        address: req.body.address,
                    }
                }
            }
        });


        return res.json({
            data: user
        })
        }catch (error){
            return res.status(500).json({
                error: error.message
            });
        }
    },
    showAllUsers: async (req, res)=>{
        try {
            const user = await prisma.users.findMany();
            res.status(200).json(user);
        }catch (error){
            return res.status(500).json({
                error: error.message
            });
        }
    },
    showUser: async (req, res)=>{
        try{
            const userById = req.params.id;
            const user = await prisma.users.findUnique({
                where: {
                    id : parseInt(userById),
                },
                select:{
                    name: true,
                    email: true,
                    profile: true,
                },
            })
                    if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

            return res.json(user)
        }catch (error){
            return res.status(500).json({
                error: error.message
            });
        }
    }
}