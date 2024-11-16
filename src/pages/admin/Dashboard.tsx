import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  console.log(uploadedImageUrl, "uploadedImageUrl");
  
  return (
    <div>
      <ImageUpload
        image={image}
        setImage={setImage}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        // isEditMode={currentEditedId !== null}
      />
      <Button>Upload</Button>
    </div>
  );
};

export default Dashboard;
