import React from "react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import String from "../../lib/String";
import classNames from "classnames";

// Components
import Spinner from "../../components/Spinner";
import DeleteModal from "../../components/DeleteModal";
import PageTitle from "../../components/PageTitle";
import toast from "../../components/Toast";
import BreadCrumb from "../../components/Breadcrumb";
import GeneralDetailsTab from "./components/generalTab";
import Action from "../../components/Action";
import ProductList from "../product/components/productList";
import ActivityList from "../../components/ActivityList";
import Button from "../../components/Button";
import AddModal from "../../components/Modal";
import BrandSelect from "../../components/BrandSelect";
import OutlineButton from "../../components/OutlineButton";

// Actions
import { updateProductStatus } from "../../actions/storeProduct";
import { fetchList } from "../../actions/table";


// Helpers
import { Brand } from "../../helpers/Brand";
import ObjectName from "../../helpers/ObjectName";
import Permission from "../../helpers/Permission";
import { Tag } from "../../helpers/Tag";
import { sortByOption } from "../product";

// API
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";

// Service
import productBrandService from "../../services/ProductBrandService";
import { hasPermission } from "../../services/UserRolePermissionService";
import BrandService from "../../services/BrandService";
import TagService from "../../services/TagService";

const BRAND_GENERAL_TAB = "General";
const PRODUCT_TAB = "Products ";
const HISTORY_TAB = "History";
class EditBrandDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandDetails: {},
      isLoading: false,
      submitResponse: false,
      statusResponse: false,
      openDeleteModal: false,
      editImage: false,
      openDelete: false,
      brandImageUrl: "",
      brandImage: "",
      activeTab: BRAND_GENERAL_TAB,
      productBrandStatus: [
        {
          value: Brand.STATUS_ACTIVE_TEXT,
          label: Brand.STATUS_ACTIVE_TEXT,
        },
        {
          value: Brand.STATUS_INACTIVE_TEXT,
          label: Brand.STATUS_INACTIVE_TEXT,
        },
      ],
      handleManufactureChange: [],
      manufactureOption: [],
      userImageRef: React.createRef(),
      isEditable: true,
      selectedCheckBox: true,
      selectedIds: [],
      isOpen: false,
    };
  }
  currentBrandId = this.props.match.params.id;

  componentDidMount() {
    this.getBrandDetails();
    this.getManufactureDetails();
  }


  // Get brand Details
  getBrandDetails = async () => {
    try {
      this.setState({ isLoading: true });

      const brandDetails = await productBrandService.getBrandDetailsById(
        this.currentBrandId
      );
      this.setState({
        brandDetails: brandDetails.data,
        brandImageUrl: brandDetails.data.image,
        isLoading: false,
        editImage: false,
      });
    } catch (err) {
      this.setState({ isLoading: false });

      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  getManufactureDetails = async () => {

    let param = {
      type: "Manufacture",
      status: Tag.STATUS_ACTIVE,
    }

    const response = await TagService.search(param);
    const data = response.data.data;

    const manufactures = [];
    if (data && data.length > 0) {
      data.forEach((manufacture) => {
        manufactures.push({
          value: manufacture.id,
          label: manufacture.name,
        });
      });
    }

    this.setState({ manufactureOption: manufactures });
  };

  showEditButton = hasPermission(Permission.BRAND_EDIT)
  // Handle brand form submit
  _handleSubmit = async (values) => {
    const newValues = Object.assign({}, values);
    newValues.name = newValues.name.trim();
    newValues.status =
      typeof newValues.status === "object"
        ? newValues.status.value
        : newValues.status;
    newValues.manufacture_id = newValues && newValues.manufacture && newValues.manufacture?.value ? newValues.manufacture?.value : "";
    try {
      const { submitResponse } = this.state;

      this.setState({ submitResponse: !submitResponse });
      this.props.dispatch(
        await BrandService.update(this.currentBrandId, newValues, {})
      );
      this.setState({ isLoading: false });
      this.setState({ isEditable: true })

      this.setState({ submitResponse: false });
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
      this.setState({ submitResponse: false });
    }
  };

  // Brand delete modal handler
  _handleDeleteBrandModal = () => {
    const { deleteBrandModelToggle } = this.state;
    this.setState({ deleteBrandModelToggle: !deleteBrandModelToggle });
  };

  // Brand delete action handler
  _handleBrandDelete = async () => {
    try {
      const data = await productBrandService.deleteBrandById(
        this.currentBrandId
      );
      toast.success(data.message);

      this.props.history.push("/brands");
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  _toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  // Image change handler
  onChangeImageHandler = (e) => {
    const file = e.target.files ? e.target.files[0] : "";
    this.setState({ brandImage: file });
    this.setBase64Image(file);
  };

  // Set image preview in state
  setBase64Image = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ brandImageUrl: reader.result });
    };
  };

  handleStatusChange = (selectStatus) => {
    if (selectStatus && selectStatus.status) {
      this.setStatus(selectStatus.status);
    }
  };

  // Image upload handler
  handleImageUpload = async () => {
    const { brandImage } = this.state;
    const files = new FormData();
    files.append("files", brandImage ? brandImage : "");

    try {
      if (brandImage) {
        productBrandService.uploadBrandImageById(
          this.currentBrandId,
          files,
          (data) => {
            data && data.message;
          }
        );
      } else {
        productBrandService.uploadBrandImageById(
          this.currentBrandId,
          files,
          (data) => {
            data && data.message;
          }
        );
      }
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // user image remove
  userImageRemove = () => {
    this.setState({ brandImage: "", brandImageUrl: "", userImageRef: "" });
  };

  // Toggle tab
  toggle = (tab) => {
    this.setState({ activeTab: tab });
  };

  // handle Tab Change
  _handleTabChange = (tab) => {
    this.props.history.push(`?tab=${tab}`);
  };

  render() {
    const {
      brandDetails,
      isLoading,
      productBrandStatus,
      handleManufactureChange,
      brandImage,
      brandImageUrl,
      manufactureOption,
      selectedCheckBox,
      selectedIds,
    } = this.state;

    // Form initial values
    const initialValues = {
      name: String.Get(brandDetails.name),
      status: {
        label: String.Get(brandDetails.status),
        value: String.Get(brandDetails.status),
      },
      manufacture: manufactureOption.find((data) => data.value == brandDetails.manufacture_id),
    };

    if (isLoading) {
      return <Spinner />;
    }

    const { openDeleteModal, activeTab } = this.state;
    const imageDetail = {
      id: brandDetails.id,
      userImage: brandImage,
    };

    const imagePath = !brandImageUrl && brandImage ? brandImage : brandImageUrl;

    const breadcrumbList = [
      { label: "Home", link: "/locationDashboard" },
      {
        label: "Brands",
        link: "/brands",
      },
      {
        label: "Brand Details",
        link: "",
      },
    ];

    const actionsMenuList = [
      {
        value: "delete",
        label: "Delete",
      },
    ];

    const handleActionChange = (e) => {
      if (e == "delete") {
        this.setState({ openDeleteModal: true });
      }
    };

    const handleBulkSelect = (ids) => {
      this.setState({ selectedIds: ids });
    };

    const handleSubmit = async (data) => {
      data.brandId = data.brandId ? data.brandId?.id : null;
      data.ids = { selectedIds: selectedIds }
      await apiClient
        .put(`${endpoints().productAPI}/bulk/update`, data)
        .then((response) => {
          if (response) {
            this._toggle();
            this.setState({ selectedCheckBox: false })
            this.setState({ selectedCheckBox: true })
            toast.success(response.data.message);
          }
        })
        .then(() => {
          this.props.dispatch(
            fetchList(
              "allProducts",
              `${endpoints().productAPI}/search`, 1, 25, { brand_id: this?.props?.match?.params?.id }

            )
          );
        })

    }

    let bulkUpdateForm = (
      <BrandSelect label="Brand" name="brandId" required={true} />

    )

    let bulkUpdateFooter = (
      <>
        <Button type="submit" label="Update" className="h6-5-important" />
      </>
    );

    return (
      <>
        <DeleteModal
          isOpen={openDeleteModal}
          title="Delete Brand"
          toggle={() => {
            this.setState({ openDeleteModal: false });
          }}
          label={brandDetails.name}
          deleteFunction={() => this._handleBrandDelete(brandDetails.id)}
        />

        <AddModal
          modalTitle="Bulk Update"
          modalBody={bulkUpdateForm}
          modalFooter={bulkUpdateFooter}
          isOpen={this.state.isOpen}
          toggle={this._toggle}
          toggleModalClose={this._toggle}
          initialValues={{
            brandId: "",
          }}
          onSubmit={(values) => {
            if (values) {
              handleSubmit(values)
            }
          }}
          hideDefaultButtons
        />

        <BreadCrumb list={breadcrumbList} />
        <div className="d-flex justify-content-between">
          <PageTitle label={brandDetails.name} />

          <div className="d-flex">
            {activeTab == PRODUCT_TAB && (
              <OutlineButton
                label="Bulk Update"
                onClick={this._toggle}
                backgroundColor="var(--bulkUpdate-button-bg-color)"
                borderColor="var(--bulkUpdate-button-border-color)"
                color="var(--bulkUpdate-button-text-color)"
                className="float-right mr-1"
                disabled={
                  selectedIds &&
                    selectedIds.length > 0
                    ? false
                    : true
                }
              />
            )}

            {activeTab == BRAND_GENERAL_TAB && this.showEditButton && this.state.isEditable && (
              <Button
                label="Edit"
                loadingLabel="Editable"
                className="mr-1"
                onClick={() => {
                  this.setState({
                    isEditable: false,
                  });
                }}
              />
            )}
            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>

        <Nav tabs className="admin-tabs">
          {/* General Tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab == BRAND_GENERAL_TAB,
              })}
              onClick={() => {
                this.toggle(BRAND_GENERAL_TAB);
              }}
            >
              {BRAND_GENERAL_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab == PRODUCT_TAB,
              })}
              onClick={() => {
                this.toggle(PRODUCT_TAB);
              }}
            >
              {PRODUCT_TAB}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab == HISTORY_TAB,
              })}
              onClick={() => {
                this.toggle(HISTORY_TAB);
                this._handleTabChange(HISTORY_TAB);
              }}
            >
              {HISTORY_TAB}
            </NavLink>
          </NavItem>
        </Nav>
        {/* tab contents */}
        <TabContent activeTab={activeTab}>
          {activeTab == BRAND_GENERAL_TAB && (
            <TabPane tabId={BRAND_GENERAL_TAB}>
              <div className="tab-content-wrapper">
                <GeneralDetailsTab
                  _handleSubmit={this._handleSubmit}
                  handleStatusChange={this.handleStatusChange}
                  onChangeImageHandler={this.onChangeImageHandler}
                  userImageRemove={this.userImageRemove}
                  handleImageUpload={this.handleImageUpload}
                  push={this.props.history.push}
                  productBrandStatus={productBrandStatus}
                  handleManufactureChange={handleManufactureChange}
                  brandImage={brandImage}
                  brandImageUrl={brandImageUrl}
                  initialValues={initialValues}
                  editable={this.state.isEditable}
                  manufactureOption={this.state.manufactureOption}
                />
              </div>
            </TabPane>
          )}
          {activeTab == PRODUCT_TAB && (
            <TabPane tabId={PRODUCT_TAB} className="w-100">
              <div className="mt-2 mb-3 p-3">
                <ProductList
                  id="allProducts"
                  params={{
                    brand_id: this?.props?.match?.params?.id,
                  }}
                  brand={this?.props?.match?.params?.id}
                  storeId={
                    brandDetails && brandDetails?.store_id
                      ? brandDetails.store_id
                      : this.props.match.params.subtab
                  }
                  history={this.props.history}
                  sortByOption={sortByOption}
                  updateProductStatus={updateProductStatus}
                  handleBulkDelete={handleBulkSelect}
                  selectedCheckBox={selectedCheckBox}
                />
              </div>
            </TabPane>
          )}
          {activeTab === HISTORY_TAB && (
            <TabPane tabId={HISTORY_TAB} className="w-100">
              <ActivityList
                id={this?.props?.match?.params?.id}
                objectId={this?.props?.match?.params?.id}
                object_name={ObjectName.PRODUCT_BRAND}
              />
            </TabPane>
          )}
        </TabContent>
      </>
    );
  }
}

export default connect()(EditBrandDetail);
