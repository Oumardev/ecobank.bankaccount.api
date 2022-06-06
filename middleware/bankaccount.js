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
        let balance = parseFloat(userAccount.MoneyRange)
        console.log('balance', balance)
        if(balance < 2000){
            return res.status(401).json({'error': 'Ayez au minimum 2000F sur votre compte: transaction annulé'})
        }else{
            let restbalance = balance - 2000

            userAccount.MoneyRange = restbalance
            await userAccount.save()

            // return id to save it in table 'Compte' field 'idbankaccount'
            return res.status(200).json({'idbankaccount': userAccount.id})
        }
                
    } catch (error) {
        console.log(error)
        return res.status(401).json({'error':'Erreur interne'})   
    }
}

const debitBalance = async (req,res,next) =>{

    const { id, amount } = req.body
    if( !id || !amount ) return res.status(400).json({'error' : 'Veuillez saisir tout les champs'})

    try {
        const userAccount = await Account.findOne({
            where: {
                id : id
            }
        })
        if(!userAccount) return res.status(400).json({'error': 'Impossible d\'effectuer cette transaction'})

        // check user balance
        let balance = parseFloat(userAccount.MoneyRange)
        if(balance < amount){
            return res.status(400).json({'error': 'Vous ne disposer pas d\'assez de fond pour effectuer ce rechargement'})
        }else{
            let restbalance = balance - amount
            userAccount.MoneyRange = restbalance
            await userAccount.save()

            // return userAccount
            return res.status(200).json({'success':'Le rechargement a été effectuer avec succès'})
        }
                
    } catch (error) {
        console.log(error)
        return res.status(401).json({'error':'Erreur interne'})   
    }
}

const creditBalance = async (req,res,next) =>{

    const { id, amount } = req.body
    if( !id || !amount ) return res.status(400).json({'error' : 'Veuillez saisir tout les champs'})

    try {
        const userAccount = await Account.findOne({
            where: {
                id : id
            }
        })
        if(!userAccount) return res.status(400).json({'error': 'Impossible d\'effectuer cette transaction'})
        let balance = parseFloat(userAccount.MoneyRange)

        let restbalance = balance + amount
        userAccount.MoneyRange = restbalance
        await userAccount.save()

        // return success
        return res.status(200).json({'success':'Le dépot a été effectuer avec succès'})
    } catch (error) {
        console.log(error)
        return res.status(401).json({'error':'Erreur interne'})   
    }
}

const getBankAccount = async (req,res,next) =>{

    const { id } = req.body
    if( !id ) return res.status(400).json({'error' : 'Veuillez saisir tout les champs'})

    try {
        const userAccount = await Account.findOne({
            where: {
                id : id
            }
        })
        if(!userAccount) return res.status(400).json({'error': 'Impossible d\'obtenir les informations sur le compte'})

        // return userAccount
        return res.status(200).json({'success': userAccount})
    } catch (error) {
        console.log(error)
        return res.status(401).json({'error':'Erreur interne'})   
    }
}

module.exports = { connectAccountToApoloan, debitBalance, creditBalance, getBankAccount }