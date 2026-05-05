Membership Razorpay Auto Activation Update

Replace these files directly:
1) frontend/src/pages/MembershipCheckoutPage.jsx
2) frontend/src/pages/MembershipCheckoutPage.css
3) frontend/src/App.jsx
4) node-backend/server.js

What changed:
- Manual payment mode removed from membership checkout.
- Only Razorpay payment is available for membership purchase.
- After successful Razorpay payment verification, membership is saved as Active automatically.
- Admin confirmation is not required for paid membership.
- Congratulations popup appears after membership activation.

Important:
- Keep your Razorpay keys in node-backend/.env only.
- Restart backend after replacing server.js.
