import React from "react";
// Components
import Spinner from "../../components/Spinner";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import DeleteModal from "../../components/DeleteModal";
import Form from "../../components/Form";
import Text from "../../components/Text";
import Select from "../../components/Select";
import HorizontalSpace from "../../components/HorizontalSpace";
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/SaveButton";
import toast from "../../components/Toast";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classNames from "classnames";
import ActivityList from "../../components/ActivityList";

// Constants
import * as statusConstant from "../../components/constants/status";
// Services
import productCategoryService from "../../services/ProductCategoryService";
import CategoryProductForm from "./components/ProductForm";
import ObjectName from "../../helpers/ObjectName";
import CategoryService from "../../services/CategoryService";
import Permission from "../../helpers/Permission";
import { hasPermission } from "../../services/UserRolePermissionService";
import Action from "../../components/Action";
import ProductSelectModal from "../../components/ProductSelectModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AddButton from "../../components/AddButton";
import { fetchList } from "../../actions/table";
import { endpoints } from "../../api/endPoints";
import Button from "../../components/Button";

// Constants Name For TABS
const Tab = {
  GENERAL: "General",
  PRODUCT: "Products",
  HISTORY: "History",
};

class EditProductCategory extends React.Component {
  // State Values
  state = {
    productCategoryDetails: {},
    isLoading: false,
    submitResponse: false,
    statusResponse: false,
    openDeleteModal: false,
    openDelete: false,
    addProductModal: false,
    MultiSelectProduct: [],
    activeTab: this.selectedTab ? this.selectedTab : Tab.GENERAL,
    // Status options
    statusOptions: [
      {
        value: statusConstant.ACTIVE,
        label: "Active",
      },
      {
        value: statusConstant.IN_ACTIVE,
        label: "InActive",
      },
    ],
    excludeIds: [],
    editable: true
  };

  // Getting the product category Id
  productCategoryId = this.props.match.params.id;

  // Initializing Component Did Mount
  componentDidMount() {
    this.getProductCategory();
    this.getProductList();

    this.setState({ activeTab: this.selectedTab ? this.selectedTab : Tab.GENERAL, })
  }

  param = new URLSearchParams(this.props.history.location.search);
  selectedTab = this.param.get("tab");
  showEditButton = hasPermission(Permission.PRODUCT_CATEGORY_EDIT);

  // Get Product Category Details
  getProductCategory = async () => {
    try {
      this.setState({ isLoading: true });
      const productCategoryDetails =
        await CategoryService.get(
          this.productCategoryId
        );
      this.setState({
        productCategoryDetails: productCategoryDetails.data,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ isLoading: false });
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  addProductToggle = () => {
    this.setState({ addProductModal: false, rowValue: "" });
  };

  multiselect = (values) => {
    this.setState({ MultiSelectProduct: values });
    this.setState({
      excludeIds: [
        values,
        ...this.state.excludeIds,

      ]
    })
  };

  // User delete action handler
  handleProductCategoryDelete = async () => {
    try {
      const data = await CategoryService.delete(
        this.productCategoryId
      );
      toast.success(data.message);
      this.props.history.push("/categories");
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
    }
  };

  // Handle Product Category form submit
  _handleSubmit = async (values) => {
    const newValues = Object.assign({}, values);
    newValues.status =
      typeof newValues.status === "object"
        ? newValues.status.value
        : newValues.status;
    try {
      const { submitResponse } = this.state;
      this.setState({ submitResponse: !submitResponse });
      const response =
        await CategoryService.update(
          this.productCategoryId,
          newValues
        );
      toast.success(response.message);
      this.setState({ submitResponse: false })
      this.setState({ editable: true })
    } catch (err) {
      const res = err.response;
      res && toast.error(res.data.message);
      this.setState({ submitResponse: false });
      this.setState({ editable: true })
    }
  };

  handleSubmit = async (values) => {
    const createData = new FormData();
    createData.append("productIds", this.state.MultiSelectProduct);
    createData.append("category_id", this?.props?.match?.params?.id);
    let params = {
      categoryId: this?.props?.match?.params?.id,
      sort: "name",
      sortDir: "ASC",
    };
    await productCategoryService.addProduct(createData, params, (res) => {
      if (res) {
        this.props.actions.dispatch(
          fetchList(
            "categoryProduct",
            `${endpoints().categoryAPI}/productList/search`,
            1,
            25,
            params
          ))
      }

    })
    this.setState({ addProductModal: false })
  };

  getProductList = async () => {
    const id = this?.props?.match?.params?.id

    const data = await productCategoryService.categoryProduct(id)
    const productIds = []
    data && data.forEach(element => {
      productIds.push(element?.product_id)
    });
    this.setState({ excludeIds: productIds })
  }

  // Toggle tab
  toggle = (tab) => {
    this.setState({ activeTab: tab });
  };

  _handleTabChange = (tab) => {
    this.props.history.push(`?tab=${tab}`);
  };

  render() {

    // Getting the product category Id
    let id = this.props.match.params.id;

    // To render the state values
    const {
      productCategoryDetails,
      isLoading,
      statusOptions,
      openDeleteModal,
      activeTab,
    } = this.state;

    const actionsMenuList = [
      {
        value: "delete",
        label: "Delete",
      },
    ];

    // Spinner for isLoading
    if (isLoading) {
      return <Spinner />;
    }

    // Bread crumb list
    const breadcrumbList = [
      { label: "Home", link: "/locationDashboard" },
      {
        label: "Categories",
        link: "/categories",
      },
      {
        label: "Category Details",
        link: "",
      },
    ];

    const handleActionChange = (e) => {
      if (e == "delete") {
        this.setState({ openDeleteModal: true });
      }
    };

    // Form initial values
    const initialValues = {
      name: productCategoryDetails.name,
      status: {
        label: productCategoryDetails.status,
        value: productCategoryDetails.status,
      },
    };

    let showHistory = hasPermission(Permission.PRODUCT_CATEGORY_HISTORY_VIEW);

    const productOnClick = () => {
      this.setState({ addProductModal: true });
    }

    return (
      <>
        {/* Delete Modal */}
        <DeleteModal
          isOpen={openDeleteModal}
          title="Delete category"
          toggle={() => {
            this.setState({ openDeleteModal: false });
          }}
          label={productCategoryDetails.name}
          deleteFunction={() =>
            this.handleProductCategoryDelete(productCategoryDetails.id)
          }
        />
        <ProductSelectModal
          modalOpen={this.state.addProductModal}
          toggle={this.addProductToggle}
          toggleModalClose={this.addProductToggle}
          BulkSelect={this.multiselect}
          history={history}
          handleSubmit={this.handleSubmit}
          params={{ excludeIds: this.state.excludeIds }}
        />
        {/* Bread Crumb section */}
        <BreadCrumb list={breadcrumbList} />
        <div className="d-flex justify-content-between">
          <PageTitle
            label={productCategoryDetails.name}

          />
          <div className="d-flex">
            {activeTab === Tab.GENERAL && this.showEditButton && this.state.editable && (
              <Button
                label="Edit"
                onClick={() => {
                  this.setState({ editable: false })
                }}
              />
            )}
            <AddButton
              label={"Add  Product"}
              className="mx-2 p-2"
              onClick={productOnClick}
            />

            <Action
              dropdownLinks={actionsMenuList}
              handleChange={handleActionChange}
            />
          </div>
        </div>

        {/* Nav */}
        <Nav tabs className="admin-tabs">
          {/* General Tab */}
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab == Tab.GENERAL,
              })}
              onClick={() => {
                this.toggle(Tab.GENERAL);
                this._handleTabChange(Tab.GENERAL);
              }}
            >
              {Tab.GENERAL}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({
                active: activeTab == Tab.PRODUCT,
              })}
              onClick={() => {
                this.toggle(Tab.PRODUCT);
                this._handleTabChange(Tab.PRODUCT);
              }}
            >
              {Tab.PRODUCT}
            </NavLink>
          </NavItem>

          {showHistory && <NavItem>
            <NavLink
              className={classNames({
                active: activeTab == Tab.HISTORY,
              })}
              onClick={() => {
                this.toggle(Tab.HISTORY);
                this._handleTabChange(Tab.HISTORY);
              }}
            >
              {Tab.HISTORY}
            </NavLink>
          </NavItem>}
        </Nav>

        {/* tab contents */}
        <TabContent activeTab={activeTab}>
          {activeTab == Tab.GENERAL &&
            <TabPane tabId={Tab.GENERAL}>
              <div className="tab-content-wrapper">
                {/* Form Section */}
                <Form initialValues={initialValues} onSubmit={this._handleSubmit}>
                  {/* Page Title Section */}

                  {/* Product category edit form */}
                  <div className="card border-0 p-3">
                    <div className="row">
                      {/* Product category form fields */}
                      <div className="col-lg-6">
                        <Text
                          label="Name"
                          name="name"
                          placeholder="Name"
                          required
                          disabled={this.state.editable}
                        />
                        <Select
                          label="Status"
                          name="status"
                          placeholder="Select Status"
                          options={statusOptions}
                          isDisabled={this.state.editable}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Space between the form fields and buttons */}
                  <HorizontalSpace bottom="2">
                    {/* Save Button */}
                    {!this.state.editable && <> <SaveButton label="Save" />
                      <CancelButton
                        onClick={() => {
                          this.props.history.push("/categories");
                        }}
                      /></>}
                  </HorizontalSpace>
                </Form>
              </div>
            </TabPane>}
          {activeTab == Tab.PRODUCT &&
            <TabPane tabId={Tab.PRODUCT} className="w-100">
              <div className="mt-2 mb-3 p-3">
                <CategoryProductForm
                  categoryId={
                    productCategoryDetails && productCategoryDetails?.id
                      ? productCategoryDetails?.id
                      : ""
                  }
                  categoryName={
                    productCategoryDetails && productCategoryDetails?.name
                      ? productCategoryDetails?.name
                      : ""
                  }
                  CategoryStatus={
                    productCategoryDetails && productCategoryDetails?.status
                      ? productCategoryDetails?.status
                      : ""
                  }
                  getProductList={this.getProductList}
                />
              </div>
            </TabPane>}
          {showHistory && activeTab == Tab.HISTORY &&
            <TabPane tabId={Tab.HISTORY} className="w-100">
              <ActivityList
                id={id}
                objectId={id}
                object_name={ObjectName.CATEGORY}
              />
            </TabPane>}
        </TabContent>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        dispatch,
      },
      dispatch
    ),
  };
}

const mapStateToProps = (state) => {
  const reduxTable = state.table;

  return {
  };
};

export default connect(() => {
  return mapStateToProps;
}, mapDispatchToProps)(EditProductCategory);

