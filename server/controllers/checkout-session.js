import Stripe from 'stripe'

const stripe = Stripe('sk_test_51JCe10SJYRDw65hFM8WCPMSqz1FRYjUl2wAOtN6NZkUatIeI1UYLIlVLrd5QSplb5OzlyimRjNpKvm9NXK7vQl9z00bsB5Ck1F');

// export const checkoutSession = async (req, res) => {
//     const product = await stripe.products.create({
//         name: 'Fundraising dinner',
//       });

//       const price = await stripe.prices.create({
//         currency: 'usd',
//         custom_unit_amount: {
//           enabled: true,
//         },
//         product: product,
//       });
      
//       const session = await stripe.checkout.sessions.create({
//         cancel_url: 'https://example.com',
//         line_items: [
//             {
//               price: price,
//               quantity: 1,
//             },
//           ],
//         mode: 'payment',
//         success_url: 'https://example.com',
//       });

//       res.send({url: session.url});
// }

export const checkoutSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: req.body.title,
              },
              unit_amount: req.body.amount * 100,
            },
            quantity: 1,
          },
        ],
        submit_type: 'donate',
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/charities',
    });
    res.send({url: session.url});
    console.log(session.url);
}