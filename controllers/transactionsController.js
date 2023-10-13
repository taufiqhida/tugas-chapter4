const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();
module.exports = {
    createTransaction: async (req,res) =>{
        try {
            const sourceAccountId = parseInt(req.body.source_account_id);//Buat deklarasi souceAccoundId
            const destinationAccountId = parseInt(req.body.destination_account_id);//Buat deklarasi destination
            const amount = BigInt(req.body.amount);


            const sourceAccount = await prisma.bank_accounts.findUnique({
                where:{id : sourceAccountId},
                include:{
                    user: true,
                },
            });

            if(!sourceAccount || !destinationAccountId){
                return res.status(404).json({error: "Akun tidak ada"})
            }
            if(sourceAccount.ballance < amount){
                return res.status(404).json({error: "SAldo tidak ada"})
            }
            const transaction = await prisma.$transaction([
                prisma.bank_account_transactions.create({
                    data: {
                        source_account_id: sourceAccountId,
                        destination_account_id: destinationAccountId,
                        amount,
                    },
                    include:{
                        source_account: true,
                        destination_account: true,
                    },
                }),
                prisma.bank_accounts.update({
                    where: {id: sourceAccountId},
                    data: {ballance: sourceAccount.ballance - amount}
                }),
                prisma.bank_accounts.update({
                    where:{id: destinationAccountId},
                    data: {ballance: destinationAccount.ballance + amount}
                })
            ]);

            return res.json({
                data: {
                    transaction_id: transaction.id,
                    source_account_id: transaction.sourceAccountId,
                    destination_account_id: transaction.destinationAccountId,
                    source_account_id: sourceAccount.id,
                    source_account_name: sourceAccount.user.name,
                    destination_account_id: destinationAccount.id,
                    destination_account_name: destinationAccount.user.name,
                    amount: amount.toString(),
                }
            })

        }catch (error){
            return res.status(500).json({
                error: error.message
            })
        }
    },
    showAllTransactions: async (req, res) =>{
        try{
            const transactions = await prisma.bank_account_transactions.findMany({
                include:{
                    source_account:{
                        include:{
                            user: true
                        },
                    },
                    destination_account:{
                        include:{
                            user:true
                        }
                    }
                }
            });
            const formattransactions = transactions.map((transaction)=>({
                transaction_id: transaction.id,
                source_account_id: transaction.source_account_id,
                source_account_name: transaction.source_account.user.name,
                destination_account_id: transaction.destination_account_id,
                destination_account_name: transaction.destination_account.user.name,
                amount: transaction.amount.toString(),
            }));
            return res.json({data: formattransactions})
        }catch (error){
            return res.status(500).json({
            error: error.message
            })
        }
    },
    showTransaction: async (req, res) => {
        try {
            const transactionId = parseInt(req.params.id);
            const transaction = await prisma.bank_account_transactions.findUnique({
                where:{id: transactionId},
                include:{
                    source_account:{
                        include: {
                            user: true,
                        },
                    },
                    destination_account:{
                        include: {
                            user: true
                        },
                    },
                },
        });
            if(!transaction){
                return res.status(404).json({
                    error : "Transaksi nggak di temukan"
                })
            }
            const showTransacion = {
                transaction_id: transaction.id,
                source_account_id : transaction.source_account_id,
                source_account_name : transaction.source_account.user.name,
                destination_account_id: transaction.destination_account_id,
                destination_account_name:transaction.destination_account.user.name,
                amount: transaction.amount.toString(),
            };
            return res.json({data: showTransacion});
        }catch (error) {
            return res.status(500).json({
            error: error.message
            })
        }
    }
}