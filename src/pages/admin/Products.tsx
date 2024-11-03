//Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

// Actions
import {
  getAllProducts,
  addNewProuct,
  editProduct,
  deleteProduct,
} from "@/store/admin/products.slice.js";

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

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { products } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const { toast } = useToast();

  const onSubmit = (event: any) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log(data, "edit");
            if (data?.payload?.success) {
              dispatch(getAllProducts());
              setOpenCreateProductView(false);
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: data?.payload?.message,
              });
            }
          }
        )
      : dispatch(addNewProuct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            console.log(data);
            if (data?.payload?.success) {
              dispatch(getAllProducts());
              setOpenCreateProductView(false);
              setImage(null);
              setFormData(initialFormData);
              toast({
                title: data?.payload?.message,
              });
            }
          }
        );
  };

  const deleteHandler = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProducts());
        setOpenCreateProductView(false);
        setFormData(initialFormData);
        setCurrentEditedId(null);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
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
          ? products.map((product) => (
              <AdminProducts
                product={product}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductView={setOpenCreateProductView}
                setFormData={setFormData}
                deleteHandler={deleteHandler}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductView}
        onOpenChange={() => {
          setOpenCreateProductView(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit product" : "Add new product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            image={image}
            setImage={setImage}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <Form
              formControls={productFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Products;
