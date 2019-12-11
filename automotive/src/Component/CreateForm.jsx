import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const EmployeeSchema = Yup.object().shape({
    ssn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    surname: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    phone: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('This field is required.'),
    position: Yup.mixed().oneOf(['Ordinary', 'Technician'])
        .required('This field is required.'),
    salary: Yup.number()
        .min(6000, 'Too small!')
        .max(9999999, 'Too Much!')
        .required('This field is required.'),
    startdate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid")
        .required('This field is required.'),
    deptid: Yup.number()
        .min(1, 'This dept is not exist')
        .required('This field is required.'),
    branchid: Yup.number()
        .min(1, 'This branch is not exist')
        .required('This field is required.'),
    specialize: Yup.string()
        .when('position',{
            is: 'Technician',
            then: Yup.string().required('This field is required.'),
        })
        .min(2, 'Too Short!'),
});

const CustomerSchema = Yup.object().shape({
    ssn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    phone: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('This field is required.'),

});

const CustomerOrderSchema = Yup.object().shape({
    orderid: Yup.number()
        .min(1, 'This order is not exist'),
    totalprice: Yup.number()
        .min(1, "This price is invalid")
        .max(9999999, "This price is invalid")
        .required('This field is required'),
    status: Yup.mixed().oneOf(['Waiting','In Progress', 'Finished'])
        .required('This field is required.'),
    paymethod: Yup.mixed().oneOf(['Cash', 'Credit Card', 'Bank Transfer', 'QR Payment'])
        .required('This field is required.'),
    startdate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid")
        .required('This field is required.'),
    enddate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid"),
    paymentdate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid"),
    employeessn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    servicetype: Yup.mixed().oneOf(['Fix', 'Modify', 'Build'])
        .required('This field is required.'),
    customerssn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),

});

const SupplierOrderSchema = Yup.object().shape({
    orderid: Yup.number()
        .min(1, 'This order is not exist'),
    totalprice: Yup.number()
        .min(1, "This price is invalid")
        .max(9999999, "This price is invalid")
        .required('This field is required'),
    status: Yup.mixed().oneOf(['Waiting','Transporting', 'Received'])
        .required('This field is required.'),
    paymethod: Yup.mixed().oneOf(['Cash', 'Credit Card', 'Bank Transfer', 'QR Payment'])
        .required('This field is required.'),
    startdate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid")
        .required('This field is required.'),
    enddate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid"),
    paymentdate: Yup.date()
        .min(new Date('01/01/17'), "Date is not valid")
        .max(new Date(), "Future Date is not valid"),
    employeessn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    amount: Yup.number()
        .min(1, "The amount has to be at least 1")
        .required('This field is required.'),
    supplierssn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),

});


const CarSchema = Yup.object().shape({
    licenseplate: Yup.string()
        .min(5, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    brand: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    model: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    color: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    customerssn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    orderid: Yup.number()
        .min(1, 'This order is not exist')
        .required('This field is required.'),

});


const MainpartSchema = Yup.object().shape({
    mpid: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long"),
    mainpartname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    width: Yup.number()
        .min(0.01, "Width has to be more than 0")
        .required('This field is required.'),
    height: Yup.number()
        .min(0.01, "Height has to be more than 0")
        .required('This field is required.'),
    depth: Yup.number()
        .min(0.01, "Depth has to be more than 0")
        .required('This field is required.'),
    radius: Yup.number()
        .min(0.01, "Radius has to be more than 0"),
    buyprice: Yup.number()
        .min(1, "Buyprice has to be more than 1")
        .required('This field is required.'),
    sellprice: Yup.number()
        .min(1, "Sellprice has to be more than 1")
        .required('This field is required.'),
    orderid: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
});

const SubpartSchema = Yup.object().shape({
    spid: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long"),
    subpartname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    width: Yup.number()
        .min(0.01, "Width has to be more than 0")
        .required('This field is required.'),
    height: Yup.number()
        .min(0.01, "Height has to be more than 0")
        .required('This field is required.'),
    depth: Yup.number()
        .min(0.01, "Depth has to be more than 0")
        .required('This field is required.'),
    radius: Yup.number()
        .min(0.01, "Radius has to be more than 0"),
    buyprice: Yup.number()
        .min(1, "Buyprice has to be more than 1")
        .required('This field is required.'),
    sellprice: Yup.number()
        .min(1, "Sellprice has to be more than 1")
        .required('This field is required.'),
    mpid: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    orderid: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),

});


const SupplierSchema = Yup.object().shape({
    ssn: Yup.number()
        .min(1, "Too Short!")
        .max(99999999999999999999, "Too Long")
        .required('This field is required.'),
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    phone: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('This field is required.'),
    addressno: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    street: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    province: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('This field is required.'),
    city: Yup.string()
        .min(1, 'Too small!')
        .max(99, 'Too Much!')
        .required('This field is required.'),
    zipcode: Yup.number()
        .min(10000, "Too Short!")
        .max(99999, "Too Long")
        .required('This field is required.'),
    
});




function FormFormat(props) {
    return (
        <div>
            <div className="row justify-content-center" >
                <div className="col-md-12">
                    <div className="row justify-content-center">
                        <div className="col-md-12" >
                            {/* REGISTER */}
            </div>
                        <div className="col-md-12">
                            {Formtype(props)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormFormat;

function Formtype(props) {
    if (props.type === "Employee"){
    return <Formik initialValues={{
        ssn: props.bfEdit === '' ? '': props.bfEdit.SSN,
        firstname: props.bfEdit === '' ? '': props.bfEdit.FName,
        surname: props.bfEdit === '' ? '': props.bfEdit.LName,
        phone: props.bfEdit === '' ? '': props.bfEdit.Phone,
        position: props.bfEdit === '' ? '': props.bfEdit.Position,
        salary: props.bfEdit === '' ? '': props.bfEdit.Salary,
        startdate: props.bfEdit === '' ? '': props.bfEdit.StartDate,
        deptid: props.bfEdit === '' ? '': props.bfEdit.DeptID,
        branchid: props.bfEdit === '' ? '': props.bfEdit.BranchID,
        specialize: props.bfEdit === '' ? '': props.bfEdit.Specialize
    }} validationSchema={EmployeeSchema} onSubmit={values => {
        // same shape as initial values
        props.onSubmit(values);
        console.log(values);
    } }>
        {({ errors, touched }) => (<Form>
            {(props.bfEdit==='') && <div className="form-group">
                <label htmlFor="ssn">SSN</label>
                <Field name="ssn" type="number" className={`form-control ${touched.ssn ? errors.ssn ? 'is-invalid' : 'is-valid' : ''}`} id="ssn" placeholder="Enter SSN" />
                <ErrorMessage component="div" name="ssn" className="invalid-feedback" />
            </div>}
            <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                <Field name="firstname" type="text" className={`form-control ${touched.firstname ? errors.firstname ? 'is-invalid' : 'is-valid' : ''}`} id="firstname" placeholder="Enter Firstname" />
                <ErrorMessage component="div" name="firstname" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <Field name="surname" type="text" className={`form-control ${touched.surname ? errors.surname ? 'is-invalid' : 'is-valid' : ''}`} id="surname" placeholder="Enter Surname" />
                <ErrorMessage component="div" name="surname" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Field name="phone" type="text" className={`form-control ${touched.phone ? errors.phone ? 'is-invalid' : 'is-valid' : ''}`} id="phone" placeholder="Enter Phone number" />
                <ErrorMessage component="div" name="phone" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="position">Position</label>
                <Field name="position" type="text" className={`form-control ${touched.position ? errors.position ? 'is-invalid' : 'is-valid' : ''}`} id="position" placeholder="Enter Position" />
                <ErrorMessage component="div" name="position" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <Field name="salary" type="number" className={`form-control ${touched.salary ? errors.salary ? 'is-invalid' : 'is-valid' : ''}`} id="salary" placeholder="Enter Salary" />
                <ErrorMessage component="div" name="salary" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="startdate">Start date</label>
                <Field name="startdate" type="date" className={`form-control ${touched.startdate ? errors.startdate ? 'is-invalid' : 'is-valid' : ''}`} id="startdate" placeholder="Enter Start date" />
                <ErrorMessage component="div" name="startdate" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="deptid">Department ID</label>
                <Field name="deptid" type="number" className={`form-control ${touched.deptid ? errors.deptid ? 'is-invalid' : 'is-valid' : ''}`} id="deptid" placeholder="Enter Department ID" />
                <ErrorMessage component="div" name="deptid" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="branchid">Branch ID</label>
                <Field name="branchid" type="number" className={`form-control ${touched.branchid ? errors.branchid ? 'is-invalid' : 'is-valid' : ''}`} id="branchid" placeholder="Enter Branch ID" />
                <ErrorMessage component="div" name="branchid" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="specialize">Specialize</label>
                <Field name="specialize" type="text" className={`form-control ${touched.specialize ? errors.specialize ? 'is-invalid' : 'is-valid' : ''}`} id="specialize" placeholder="Enter Specialize" />
                <ErrorMessage component="div" name="specialize" className="invalid-feedback" />
            </div>

            <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
        </Form>)}
    </Formik>;
    }

    else if (props.type === "Customer"){
    return <Formik initialValues={{
        ssn: props.bfEdit === '' ? '': props.bfEdit.SSN,
        name: props.bfEdit === '' ? '': props.bfEdit.Name,
        phone: props.bfEdit === '' ? '': props.bfEdit.Phone,
    }} validationSchema={CustomerSchema} onSubmit={values => {
        // same shape as initial values
        props.onSubmit(values);
        console.log(values);
    } }>
        {({ errors, touched }) => (<Form>
            {(props.bfEdit==='') && <div className="form-group">
                <label htmlFor="ssn">SSN</label>
                <Field name="ssn" type="number" className={`form-control ${touched.ssn ? errors.ssn ? 'is-invalid' : 'is-valid' : ''}`} id="ssn" placeholder="Enter SSN" />
                <ErrorMessage component="div" name="ssn" className="invalid-feedback" />
            </div>}
            <div className="form-group">
                <label htmlFor="name">Fisrtname Surname</label>
                <Field name="name" type="text" className={`form-control ${touched.name ? errors.name ? 'is-invalid' : 'is-valid' : ''}`} id="name" placeholder="Enter Name" />
                <ErrorMessage component="div" name="name" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Field name="phone" type="text" className={`form-control ${touched.phone ? errors.phone ? 'is-invalid' : 'is-valid' : ''}`} id="phone" placeholder="Enter Phone number" />
                <ErrorMessage component="div" name="phone" className="invalid-feedback" />
            </div>

            <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
        </Form>)}
    </Formik>;
    }

    else if (props.type === "Customer Order"){ 
        return <Formik initialValues={{
            orderid: props.bfEdit === '' ? '': props.bfEdit.OrderID,
            totalprice: props.bfEdit === '' ? '': props.bfEdit.TotalPrice,
            status: props.bfEdit === '' ? '': props.bfEdit.Status,
            paymethod: props.bfEdit === '' ? '': props.bfEdit.Paymethod,
            startdate: props.bfEdit === '' ? '': props.bfEdit.StartDate,
            enddate: props.bfEdit === '' ? '': props.bfEdit.EndDate,
            paymentdate: props.bfEdit === '' ? '': props.bfEdit.PaymentDate,
            employeessn: props.bfEdit === '' ? '': props.bfEdit.EmployeeSSN,
            servicetype: props.bfEdit === '' ? '': props.bfEdit.ServiceType,
            customerssn: props.bfEdit === '' ? '': props.bfEdit.CustomerSSN,
            
        }} validationSchema={CustomerOrderSchema} onSubmit={values => {
            // same shape as initial values
            props.onSubmit(values);
            console.log(values);
        } }>
            {({ errors, touched }) => (<Form>
                
                
                {<div className="form-group">
                    <label htmlFor="totalprice">Total Price</label>
                    <Field name="totalprice" type="number" className={`form-control ${touched.totalprice ? errors.totalprice ? 'is-invalid' : 'is-valid' : ''}`} id="totalprice" placeholder="Enter Total Price" />
                    <ErrorMessage component="div" name="totalprice" className="invalid-feedback" />
                </div>}
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <Field name="status" type="text" className={`form-control ${touched.status ? errors.status ? 'is-invalid' : 'is-valid' : ''}`} id="status" placeholder="Enter Status" />
                    <ErrorMessage component="div" name="status" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="paymethod">Payment Method</label>
                    <Field name="paymethod" type="text" className={`form-control ${touched.paymethod ? errors.paymethod ? 'is-invalid' : 'is-valid' : ''}`} id="paymethod" placeholder="Enter Payment Method" />
                    <ErrorMessage component="div" name="paymethod" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="startdate">Start date</label>
                    <Field name="startdate" type="date" className={`form-control ${touched.startdate ? errors.startdate ? 'is-invalid' : 'is-valid' : ''}`} id="startdate" placeholder="Enter Start date" />
                    <ErrorMessage component="div" name="startdate" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="enddate">End date</label>
                    <Field name="enddate" type="date" className={`form-control ${touched.enddate ? errors.enddate ? 'is-invalid' : 'is-valid' : ''}`} id="enddate" placeholder="Enter End date" />
                    <ErrorMessage component="div" name="enddate" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentdate">Payment date</label>
                    <Field name="paymentdate" type="date" className={`form-control ${touched.paymentdate ? errors.paymentdate ? 'is-invalid' : 'is-valid' : ''}`} id="paymentdate" placeholder="Enter Payment date" />
                    <ErrorMessage component="div" name="paymentdate" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="employeessn">Employee SSN</label>
                    <Field name="employeessn" type="number" className={`form-control ${touched.employeessn ? errors.employeessn ? 'is-invalid' : 'is-valid' : ''}`} id="employeessn" placeholder="Enter Employee SSN" />
                    <ErrorMessage component="div" name="employeessn" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="servicetype">Service type</label>
                    <Field name="servicetype" type="text" className={`form-control ${touched.servicetype ? errors.servicetype ? 'is-invalid' : 'is-valid' : ''}`} id="servicetype" placeholder="Enter Service type" />
                    <ErrorMessage component="div" name="servicetype" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="customerssn">Customer SSN</label>
                    <Field name="customerssn" type="number" className={`form-control ${touched.customerssn ? errors.customerssn ? 'is-invalid' : 'is-valid' : ''}`} id="customerssn" placeholder="Enter Customer SSN" />
                    <ErrorMessage component="div" name="customerssn" className="invalid-feedback" />
                </div>
    
                <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
            </Form>)}
        </Formik>;
        }

        else if (props.type === "Supplier Order"){
            return <Formik initialValues={{
                orderid: props.bfEdit === '' ? '': props.bfEdit.OrderID,
                totalprice: props.bfEdit === '' ? '': props.bfEdit.TotalPrice,
                status: props.bfEdit === '' ? '': props.bfEdit.Status,
                paymethod: props.bfEdit === '' ? '': props.bfEdit.Paymethod,
                startdate: props.bfEdit === '' ? '': props.bfEdit.StartDate,
                enddate: props.bfEdit === '' ? '': props.bfEdit.EndDate,
                paymentdate: props.bfEdit === '' ? '': props.bfEdit.PaymentDate,
                employeessn: props.bfEdit === '' ? '': props.bfEdit.EmployeeSSN,
                amount: props.bfEdit === '' ? '': props.bfEdit.Amount,
                supplierssn: props.bfEdit === '' ? '': props.bfEdit.SupplierSSN,
            }} validationSchema={SupplierOrderSchema} onSubmit={values => {
                // same shape as initial values
                props.onSubmit(values);
                console.log(values);
            } }>
                {({ errors, touched }) => (<Form>
                    
                    <div className="form-group">
                        <label htmlFor="totalprice">Total Price</label>
                        <Field name="totalprice" type="number" className={`form-control ${touched.totalprice ? errors.totalprice ? 'is-invalid' : 'is-valid' : ''}`} id="totalprice" placeholder="Enter Total Price" />
                        <ErrorMessage component="div" name="totalprice" className="invalid-feedback" />
                     </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <Field name="status" type="text" className={`form-control ${touched.status ? errors.status ? 'is-invalid' : 'is-valid' : ''}`} id="status" placeholder="Enter Status" />
                        <ErrorMessage component="div" name="status" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymethod">Payment Method</label>
                        <Field name="paymethod" type="text" className={`form-control ${touched.paymethod ? errors.paymethod ? 'is-invalid' : 'is-valid' : ''}`} id="paymethod" placeholder="Enter Payment Method" />
                        <ErrorMessage component="div" name="paymethod" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startdate">Start date</label>
                        <Field name="startdate" type="date" className={`form-control ${touched.startdate ? errors.startdate ? 'is-invalid' : 'is-valid' : ''}`} id="startdate" placeholder="Enter Start date" />
                        <ErrorMessage component="div" name="startdate" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="enddate">End date</label>
                        <Field name="enddate" type="date" className={`form-control ${touched.enddate ? errors.enddate ? 'is-invalid' : 'is-valid' : ''}`} id="enddate" placeholder="Enter End date" />
                        <ErrorMessage component="div" name="enddate" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentdate">Payment date</label>
                        <Field name="paymentdate" type="date" className={`form-control ${touched.paymentdate ? errors.paymentdate ? 'is-invalid' : 'is-valid' : ''}`} id="paymentdate" placeholder="Enter Payment date" />
                        <ErrorMessage component="div" name="paymentdate" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="employeessn">Employee SSN</label>
                        <Field name="employeessn" type="number" className={`form-control ${touched.employeessn ? errors.employeessn ? 'is-invalid' : 'is-valid' : ''}`} id="employeessn" placeholder="Enter Employee SSN" />
                        <ErrorMessage component="div" name="employeessn" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <Field name="amount" type="number" className={`form-control ${touched.amount ? errors.amount ? 'is-invalid' : 'is-valid' : ''}`} id="amount" placeholder="Enter Amount" />
                        <ErrorMessage component="div" name="amount" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplierssn">Supplier SSN</label>
                        <Field name="supplierssn" type="number" className={`form-control ${touched.supplierssn ? errors.supplierssn ? 'is-invalid' : 'is-valid' : ''}`} id="supplierssn" placeholder="Enter Supplier SSN" />
                        <ErrorMessage component="div" name="supplierssn" className="invalid-feedback" />
                    </div>
        
                    <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                </Form>)}
            </Formik>;
            }


            else if (props.type === "Car"){ 
                return <Formik initialValues={{
                    licenseplate: props.bfEdit === '' ? '': props.bfEdit.LicensePlate,
                    brand: props.bfEdit === '' ? '': props.bfEdit.Brand,
                    model: props.bfEdit === '' ? '': props.bfEdit.Model,
                    color: props.bfEdit === '' ? '': props.bfEdit.Color,
                    customerssn: props.bfEdit === '' ? '': props.bfEdit.CustomerSSN,
                    orderid: props.bfEdit === '' ? '': props.bfEdit.OrderID,
                    
                }} validationSchema={CarSchema} onSubmit={values => {
                    // same shape as initial values
                    props.onSubmit(values);
                    console.log(values);
                } }>
                    {({ errors, touched }) => (<Form>
                        
                        
                        <div className="form-group">
                            <label htmlFor="licenseplate">License Plate</label>
                            <Field name="licenseplate" type="text" className={`form-control ${touched.licenseplate ? errors.licenseplate ? 'is-invalid' : 'is-valid' : ''}`} id="licenseplate" placeholder="Enter License Plate" />
                            <ErrorMessage component="div" name="licenseplate" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <Field name="brand" type="text" className={`form-control ${touched.brand ? errors.brand ? 'is-invalid' : 'is-valid' : ''}`} id="brand" placeholder="Enter Brand" />
                            <ErrorMessage component="div" name="brand" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="model">Model</label>
                            <Field name="model" type="text" className={`form-control ${touched.model ? errors.model ? 'is-invalid' : 'is-valid' : ''}`} id="model" placeholder="Enter Model" />
                            <ErrorMessage component="div" name="model" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <Field name="color" type="text" className={`form-control ${touched.color ? errors.color ? 'is-invalid' : 'is-valid' : ''}`} id="color" placeholder="Enter Color" />
                            <ErrorMessage component="div" name="color" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerssn">Customer SSN</label>
                            <Field name="customerssn" type="number" className={`form-control ${touched.customerssn ? errors.customerssn ? 'is-invalid' : 'is-valid' : ''}`} id="customerssn" placeholder="Enter Customer SSN" />
                            <ErrorMessage component="div" name="customerssn" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerssn">Order ID</label>
                            <Field name="orderid" type="number" className={`form-control ${touched.orderid ? errors.orderid ? 'is-invalid' : 'is-valid' : ''}`} id="orderid" placeholder="Enter Order ID" />
                            <ErrorMessage component="div" name="orderid" className="invalid-feedback" />
                        </div>
            
                        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                    </Form>)}
                </Formik>;
                }

            else if (props.type === "Main Part"){
                return <Formik initialValues={{
                    mpid: props.bfEdit === '' ? '': props.bfEdit.MPid,
                    mainpartname: props.bfEdit === '' ? '': props.bfEdit.MPName,
                    width: props.bfEdit === '' ? '': props.bfEdit.Width,
                    height: props.bfEdit === '' ? '': props.bfEdit.Height,
                    depth: props.bfEdit === '' ? '': props.bfEdit.Depth,
                    radius: props.bfEdit === '' ? '': props.bfEdit.Radius,
                    buyprice: props.bfEdit === '' ? '': props.bfEdit.BuyPrice,
                    sellprice: props.bfEdit === '' ? '': props.bfEdit.SellPrice,
                    orderid: props.bfEdit === '' ? '': props.bfEdit.OrderID,
                }} validationSchema={MainpartSchema} onSubmit={values => {
                    // same shape as initial values
                    props.onSubmit(values);
                    console.log(values);
                } }>
                    {({ errors, touched }) => (<Form>
                        <div className="form-group">
                            <label htmlFor="mainpartname">Main Part name</label>
                            <Field name="mainpartname" type="text" className={`form-control ${touched.mainpartname ? errors.mainpartname ? 'is-invalid' : 'is-valid' : ''}`} id="mainpartname" placeholder="Enter Main Part name" />
                            <ErrorMessage component="div" name="mainpartname" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="width">Width(mm.)</label>
                            <Field name="width" type="number" className={`form-control ${touched.width ? errors.width ? 'is-invalid' : 'is-valid' : ''}`} id="width" placeholder="Enter Width" />
                            <ErrorMessage component="div" name="width" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height(mm.)</label>
                            <Field name="height" type="number" className={`form-control ${touched.height ? errors.height ? 'is-invalid' : 'is-valid' : ''}`} id="height" placeholder="Enter Height" />
                            <ErrorMessage component="div" name="height" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="depth">Depth(mm.)</label>
                            <Field name="depth" type="number" className={`form-control ${touched.depth ? errors.depth ? 'is-invalid' : 'is-valid' : ''}`} id="depth" placeholder="Enter Depth" />
                            <ErrorMessage component="div" name="depth" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="radius">Radius(mm.)</label>
                            <Field name="radius" type="number" className={`form-control ${touched.radius ? errors.radius ? 'is-invalid' : 'is-valid' : ''}`} id="radius" placeholder="Enter Radius" />
                            <ErrorMessage component="div" name="radius" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="buyprice">Buy price(฿)</label>
                            <Field name="buyprice" type="number" className={`form-control ${touched.buyprice ? errors.buyprice ? 'is-invalid' : 'is-valid' : ''}`} id="buyprice" placeholder="Enter Buy price" />
                            <ErrorMessage component="div" name="buyprice" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sellprice">Sell price(฿)</label>
                            <Field name="sellprice" type="number" className={`form-control ${touched.sellprice ? errors.sellprice ? 'is-invalid' : 'is-valid' : ''}`} id="sellprice" placeholder="Enter Sell price" />
                            <ErrorMessage component="div" name="sellprice" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="orderid">Order ID</label>
                            <Field name="orderid" type="number" className={`form-control ${touched.orderid ? errors.orderid ? 'is-invalid' : 'is-valid' : ''}`} id="orderid" placeholder="Enter Order ID" />
                            <ErrorMessage component="div" name="orderid" className="invalid-feedback" />
                        </div>
            
                        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                    </Form>)}
                </Formik>;
                }

                else if (props.type === "Sub Part"){
                    return <Formik initialValues={{
                        spid: props.bfEdit === '' ? '': props.bfEdit.SPid,
                        subpartname: props.bfEdit === '' ? '': props.bfEdit.SPName,
                        width: props.bfEdit === '' ? '': props.bfEdit.Width,
                        height: props.bfEdit === '' ? '': props.bfEdit.Height,
                        depth: props.bfEdit === '' ? '': props.bfEdit.Depth,
                        radius: props.bfEdit === '' ? '': props.bfEdit.Radius,
                        buyprice: props.bfEdit === '' ? '': props.bfEdit.BuyPrice,
                        sellprice: props.bfEdit === '' ? '': props.bfEdit.SellPrice,
                        mpid: props.bfEdit === '' ? '': props.bfEdit.MPid,
                        orderid: props.bfEdit === '' ? '': props.bfEdit.OrderID,

                    }} validationSchema={SubpartSchema} onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                        props.onSubmit(values);
                    } }>
                        {({ errors, touched }) => (<Form>
                            <div className="form-group">
                                <label htmlFor="subpartname">Sub Part name</label>
                                <Field name="subpartname" type="text" className={`form-control ${touched.subpartname ? errors.subpartname ? 'is-invalid' : 'is-valid' : ''}`} id="subpartname" placeholder="Enter Sub Part name" />
                                <ErrorMessage component="div" name="subpartname" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="width">Width(mm.)</label>
                                <Field name="width" type="number" className={`form-control ${touched.width ? errors.width ? 'is-invalid' : 'is-valid' : ''}`} id="width" placeholder="Enter Width" />
                                <ErrorMessage component="div" name="width" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="height">Height(mm.)</label>
                                <Field name="height" type="number" className={`form-control ${touched.height ? errors.height ? 'is-invalid' : 'is-valid' : ''}`} id="height" placeholder="Enter Height" />
                                <ErrorMessage component="div" name="height" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="depth">Depth(mm.)</label>
                                <Field name="depth" type="number" className={`form-control ${touched.depth ? errors.depth ? 'is-invalid' : 'is-valid' : ''}`} id="depth" placeholder="Enter Depth" />
                                <ErrorMessage component="div" name="depth" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="radius">Radius(mm.)</label>
                                <Field name="radius" type="number" className={`form-control ${touched.radius ? errors.radius ? 'is-invalid' : 'is-valid' : ''}`} id="radius" placeholder="Enter Radius" />
                                <ErrorMessage component="div" name="radius" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="buyprice">Buy price(฿)</label>
                                <Field name="buyprice" type="number" className={`form-control ${touched.buyprice ? errors.buyprice ? 'is-invalid' : 'is-valid' : ''}`} id="buyprice" placeholder="Enter Buy price" />
                                <ErrorMessage component="div" name="buyprice" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sellprice">Sell price(฿)</label>
                                <Field name="sellprice" type="number" className={`form-control ${touched.sellprice ? errors.sellprice ? 'is-invalid' : 'is-valid' : ''}`} id="sellprice" placeholder="Enter Sell price" />
                                <ErrorMessage component="div" name="sellprice" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mpid">Main Part ID</label>
                                <Field name="mpid" type="number" className={`form-control ${touched.mpid ? errors.mpid ? 'is-invalid' : 'is-valid' : ''}`} id="mpid" placeholder="Enter Main Part ID" />
                                <ErrorMessage component="div" name="mpid" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="orderid">Order ID</label>
                                <Field name="orderid" type="number" className={`form-control ${touched.orderid ? errors.orderid ? 'is-invalid' : 'is-valid' : ''}`} id="orderid" placeholder="Enter Order ID" />
                                <ErrorMessage component="div" name="orderid" className="invalid-feedback" />
                            </div>
                
                            <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                        </Form>)}
                    </Formik>;
                    }

                    else if (props.type === "Supplier"){
                        return <Formik initialValues={{
                            ssn: props.bfEdit === '' ? '': props.bfEdit.SSN,
                            name: props.bfEdit === '' ? '': props.bfEdit.Name,
                            phone: props.bfEdit === '' ? '': props.bfEdit.Phone,
                            addressno: props.bfEdit === '' ? '': props.bfEdit.AddressNo,
                            street: props.bfEdit === '' ? '': props.bfEdit.Street,
                            province: props.bfEdit === '' ? '': props.bfEdit.Province,
                            city: props.bfEdit === '' ? '': props.bfEdit.City,
                            zipcode: props.bfEdit === '' ? '': props.bfEdit.ZipCode,

                        }} validationSchema={SupplierSchema} 
                           onSubmit={values => {
                            // same shape as initial values
                            props.onSubmit(values);
                            console.log(values);
                        } }>
                            {({ errors, touched }) => (<Form>
                                <div className="form-group">
                                    <label htmlFor="ssn">SSN</label>
                                    <Field name="ssn" type="number" className={`form-control ${touched.ssn ? errors.ssn ? 'is-invalid' : 'is-valid' : ''}`} id="ssn" placeholder="Enter SSN" />
                                    <ErrorMessage component="div" name="ssn" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Company name</label>
                                    <Field name="name" type="text" className={`form-control ${touched.name ? errors.name ? 'is-invalid' : 'is-valid' : ''}`} id="name" placeholder="Enter Name" />
                                    <ErrorMessage component="div" name="name" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <Field name="phone" type="text" className={`form-control ${touched.phone ? errors.phone ? 'is-invalid' : 'is-valid' : ''}`} id="phone" placeholder="Enter Phone number" />
                                    <ErrorMessage component="div" name="phone" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addressno">Adress No.</label>
                                    <Field name="addressno" type="text" className={`form-control ${touched.addressno ? errors.addressno ? 'is-invalid' : 'is-valid' : ''}`} id="addressno" placeholder="Enter Address No." />
                                    <ErrorMessage component="div" name="addressno" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">Street</label>
                                    <Field name="street" type="text" className={`form-control ${touched.street ? errors.street ? 'is-invalid' : 'is-valid' : ''}`} id="street" placeholder="Enter Street" />
                                    <ErrorMessage component="div" name="street" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="province">Province</label>
                                    <Field name="province" type="text" className={`form-control ${touched.province ? errors.province ? 'is-invalid' : 'is-valid' : ''}`} id="province" placeholder="Enter Province" />
                                    <ErrorMessage component="div" name="province" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <Field name="city" type="text" className={`form-control ${touched.city ? errors.city ? 'is-invalid' : 'is-valid' : ''}`} id="city" placeholder="Enter City" />
                                    <ErrorMessage component="div" name="city" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <Field name="zipcode" type="number" className={`form-control ${touched.zipcode ? errors.zipcode ? 'is-invalid' : 'is-valid' : ''}`} id="zipcode" placeholder="Enter Zipcode" />
                                    <ErrorMessage component="div" name="zipcode" className="invalid-feedback" />
                                </div>
                                
                    
                                <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                            </Form>)}
                        </Formik>;
                        }
}
