const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    registerBanks: async (req, res) =>{
        const userId = parseInt(req.body.user_id)
        try{
            const user = await prisma.users.findUnique({
                where: {
                    id: userId

                },
            });
                    if (!user) {
          return res.status(404).json({ error: 'User Not Found' });
        }
                    const addBank = await  prisma.bank_accounts.create({
                        data: {
                            bank_name: req.body.bank_name,
                            bank_account_number: req.body.bank_account_number,
                            ballance: BigInt(req.body.ballance),
                            user: {connect: {id:userId}},
                        },
                    });

            return res.json({
                data: {
                    user_id: addBank.user_id,
                    bank_name: addBank.bank_name,
                    bank_account_number: addBank.bank_account_number,
                    ballance: Number(addBank.ballance),
                },
            });
        }catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    },
    showAllBanks: async (req, res) =>{
        try {
            const banks = await prisma.bank_accounts.findMany({
                select:{
                    id: true,
                    user_id: true,
                    bank_name: true,
                    bank_account_number: true,
                    ballance: true
                }
            });
            const formatBank = banks.map(banks =>({
                ...banks,
                ballance: Number(banks.ballance),
                user_id: Number(banks.user_id)
            }));
            res.status(200).json(formatBank);
        }catch (error){
            return res.status(500).json({
                error: error.message
            })
        }
    },
    showBank: async (req, res) =>{
        try {
            const bankByid = req.params.id;
            const bank = await prisma.bank_accounts.findUnique({
                where: {
                    id: parseInt(bankByid),
                },
                include : {
                    user : {
                        select : {
                            name : true,
                            email : true
                        }
                    }
                },
            });
            if(!bank){
                return res.status(404).json({
                error: "Akun nggak ada"
            })
            }
            const data = {
                id: bank.id,
               user_id: bank.user_id,
               bank_name: bank.bank_name,
               bank_account_number: bank.bank_account_number,
               ballance: Number(bank.ballance),
                user:{
                    name: bank.user.name,
                    email: bank.user.email,
                }
            }
            return res.status(200).json(data)
        }catch (error){
            return res.status(500).json({
                error: error.message
            })
        }
    }
}