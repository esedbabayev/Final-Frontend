// Hooks
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  deleteAddressHandler,
  editAddressHandler,
  setCurrentSelectedAddress,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
    >
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Post Code: {addressInfo?.postCode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex gap-2 p-4">
        <Button onClick={() => editAddressHandler(addressInfo)}>Edit</Button>
        <Button onClick={() => deleteAddressHandler(addressInfo)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
