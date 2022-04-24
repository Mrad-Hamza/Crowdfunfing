const stripe = require("stripe")("sk_test_51Ks1exLyE3hWd2josW7uBB5od2JBMgcajBPHDCJgErLGuAAIQs5kRjaf9D9xIypQx8QjxAMQn6T5yibjbNDbmhyx00KfViNrr2")
const router = require('express').Router();
const Transaction = require("../models/transaction.model")
const nodemailer = require('nodemailer');


router.route('/getUserDonations/:id').get((req, res) => {
    Transaction.find({ 'user': req.params.id })
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getCampaignDonations/:id').get((req, res) => {
    Transaction.find({ 'campaign': req.params.id })
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').post((req, res) => {
    const { campaign, data,token } = req.body
    console.log(token)
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: data.donation * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: data.email,
            description: "Donation of " + data.donation + " usd to " + campaign.nameCompaign,
        })
    }).then(result => {
        res.status(200).json(result)
    })
        .catch(err => console.log(err))
})

router.route('/addToDatabase').post((req, res) => {
    const { campaign, data } = req.body
    const transaction = new Transaction({ user: data.id, campaign: campaign._id, amount: data.donation })
    transaction.save()
        .then(() => {
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: "fundise.noreply@gmail.com",
                    pass: "HzJxDKrxS2LNwa9"
                }
            })
            let details = {
                from: "fundise.noreply@gmail.com",
                to: data.mail,
                subject: "Donation completed succesfully.",
                text: "Your donation of " + data.donation + " to campaign " + campaign.nameCompaign + " is completed Succesfully. Thank you for Donating! Fundise Team With Love!"
            }
            mailTransporter.sendMail(details)
        })
        .catch(err => res.status(400).json('Error: ' + err));

})



module.exports = router;
