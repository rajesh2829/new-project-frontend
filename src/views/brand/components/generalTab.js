import CancelButton from "../../../components/CancelButton";
import Form from "../../../components/Form";
import Hint from "../../../components/Hint";
import HorizontalSpace from "../../../components/HorizontalSpace";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import { useRef } from "react";
import AvatarCard from "../../../components/AvatarCard";

function GeneralDetailsTab(props) {
  // Props
  const { brandImageUrl, handleImageUpload } = props;

  const userImageRef = useRef(null);
  return (
    <Form initialValues={props.initialValues} onSubmit={props._handleSubmit} enableReinitialize>
      {/* Brand edit form */}
      <div>
        <div className="card border-0 p-3 ">
          <div className="row">
            {/* Product brand form fields */}
            <div className="col-lg">
              <Text label="Name" name="name" required={true} disabled={props?.editable} />
              <Select
                label="Status"
                name="status"
                options={props.productBrandStatus}
                handleChange={(e) => props.handleStatusChange(e)}
                required={true}
                isDisabled={props?.editable}
              />
              <Select
                label="Manufacture"
                name="manufacture"
                options={props.manufactureOption}
                handleChange={(e) => props.handleManufactureChange(e)}
                isDisabled={props?.editable}
              />

              <div className="d-flex bd-highlight">
                <div className="p-2 w-100 bd-highlight">
                  <div className="upload-field d-inline-block mt-3 ml-1">
                    <input
                      name="file"
                      className="form-control d-none"
                      type="file"
                      id="portalLogo"
                      placeholder="Banner Image"
                      accept="image/png,image/gif,image/jpeg"
                      onChange={(e) => {
                        props.onChangeImageHandler(e);
                        e.target.value;
                      }}
                      ref={userImageRef}
                      disabled={props.editable}
                    />

                    <span className="profilePicOverlay d-block ">
                      <label
                        htmlFor="portalLogo"
                        className="profile-img-sm mb-0">
                        <span className="text-decoration-none cursor-pointer text-primary">
                          Upload Brand Logo
                        </span>
                      </label>
                    </span>
                  </div>

                  {/* Remove image */}
                  {brandImageUrl && !props.editable && (
                    <span
                      className="text-decoration-underline cursor-pointer text-primary text-danger ml-md-1"
                      onClick={props.userImageRemove}
                    >
                      (Remove)
                    </span>
                  )}

                  <div className="field-wrapper mb-3 ml-1">
                    <small className={`text-danger mt-3 ${"d-none"}`}>
                      Please select a image file
                    </small>

                    <Hint
                      id="bannerRequirements"
                      hintText="We recommended using 400 x 400 image"
                    />
                  </div>
                  {!props.editable && <HorizontalSpace bottom="2">
                    <SaveButton
                      label="Save"
                      onClick={handleImageUpload}
                    />
                    <CancelButton
                      onClick={() => {
                        props.push("/brands");
                      }}
                    />
                  </HorizontalSpace>}
                </div>
                {brandImageUrl && (
                  <div className="p-2 flex-shrink-1 bd-highligh">
                    <AvatarCard
                      url={brandImageUrl}
                      square
                      customSize="100px"


                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </Form>
  );
}

export default GeneralDetailsTab;
