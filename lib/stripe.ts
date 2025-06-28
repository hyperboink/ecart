import Stripe from 'stripe';

if(!process.env.STRIPE_SECRET_KEY){
    throw new Error('Secret key is not defined.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil"
});

export default stripe;