const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    registerBanks: async (req, res) =>{
        try{
            const bank = await prisma.bank_accounts.create({
                data: {
                    bank_name: req.body.bank_name,
                    bank_account_number: req.body.bank_account_number,
                    ballance: req.body.ballance,
                    user_id: req.body.user_id

                }
            });
            return res.json({
                data: bank
            })
        }catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    },
    showAllBank: async (req, res) =>{
        try {
            const banks = await prisma.bank_accounts.findMany();
            res.status(200).json(banks);
        }catch (error){
            return res.status(500).json({
                error: error.message
            })
        }
    }
}