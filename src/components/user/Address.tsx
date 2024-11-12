// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  addAddress,
  getAllAddresses,
  editAddress,
  deleteAddress,
} from "@/store/user/address.slice.js";

// Components
import Form from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { addressFormControls } from "@/config/index.js";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/use-toast";

export interface IControls {
  name: string;
  label: string;
  placeholder: string;
  componentType: "input" | "select" | "textarea";
  type?: string;
  options?: Array<{ id: string; label: string }>;
}

interface AddressFormData {
  address: string;
  city: string;
  phone: string;
  postCode: string;
  notes: string;
}

const initialAddressFormData: AddressFormData = {
  address: "",
  city: "",
  phone: "",
  postCode: "",
  notes: "",
};

const Address: React.FC = () => {
  const [formData, setFormData] = useState<AddressFormData>(
    initialAddressFormData
  );

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  // console.log(addressList, "addressList");

  const { toast } = useToast();

  const manageAddressHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (addressList.length >= 3) {
      setFormData(initialAddressFormData)
      toast({
        title: "Maximum of 3 addresses can be added",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: data?.payload?.message,
            });
          }
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(getAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: data?.payload?.message,
            });
          }
        });
  };

  const deleteAddressHandler = (getCurrentAddress) => {
    console.log(getCurrentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      console.log(data, "data");
      if (data?.payload?.success) {
        dispatch(getAllAddresses(user?.id));
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  const editAddressHandler = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      postCode: getCurrentAddress?.postCode,
      notes: getCurrentAddress?.notes,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key as keyof AddressFormData].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(getAllAddresses(user?.id));
  }, [dispatch]);

  console.log(isFormValid(), "isFormValid");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem, index: number) => (
              <AddressCard
                key={index}
                addressInfo={addressItem}
                deleteAddressHandler={deleteAddressHandler}
                editAddressHandler={editAddressHandler}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit address" : "Add new address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={
            currentEditedId !== null ? "Edit address" : "Add new address"
          }
          onSubmit={manageAddressHandler}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
