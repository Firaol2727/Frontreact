import Home from './pages/Home';
import Products from './pages/Products';
import axios from 'axios';
import {
  BrowserRouter as Switch,
  Route,Routes,Link
} from 'react-router-dom';
import React,{Component,useEffect,useState} from "react";
////-     cusotmer  ---//
import ForgotPassWord from './pages/Forgot';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import Details from './pages/Detail';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Subcat from './pages/Subcat';
import CompPro from './pages/CompPro';
////-------------seller -------------//

import LoginSeller from './pages/LoginSeller';
import Seller from './pages/seller/myProducts'
import AddProduct from './pages/seller/addProduct';
import MyProfile from './pages/seller/myprofile';
import EditProduct from './pages/seller/editProduct';

//----             special--//
import LoginAdmin from './pages/LoginAdmin';
import AddSeller from './pages/admin/addSeller';
import WatchOrder from './pages/admin/watchOrder';
import Sellers from './pages/admin/sellers';
import MyProfileA from './pages/admin/myprofilea';
import AddCategory from './pages/admin/addCategory';
import EditOrder from './pages/admin/editOrder';

import Search  from './pages/Search';
import TotalSell from './pages/admin/totalSell';
function App() {
  const [value, setValue] = useState(0);
  return (
    <Switch>
    <div className="App">
    <Routes>
      {/* // --- customer services -- */}
          <Route exact path='/' element={< LoginPage />}></Route>
          <Route exact path='/cart' element={< Cart />}></Route>
          <Route exact path='/profile' element={< Profile />}></Route>
          <Route exact path='/details/:pid' element={< Details />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
          <Route exact path='/forget' element={< ForgotPassWord />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/custom/:cname' element={< Products />}></Route>
          <Route exact path='/search/:searchitem' element={< Search />}></Route>
          <Route exact path='/comp/:searchitem' element={< CompPro />}></Route>
          <Route exact path='/custom/:cname/:subname' element={< Subcat />}></Route>

      {/* //  --- Sellere services ---//  */}
          <Route exact path='/sellerLogin' element={<LoginSeller />}></Route>
          <Route exact path='/selhome' element={<AddProduct />}></Route>
          <Route exact path='/myproduct' element={<Seller />}></Route>
          <Route exact path='/myProfile' element={<MyProfile />}></Route>
          <Route exact path='/editproduct/:pid' element={<EditProduct />}></Route>

      {/* // --- Special  Services   ---//  */}
      <Route exact path='/adlogin' element={<LoginAdmin />} ></Route>
      <Route exact path='/addseller' element={<AddSeller />} ></Route>
      <Route exact path='/watchorder' element={<WatchOrder />} ></Route>
      <Route exact path='/sellers' element={<Sellers />} ></Route>
      <Route exact path='/myprofilea' element={<MyProfileA />} ></Route>
      <Route exact path='/addcategory' element={<AddCategory />} ></Route>
      <Route exact path='/totalsell' element={<TotalSell />} ></Route>
      <Route exact path='/editorder/:oid' element={<EditOrder />} ></Route>
    </Routes>
    </div>
  </Switch>
  );
}
export default App;







