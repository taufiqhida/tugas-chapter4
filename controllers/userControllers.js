const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils')
const secret_key = process.env.JWT_KEY || "no_secret"
const prisma = new PrismaClient();

module.exports = {
    registerUser: async (req, res)=> {
        try{
        const user = await prisma.users.create({
            data:{
                name: req.body.name,
                email: req.body.email,
                password: await utils.cryptPassword(req.body.password),
                profile: {
                    create:{
                        identity_number: req.body.identity_number,
                        identity_type: req.body.identity_type,
                        address: req.body.address,
                    }
                }
            },
            include:{
                profile: true
            }
        });


        return res.status(201).json({
            data
        })
        }catch (error){
            return res.status(500).json({
                error: error.message
            });
        }
    },

    loginUser: async (req, res) =>{
    try{
        const findUser = await prisma.users.findFirst({
            where:{
                email: req.body.email
            }
        })
        if(!findUser){
            return res.status(404).json({
                error: "User not exits"
            })
        }

        if(bcrypt.compareSync(req.body.password, findUser.password)){
            const token = jwt.sign({id: findUser.id}, 'secret_key', {expiresIn : '6h'})

            return res.status(200).json({
                data: {
                    token
                }
            })
        }
        return res.status(403).json({
            error: "Invalid"
        })
    }catch (error) {
        return res.status(500).json({
                error
            })
        }
    },
    profile: async (req, res)=>{
        try{
            const user = await users.findUnique({
                include:{
                    profile: true
                },
                where:{
                    id: res.user.id
                }
            })

            return res.status(200).json({
                data: user
            })
        }catch (error){
            return res.status(500).json({
                error
            })
        }
    },
    changePassword:async (req, res)=>{
        try {
            const user = await users.findUnique({
                where: {
                    id: res.user.id
                }
            })

            if(bcrypt.compareSync(req.body.old_password, user.password)){
                const data = await users.update({
                    where:{
                        id: res.user.id
                    },
                    data:{
                        password: await utils.cryptPassword(req.body.password)
                    }
                })
            }

            return res.status(200).json({
                data
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
    getUser:async (req, res)=>{
        const user = await prisma.users.findUnique({
            where:{
                id: res.user.id
            }
        })

        return res.status(200).json({
            data: user
        })
    }
    // showUser: async (req, res)=>{
    //     try{
    //         const userById = req.params.id;
    //         const user = await prisma.users.findUnique({
    //             where: {
    //                 id : parseInt(userById),
    //             },
    //             select:{
    //                 name: true,
    //                 email: true,
    //                 profile: true,
    //             },
    //         })
    //                 if (!user) {
    //         return res.status(404).json({ error: "User not found" });
    //     }
    //
    //         return res.json(user)
    //     }catch (error){
    //         return res.status(500).json({
    //             error: error.message
    //         });
    //     }
    // }
}