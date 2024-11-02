import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

const ImageUpload = ({
  image,
  setImage,
  uploadedImageUrl,
  setUploadedImageUrl,
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

  console.log(image);

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("my_file", image);

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) setUploadedImageUrl(response.data.result.url);
  };

  useEffect(() => {
    if (image !== null) uploadImageToCloudinary();
  }, [image]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={imageFileChangeHandler}
        />
        {!image ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload</span>
          </Label>
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
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
