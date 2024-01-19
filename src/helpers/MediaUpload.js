import MediaService from "../services/MediaService";
import Media from "./Media";

class MediaUpload {
  static async uploadFile(
    selectedFile,
    objectId,
    ObjectName,
    values,
    visiblity,
    toggle,
    callback,

  ) {
    try {
      if (selectedFile && objectId) {
        const mediaFile = selectedFile ? selectedFile : "";

        const media = selectedFile?.name;
         const name=values?.name
        const data = new FormData();

        if (mediaFile) {
          data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
        }
        if (media !== undefined) {
          data.append([Media.MEDIA_NAME], media ? media : "");
        }
        data.append("object", ObjectName);

        data.append("object_id", objectId);
        data.append("name", name? name: "");

        data.append([Media.MEDIA_VISIBILITY], visiblity ? visiblity : Media.VISIBILITY_PUBLIC);
        // if(
        const response = await MediaService.saveImage(data,toggle);
        if (response) {
          toggle && toggle();
        callback && callback(response);  
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default MediaUpload;
