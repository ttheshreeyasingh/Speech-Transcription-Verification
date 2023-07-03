import React from 'react';
import './Login.css';

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
      </div>

      <div className="login-form">
        <div className="divider d-flex align-items-center my-4">
          {/* <p className="text-center fw-bold mx-3 mb-0">Or</p> */}
        </div>

        <div className="mb-4">
          <input className="form-control" type="email" placeholder="Email address" />
        </div>
        <div className="mb-4">
          <input className="form-control" type="password" placeholder="Password" />
        </div>

        <div className="text-center text-md-start mt-3">
          <button className="btn btn-primary" onClick={onLogin}>Login</button>
          <p className="mt-2">
            <a href="#" className="link-danger">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
