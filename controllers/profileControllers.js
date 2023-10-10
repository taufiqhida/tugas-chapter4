const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

module.exports={
    registerProfile: async (req, res)=>{
        try {
            const profile = await prisma.profiles.create({
                data:{
                    identity_type : req.body.identity_type,
                    identity_number: req.body.identity_number,
                    address: req.body.address,
                    user: req.body.user
                }
            })
            return res.json({
                data: profile
            })
        }catch (error){
            return res.status(500).json({
                error: error.message
            });
        }
    },
    showAllProfiles: async (req, res)=>{
    try {
        const profiles = await prisma.profiles.findMany();
        res.status(200).json(profiles);
    }catch (error){
        return res.status(500).json({
            error: error.message
        });
    }
}
}