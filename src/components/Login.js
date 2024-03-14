import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
function Login() {
  const Navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // fetching userinfo can be done on the client or the server
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse?.access_token}` },
        }
      );
      if (userInfo) {
        let token = localStorage.setItem(
          "accessToken",
          tokenResponse?.access_token
        );
        if (token !== "") {
          Navigate("/");
        }
      }
    },
  });
  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
       <div className="row">
    <div className="col-md-12">
      <button 
        className="btn btn-lg btn-google btn-block text-uppercase btn-outline"
        onClick={googleLogin} // Call handleSignupClick when the button is clicked
      >
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" /> Signin WITH Google
      </button>
    </div>
  </div>
    </div>
  );
}

export default Login;
