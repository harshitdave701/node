require('dotenv').config();

const config = module.exports = {};

config.url = `mongodb+srv://cluster0.bvqff.mongodb.net/test?retryWrites=true&w=majority`;
config.tokensecret = process.env.tokensecret;