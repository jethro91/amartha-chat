import React, { Component } from 'react';
import BlockUi from 'react-block-ui';

import { fbAuth } from '../instance/firebase';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false
    };
    this.chatKeys = {};

    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    const { name } = this.state;
    if (!name || name.trim().length < 1) {
      return;
    }
    const displayName = name.trim().toUpperCase();
    this.setState({ loading: true });
    fbAuth
      .signInAnonymouslyAndRetrieveData()
      .then(data =>
        data.user.updateProfile({
          displayName
        }))
      .then(() => {
        this.setState({ loading: false });
        return this.props.updateNameFromChild(displayName);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
      });
  }

  render() {
    return (
      <BlockUi blocking={this.state.loading} tag="div">
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="loginName">Nama *</label>
            <input
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
              value={this.state.name}
              id="loginName"
              className="form-control"
              placeholder="Nama"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success submit-button">
              Login
            </button>
          </div>
        </form>
      </BlockUi>
    );
  }
}

export default LoginForm;
