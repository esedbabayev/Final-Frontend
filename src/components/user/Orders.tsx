// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/user/order.slice.js";

// Components
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import UserOrderDetails from "./OrderDetails";
import { Badge } from "../ui/badge";

const Orders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.order);

  const fetchOrderDetailsHandler = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  // console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => {
                  return (
                    <TableRow key={orderItem?._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() =>
                              fetchOrderDetailsHandler(orderItem?._id)
                            }
                          >
                            View Details
                          </Button>
                          <UserOrderDetails orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
