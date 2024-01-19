import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import Text from "../../../components/Text";
import AddModal from "../../../components/Modal";

import Button from "../../../components/Button";
import * as products from "../../../lib/Products";
import { VendorProductService } from "../../../services/VendorProductService";
class SupplierProductAddModal extends React.Component {
  // Handle Add Vendor Product form submit
  handleSubmit = values => {
    let params = this.props.params;
    VendorProductService.create(values, params);
    this.props.onModalClose();
  };

  render() {
    const { toggle, onModalClose, } = this.props;

    // Form initial values
    const initialValues = {
      name: "",
      status: products.PRODUCT_STATUS_NEW,
    };

    const modalBody = (
      <>
        <Text
          label="Name"
          name="name"
          placeholder="Name"
          required
          notify
        />
      </>
    );

    const Footer = <Button type="submit" label="Add" />;

    return (
      <>
        <AddModal
          isOpen={toggle}
          toggleModalClose={onModalClose}
          modalBody={modalBody}
          modalTitle={"Add Vendor Product"}
          onSubmit={this.handleSubmit}
          modalFooter={Footer}
          initialValues={initialValues}
          hideDefaultButtons />
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dispatch)
  };
}

export default connect(() => {
  return {};
}, mapDispatchToProps)(SupplierProductAddModal);
