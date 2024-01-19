import React from "react";
import Avatar from "../../../components/Avatar";
import ReactCrop from "react-image-crop";
import { apiClient } from "../../../apiClient";
import { DEFAULT_API_KEY } from "../../../configs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserDetail } from "../../../actions/user";
import { isBadRequest } from "../../../lib/Http";
import { toast } from "react-toastify";
import "../../../scss/_custom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes ,faEdit} from "@fortawesome/free-solid-svg-icons";
class UploadAvatar extends React.Component {
  state = {
    croppedImageUrl: "",
    fileSize: "",
    closePreviewImage: false,
    fileName:"",
    src: null,
    file: "",
    crop: {
      unit: "%",
      width: 80,
      height: 80,
    },
    zoom: 1,
    isImageUploaded: false,
  };

  // User profile upload
  _userProfileUpdate = (details) => {
    const data = new FormData();
    data.append("file", details.file);
    data.append("email", details.email);
    data.append("userId", this.props.userId);
    data.append("fileName", this.state.fileName)

    if (this.props.publicRoute) {
      apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
    }
    return apiClient
      .put(this.props.apiURL, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          this.props.actions.fetchUserDetail();
          toast.success(successMessage);
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });
  };

  // Handle image upload
  handleImageUpload = () => {
    const { getFile, apiURL, data,setValue } = this.props;
    this.setState({ closePreviewImage: false, isImageUploaded: true});
    apiURL &&
      this._userProfileUpdate({
        file: this.state.file,
        email: data.email,  
        fileName: this.state.fileName      
      });

    setValue && setValue("avatar", this.state.file);
  };

  // Select the uploaded image
  onSelectFile = (e) => {
    const targetFile = e.target;

    if (targetFile.files && targetFile.files.length > 0) {
      const fSize = targetFile.files.item(0).size;
      const fileSize = Math.round(fSize / 1024);
      this.setState({
        fileSize,
        isImageUploaded: false,
      });

      if (fileSize < 10240) {
        const reader = new FileReader();
       const fileName = e.target.files[0]
        reader.addEventListener("load", () =>
          this.setState({ src: reader.result, closePreviewImage: true, fileName: fileName.name, file:fileName})
        );
        reader.readAsDataURL( fileName);
      }
    }
  };

  // Load the initial crop screen
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  // Get crop value from the preview image
  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  // Move the crop the crop selector
  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  // Make the crop the image in preview view
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  // Get Cropped image size
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );


    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");

      canvas.toBlob((file) => {
        var ImageURL = this.state.src;
        var block = ImageURL.split(";");

        file.name = fileName;
        resolve(file);
      }, "image/jpeg");
    });
  }

  render() {
    const {
      data,
      hideUploadButton,
      showInitials,
      placeholderUrl,
      publicRoute,
      allowEdit,
      className,
    } = this.props;
    const {
      croppedImageUrl,
      fileSize,
      closePreviewImage,
      src,
      crop,
      isImageUploaded,
    } = this.state;
    return (
      <>
        <div className={`upload-image align-items-center justify-content-start mb-4 text-center ${className}`}>
          <label
            className={`position-relative profilePicPreview mb-0 mr-4 flex-shrink-0 mx-auto
              ${this.props.square && "d-block"}`}
            htmlFor="profilePicture"
          >
            {isImageUploaded &&
            croppedImageUrl &&
            croppedImageUrl.length > 0 ? (
              <>
                <img
                  alt="profile"
                  src={croppedImageUrl} 
                  className="profile-picture-preview rounded-circle d-inline"
                />
                <div>
                  {allowEdit == true && (
                    <span
                    className=" avatar-inputs pt-5 "
                    >
                      <FontAwesomeIcon icon={faEdit}/>
                    {/* <EditIconAlt className="vertical-align" /> */}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <Avatar
                editProfile={true}
                firstName={(data && data.first_name) || ""}
                lastName={(data && data.last_name) || ""}
                url={
                  (data && data.avatarUrl) ||
                  (placeholderUrl && placeholderUrl) ||
                  ""
                }
                customSize={this.props.customSize ? 240 : 140}
                fontSize={32}
                className="profile-picture-preview rounded-circle d-block avatar-placeholder"
                square={this.props.square}
                editicon={this.props.editicon}
                allowEdit={allowEdit}
              />
            )}
          </label>
          <div
            className={[`${hideUploadButton && "d-none"}`, "upload-field"].join(
              " "
            )}
          >
            <input
              name="file"
              className="form-control d-none"
              type="file"
              id="profilePicture"
              placeholder="Profile Photo"
              onChange={(event) => {
                this.onSelectFile(event);
                event.target.value = "";
              }}
              accept="image/*"
            />
            <small
              className={`text-danger ${
                fileSize > 10240 ? "d-block" : "d-none"
              }`}
            >
              Please select a file less than 10mb
            </small>
            <span className="profilePicOverlay d-block mt-2 mb-3">
              <label htmlFor="profilePicture" className="profile-img-sm mb-0">
                <span className="btn btn-secondary cursor-pointer">
                  Upload New Photo
                </span>
              </label>
            </span>
            <span className="info h7 d-block">
              Images should be at least 530x530px and not exceed 10MB.
            </span>
          </div>
        </div>
        {closePreviewImage && src && (
          <div className="crop-modal" style={{ zIndex: "12" }}>
            <div className="backdrop" />
            <div className="crop-modal-body">
              <div
                className="crop-modal-close"
                onClick={() => this.setState({ closePreviewImage: false })}
              >
                <FontAwesomeIcon icon={faTimes}/>
               
              </div>
              <h5 className="mb-3">
                <b>Crop image and upload</b>
              </h5>
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />

              <div className="mt-4 d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  onClick={this.handleImageUpload}
                >
                  Upload Profile Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ fetchUserDetail }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
