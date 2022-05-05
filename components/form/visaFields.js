import React, { useState } from 'react';
import Languages from "../languages/languages";

const VisaFieldsBox = ({ formik, language }) => {

    return(
        <>
            <div className="row">
                <div className="col-6">
                    <div className="form-group pb-3 relative">
                        <label htmlFor="first_name">{Languages[language].firstName}</label>
                        <input id="first_name" name="billToForeName" type="text" {...formik.getFieldProps('billToForeName')} className="form-control" placeholder={Languages[language].enter_firstName}
                        />
                        {formik.touched.billToForeName && formik.errors.billToForeName ? (
                            <div className="form-group-error">{formik.errors.billToForeName}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group pb-3 relative">
                        <label htmlFor="billToSurName">{Languages[language].lastName}</label>
                        <input id="billToSurName" name="billToSurName" type="text" {...formik.getFieldProps('billToSurName')} className="form-control" placeholder={Languages[language].enter_lastName}
                        />
                        {formik.touched.billToSurName && formik.errors.billToSurName ? (
                            <div className="form-group-error">{formik.errors.billToSurName}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group pb-3 relative">
                        <label htmlFor="email">{Languages[language].email}</label>
                        <input id="email" name="email" type="email" {...formik.getFieldProps('email')} className="form-control" placeholder={Languages[language].enter_email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="form-group-error">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group pb-3 relative">
                        <label htmlFor="address">{Languages[language].address}</label>
                        <input id="address" name="billAddress" type="text" {...formik.getFieldProps('billAddress')} className="form-control" placeholder={Languages[language].enter_address}
                        />
                        {formik.touched.billAddress && formik.errors.billAddress ? (
                            <div className="form-group-error">{formik.errors.billAddress}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group pb-3 relative">
                        <label htmlFor="city">{Languages[language].city}</label>
                        <input id="city" name="billCity" type="text" {...formik.getFieldProps('billCity')} className="form-control" placeholder={Languages[language].enter_city}
                        />
                        {formik.touched.billCity && formik.errors.billCity ? (
                            <div className="form-group-error">{formik.errors.billCity}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
export default VisaFieldsBox;