// Hooks
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

// Actions
import { capturePayment } from "@/store/user/order.slice.js";

// Components
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(localStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          localStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturn;
