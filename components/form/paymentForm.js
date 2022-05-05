import React, { useState, useEffect } from "react";
import Select from "react-select";
import Languages from "../languages/languages";
import { paymentType_options } from "../../utils/payment-constant";
import VisaFieldsBox from "./visaFields";

const PaymentForm = ({ formik, language }) => {
  const [paymentMethodOpt, setPaymentMethodOpt] = useState([]);
  const [providerName, setProviderName] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const onPaymentType = (value) => {
    //reset payment method
    setPaymentMethod(null);
    formik.setFieldValue("methodName", "");

    setProviderName(value);
    formik.setFieldValue("providerName", value.value);
    setPaymentMethodOpt(value.subOpts);
  };

  const onPaymentMethod = (value) => {
    setPaymentMethod(value);
    formik.setFieldValue("methodName", value.value);
  };

  /* const onClickTerms = (e) => {
    e.preventDefault();
    setTermsModal(true);
  };

  const onTotalAmount=(value)=>{
    setTotalSelected(value);
    formik.setFieldValue("totalAmount", value.value);

    let item = [{'name':'Motorcycle Lucky Draw Form','amount': JSON.stringify(value.value),'quantity':'1'}];
    formik.setFieldValue("items", JSON.stringify(item));
  } */

  useEffect(() => {
    if(formik.values.totalAmount){
      let item = `[{\"name\":\"Classic Luxury Store Payment Form\",\"amount\": \"${JSON.stringify(formik.values.totalAmount)}\",\"quantity\":\"1\"}]`;
      formik.setFieldValue("items", item);
    }
  }, [formik.values.totalAmount])
  

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4 pt-3">
      <div className="form-group pb-3 relative" language={language}>
        <label htmlFor="customerName">
          {Languages[language].name}
        </label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          {...formik.getFieldProps("customerName")}
          className="form-control"
          placeholder={Languages[language].enter_your_name}
        />
        {formik.touched.customerName && formik.errors.customerName ? (
          <div className="form-group-error">{formik.errors.customerName}</div>
        ) : null}
      </div>
      <div className="form-group pb-3 relative" language={language}>
        <label htmlFor="customerPhone">
          {Languages[language].phone}
        </label>
        <input
          id="customerPhone"
          name="customerPhone"
          type="text"
          {...formik.getFieldProps("customerPhone")}
          className="form-control"
          placeholder={Languages[language].enter_phone}
        />
        {formik.touched.customerPhone && formik.errors.customerPhone ? (
          <div className="form-group-error">{formik.errors.customerPhone}</div>
        ) : null}
      </div>
      {/* <div className="form-group pb-3 relative" language={language}>
        <label htmlFor="customerAddress">
          {Languages[language].address}
        </label>
        <textarea  id="customerAddress"
          name="customerAddress"
          type="text"
          {...formik.getFieldProps("customerAddress")}
          className="form-control"
          placeholder={Languages[language].enter_address1}></textarea>
        {formik.touched.customerAddress && formik.errors.customerAddress ? (
          <div className="form-group-error">{formik.errors.customerAddress}</div>
        ) : null}
      </div> */}
      <div className="form-group pb-3 relative" language={language}>
        <label htmlFor="orderIdNumber">
          {Languages[language].orderIdnumber}
        </label>
        <input
          id="orderIdNumber"
          name="orderIdNumber"
          type="text"
          {...formik.getFieldProps("orderIdNumber")}
          className="form-control"
          placeholder={Languages[language].enter_orderIdNumber}
        />
        {formik.touched.orderIdNumber && formik.errors.orderIdNumber ? (
          <div className="form-group-error">{formik.errors.orderIdNumber}</div>
        ) : null}
      </div>
      <div className="form-group pb-3 relative">
        <label htmlFor="providerName">{Languages[language].totalAmount}</label>
        <input
          id="totalAmount"
          name="totalAmount"
          type="number"
          {...formik.getFieldProps("totalAmount")}
          className="form-control"
          placeholder={Languages[language].enter_totalAmount}
        />
        {formik.touched.totalAmount && formik.errors.totalAmount ? (
          <div className="form-group-error">{formik.errors.totalAmount}</div>
        ) : null}
      </div>
      <div className="form-group pb-3 relative">
        <label htmlFor="providerName">{Languages[language].cbt}</label>
        <Select
          id="providerName"
          instanceId="providerName"
          options={paymentType_options}
          name="providerName"
          placeholder={Languages[language].cbt}
          onChange={(e) => onPaymentType(e)}
          onBlur={() => formik.setFieldTouched("providerName", true)}
          value={providerName}
        />
        {formik.touched.providerName && formik.errors.providerName ? (
          <div className="form-group-error">{formik.errors.providerName}</div>
        ) : null}
      </div>
      <div className="form-group pb-3 relative">
        <label htmlFor="methodName">{Languages[language].cpm}</label>
        <Select
          id="methodName"
          instanceId="methodName"
          options={paymentMethodOpt}
          name="methodName"
          placeholder={Languages[language].cpm}
          onChange={(value) => onPaymentMethod(value)}
          onBlur={() => formik.setFieldTouched("methodName", true)}
          value={paymentMethod}
        />
        {formik.touched.methodName && formik.errors.methodName ? (
          <div className="form-group-error">{formik.errors.methodName}</div>
        ) : null}
      </div>
      {formik.values.providerName == "Visa" ||
      formik.values.providerName == "JCB" ? (
        <VisaFieldsBox formik={formik} language={language} />
      ) : (
        ""
      )}
      <div className="d-inline-block w-100">
        <button
          type="submit"
          className="theme-btn float-right w-100"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting
            ? Languages[language].loading_btn
            : Languages[language].pay_now}
        </button>
      </div>
    </form>
  );
};
export default PaymentForm;

const totalAmt_options = [
  {'value': 999, 'label': '999 Kyats for 1 GB'},
  {'value': 1999, 'label': '1999 Kyats for 2 GB'},
  {'value': 2999, 'label': '2999 Kyats for 3 GB'},
  {'value': 3999, 'label': '3999 Kyats for 4 GB'},
  {'value': 4999, 'label': '4999 Kyats for 5 GB'}
]
