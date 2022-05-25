const { Account } = require('../models')
const { Op } = require("sequelize");

const connectAccountToApoloan = async (req,res,next) =>{

    const { CardNumber, Name, Expiry, CVV } = req.body
    if( !CardNumber || !Name || !Expiry || !CVV  ) return res.status(401).json({'error' : 'Veuillez saisir tout les champs'})

    try {
        
        const userAccount = await Account.findOne({
            where: {
                [Op.and]: [{ CardNumber: CardNumber }, { Name: Name }, { Expiry: Expiry }, { CVV: CVV }]
            }
        })

        if(!userAccount) return res.status(401).json({'error': 'Impossible d\'effectuer ce paiement'})

        // check user balance
        const balance = parseFloat(userAccount.MoneyRange)
        if(balance < 2000){
            return res.status(401).json({'error': 'Ayez au minimum 2000F sur votre compte: transaction annulé'})
        }else{
            const restbalance = balance - 2000
            console.log('restbalance: ',restbalance)

            userAccount.MoneyRange = toString(restbalance)
            await userAccount.save()

            // return id to save it in table 'Compte' field 'idbankaccount'
            return res.status(200).json({'idbankaccount': userAccount.id})
        }
                
    } catch (error) {
        console.log(error)
        return res.status(401).json({'error':'Erreur interne'})   
    }
}

module.exports = { connectAccountToApoloan }