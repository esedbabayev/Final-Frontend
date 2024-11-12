// Hooks
import { useState } from "react";

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

const Orders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>13/11/2024</TableCell>
              <TableCell>In process</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <Button onClick={() => setOpenDetailsDialog(true)}>
                    View Details
                  </Button>
                  <UserOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
