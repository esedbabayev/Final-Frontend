//Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

// Actions
import { getAllProducts, addNewProuct } from "@/store/admin/products.slice.js";

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
import AdminProducts from "@/components/admin/Products";

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

  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { products } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const { toast } = useToast();

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(addNewProuct({ ...formData, image: uploadedImageUrl })).then(
      (data) => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(getAllProducts());
          setOpenCreateProductView(false);
          setImage(null);
          setFormData(initialFormData);
          toast({
            title: "Product added successfully",
          });
        }
      }
    );
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log(products, uploadedImageUrl, "products");

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductView(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0
          ? products.map((product) => <AdminProducts product={product} />)
          : null}
      </div>
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
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
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
