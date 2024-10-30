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

import { productFormElements } from "@/config";

const Products = () => {
  const [openCreateProductView, setOpenCreateProductView] = useState(false);

  const [formData, setFormData] = useState(initialFormData)
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
          <div className="py-6">
            <Form
              formControls={productFormElements}
              formData={}
              setFormData={}
              onSubmit={}
              buttonText={}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
