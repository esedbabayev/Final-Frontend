import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment Successfull</CardTitle>
      </CardHeader>
      <Button onClick={() => navigate("/shop/account")} className="mt-5">
        View orders
      </Button>
    </Card>
  );
};

export default PaymentSuccess;
