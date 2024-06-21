import Razorpay from "razorpay";
import 'dotenv/config';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount, currency = "INR") => {
  const options = {
    amount: amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
    currency,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

export const verifyRazorpayPayment = (paymentDetails) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentDetails;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');
  return generatedSignature === razorpay_signature;
};
