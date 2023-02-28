import { useEffect, useState, useRef } from "react";
import { CameraType, Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
export const useCamera = () => {
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camRef = useRef(null);

  async function uploadPicture() {
    if (imageUri) {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const formData = new FormData();
      formData.append("photo", {
        uri: imageUri,
        name: fileInfo.uri.split("/").pop(),
        type: "image/jpeg",
      });
      const response = await fetch("https://yourserver.com/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = await response.json();
      console.log(result);
    }
  }

  const toggleType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePhoto = async () => {
    const photo = await camRef.current.takePictureAsync();
    console.log(photo);
    setImageUri(photo.uri);
  };

  const permissionAccess = () => {
    requestPermission();
  };
  useEffect(() => {
    if (permission === null || permission.granted === false) permissionAccess();
  }, []);
  console.log(permission);
  return {
    permission,
    requestPermission,
    takePhoto,
    camRef,
    type,
    toggleType,
    CameraType,
    Camera,
    imageUri,
  };
};
