import React from 'react';
import '../css/forgot.css';
const ForgotPassWord=()=>{
    return(
        <div class="box">
        <form method="POST" action="#">
        <center><img src="https://img.icons8.com/bubbles/100/000000/lock-2.png" alt="User" /></center>
        <h3>Reset password</h3>
        <p class="tip">Provide your account email address to process</p>
        <label>Email address</label>
        <input type="email" required maxlength="100" />
        <div class="btn">
        <button type="submit">Reset</button>
        <a href="https://designerovi.com/other/login.html" class="ll">Back to login page</a><br />
        </div>
        <hr />
        <p class="mode">Forget email?<a href="#"> Contact us</a></p>
        <p>By processing, you're agree with our <a href="#">Terms and conditions</a> and <a href="#">Privacy policy</a>.</p>
        </form>
        </div>

    );


}
export default ForgotPassWord;
