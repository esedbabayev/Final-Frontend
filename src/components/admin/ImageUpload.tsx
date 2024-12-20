import { useEffect, useRef } from "react";
import axios from "axios";

// Components
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

// Icons
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";

const ImageUpload = ({
  image,
  setImage,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);

  const imageFileChangeHandler = (event: any) => {
    console.log(event.target.files);
    const selectedImage = event.target.files?.[0];

    if (selectedImage) setImage(selectedImage);
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const dropHandler = (event: any) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImage(droppedFile);
  };

  const removeImageHandler = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  console.log(image, "image");

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", image);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (image !== null) uploadImageToCloudinary();
  }, [image]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={imageFileChangeHandler}
          disabled={isEditMode}
        />
        {!image ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "hover:cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{image.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-black hover:text-gray-500"
              onClick={removeImageHandler}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
