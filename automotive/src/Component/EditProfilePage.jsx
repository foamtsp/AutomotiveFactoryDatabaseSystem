import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
    withRouter
  } from 'react-router-dom'


  const ProfileSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    surname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    phone_number: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('This field is required.'),
    specialize: Yup.string()
        .min(2, 'Too Short!'),
});


class EditProfile extends Component {

  
    handleSubmit = (event) => {
      
    event.preventDefault();
    const data = {
      firstname: event.target.firstname.value,
      surname: event.target.surname.value,
      phone_number: event.target.phone_number.value,
      specialize: event.target.specialize.value
    };
    console.log(data);
    fetch("/editprofile", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((respData) => {
      console.log(respData);
    }).catch((err) => {
      console.log(err);
    });
    
    alert("Your Profile has been edited!")
    window.location.replace("/");
  }

  render() {
    return (
      <div className="section-content-block section-process">
        <div className="col-md-12 col-sm-12">
          <h2 className="section-heading"><span>Edit</span> Profile</h2>
          <p className="section-subheading">You can edit just your <b className="highlightme">firstname, surname, phone number, and your special skill</b> 
          <br/>Please revise your information again before updating</p>
        </div>
        <div className="row">
          <div className="col-md-12 appointment-form-wrapper clearfix">
            <Formik 
            initialValues={{
              firstname: this.props.user.FName,
              surname: this.props.user.LName,
              phone_number: this.props.user.Phone,
              specialize: this.props.user.Specialize
          }}
          validationSchema={ProfileSchema}
          >
            {({ errors, touched }) => (
            <Form onSubmit={event => this.handleSubmit(event)} className="appoinment-form">
              <div className="form-group col-md-8">
                <Field required name="firstname" className={`form-control ${touched.firstname ? errors.firstname ? 'is-invalid' : 'is-valid' : ''}`} placeholder="Firstname" type="text" />
                <ErrorMessage component="div" name="firstname" className="invalid-feedback" />
              </div>
              <div className="form-group col-md-8">
                <Field required name="surname" className={`form-control ${touched.surname ? errors.surname ? 'is-invalid' : 'is-valid' : ''}`} placeholder="Surname" type="text" />
                <ErrorMessage component="div" name="surname" className="invalid-feedback" />
              </div>
              <div className="form-group col-md-8">
                <Field required name="phone_number" className={`form-control ${touched.phone_number ? errors.phone_number ? 'is-invalid' : 'is-valid' : ''}`} placeholder="Phone" type="text" />
                <ErrorMessage component="div" name="phone_number" className="invalid-feedback" />
              </div>
              <div className="form-group col-md-8">
                <Field required name="specialize" className={`form-control ${touched.specialize ? errors.specialize ? 'is-invalid' : 'is-valid' : ''}`} placeholder="Specialize" type="text" />
                <ErrorMessage component="div" name="specialize" className="invalid-feedback" />
              </div>
              <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <button className="btn btn-primary btn-lg" type="submit">Update Profile</button>
              </div>
            </Form>
            )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
