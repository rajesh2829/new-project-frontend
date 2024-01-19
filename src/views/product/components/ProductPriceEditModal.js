import React from "react";
import { useDispatch } from "react-redux";
import Currency from "../../../components/Currency";
import DateSelector from "../../../components/Date";
import Drawer from "../../../components/Drawer";
import SaveButton from "../../../components/SaveButton";
import SingleCheckbox from "../../../components/SingleCheckbox";
import Text from "../../../components/Text";
import ProductPriceService from "../../../services/ProductPriceService";
import Percentage from "../../../components/Percentage";

const ProductPriceEditModal = (props) => {
  const {
    isOpen,
    toggle,
    productId,
    priceData,
    priviousBarCode,
    setIsSubmit,
    isSubmit,
    selectedDate,
    showProductPriceEdit,
    isClone,
    handleMrpChange,
    handleDiscountPercentChange,
    salePriceValue,
    mrpValue,
    discountValue,
    handleBarCode,
    handleCostPrice,
    handleIsDefault,
    defaultValue,
    costPriceValue,
    barCodeValue,
    handleDate,
    dateValue,
    handleSalePrice,
  } = props;


  const dispatch = useDispatch();
  const initialValues = {
    mrp: mrpValue ? mrpValue : priceData ? priceData.mrp : "",
    salePrice: salePriceValue
      ? salePriceValue
      : priceData
        ? priceData.salePrice
        : "",
    costPrice: costPriceValue
      ? costPriceValue
      : priceData
        ? priceData.costPrice
        : "",
    barCode: barCodeValue
      ? barCodeValue
      : priviousBarCode
        ? priviousBarCode
        : priceData
          ? priceData.barCode
          : "",
    isDefault: defaultValue
      ? defaultValue
      : priceData
        ? priceData.isDefault
        : false,
    date: dateValue ? dateValue : priceData?.date ? priceData?.date : !priceData ? selectedDate : "",
    discount_percentage: discountValue
      ? discountValue
      : priceData
        ? priceData.discount_percentage
        : "",
  };

  const handleSubmit = async (data) => {
    try {
      data.productId = productId;
      setIsSubmit(true);

      if (priceData && !isClone) {
        dispatch(
          await ProductPriceService.update(
            priceData.id,
            data,
            {
              product_id: productId,
              sort: "id",
              sortDir: "DESC"
            },
            toggle
          )
        );
      } else {
        dispatch(
          await ProductPriceService.create(
            data,
            {
              product_id: productId,
              sort: "id",
              sortDir: "DESC"
            },
            toggle,
            setIsSubmit
          )
        );
        setIsSubmit(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const bulkUpdateBody = (
    <>
      <div className="row">
        <div className="col-12">
          <DateSelector label="Date" name="date" onChange={handleDate} />
        </div>
        <div className="col-12">
          <Currency
            name="mrp"
            label="MRP"
            required
            onInputChange={handleMrpChange}
          />
        </div>
        <div className="col-12">
          <Percentage
            name="discount_percentage"
            label="Discount %"
            onInputChange={handleDiscountPercentChange}
          />
        </div>
        <div className="col-12">
          <Currency name="salePrice" label="Sale Price" required onInputChange={handleSalePrice} />
        </div>
        <div className="col-12">
          <Currency
            name="costPrice"
            label="Cost Price"
            onInputChange={handleCostPrice}
          />
        </div>
        <div className="col-12">
          <Text
            name="barCode"
            label="Barcode"
            required
            onChange={handleBarCode}
          />
        </div>

        <div className="col-12">
          <SingleCheckbox
            name="isDefault"
            label="Set as Default Price"
            className="py-1"
            handleOnChangeSubmit={handleIsDefault}
          />
        </div>
      </div>
    </>
  );

  const editModelFooter = (
    <SaveButton
      type="submit"
      label={priceData && !isClone ? "Update" : "Add"}
      loading={isSubmit == false}
    />
  );

  return (
    <>
      <Drawer
        DrawerBody={bulkUpdateBody}
        DrawerFooter={
          (showProductPriceEdit && priceData) || !priceData
            ? editModelFooter
            : ""
        }
        modelTitle={priceData?.id ? "Edit Price" : "Add Price"}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        handleOpenModal={toggle}
        handleCloseModal={toggle}
        handleDrawerClose={toggle}
        isModalOpen={isOpen}
        enableReinitialize={true}
      />
    </>
  );
};

export default ProductPriceEditModal;
