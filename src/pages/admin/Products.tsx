import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Form from "@/components/common/Form";
import ImageUpload from "@/components/admin/ImageUpload";

import { productFormElements } from "@/config";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const [openCreateProductView, setOpenCreateProductView] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const onSubmit = () => {};
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductView(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductView}
        onOpenChange={() => setOpenCreateProductView(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ImageUpload
            image={image}
            setImage={setImage}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="py-6">
            <Form
              formControls={productFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText="Add"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
