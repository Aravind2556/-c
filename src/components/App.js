import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import '../css/App.css';
import '../css/bootstrap.css'
import LandingPage from '../pages/LandingPage';
import UserSignIn from '../pages/Signin'
import UserSignUp from '../pages/Signup'
import UserAccount from '../pages/UserAccount';
import ProductPage from '../pages/ProductPage';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Dashboard from '../admin/Dashboard';
import CreateProduct from '../admin/CreateProduct';
import ListProduct from '../admin/ListProducts';
import ListOrders from '../admin/ListOrders';
import ListUsers from '../admin/ListUsers';
import UpdateProduct from '../admin/UpdateProduct';
import UpdateOrder from '../admin/UpdateOrders'
import UpdateUser from '../admin/UpdateUser';
import Orders from '../pages/Orders';
import SlowLoader from './SlowLoader';
import ViewOrder from '../pages/ViewOrder';
import AccessDenied from '../components/AccessDenied'
import ForgotPassword from '../pages/ForgotPassword';
import Footer from './Footer';



function App() {

  const [userInfo, setUserInfo] = useState(null)
  const [isValidAuth, setIsValidAuth] = useState(null)

  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
      fetch('https://skecommerce-backend.onrender.com/userinfo',{
        method: 'POST',
        headers: {
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem("auth-token")}`,
            'Content-Type':'application/json',
        },
        body: JSON.stringify(),
      })
      .then((resp) => resp.json())
      .then((data) => {
        setIsValidAuth(data.success)
        if(data.success){
            setUserInfo(data.User)
        }else{
            setUserInfo([])
            alert(data.message)
        }
      })
      .catch((error) => {
        alert('Error connecting to the Server when fetching User info!, Please try again later.')
        console.error('Error fetching user info: ', error);
        setUserInfo([])
      })
    }else{
      setUserInfo([])
      setIsValidAuth(false)
    }
  }, [])

  
  if(userInfo!==null && isValidAuth!==null){
    return (
    
      <div className="App">
        <Routes>
  
          {/* Public Routes */}
          <Route path='/' element={<LandingPage/>} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/product/:productId" element={<ProductPage />} />

          {/*  Private Routes */}
          <Route path="/useraccount" element={isValidAuth ? <UserAccount /> : <UserSignIn/> } />
          <Route path="/cart" element={isValidAuth ? <Cart /> : <UserSignIn/> } />
          <Route path="/checkout" element={isValidAuth ? <Checkout/> : <UserSignIn/> } />
          <Route path='/orders' element={isValidAuth ? <Orders/> : <UserSignIn/> } />
          <Route path="/order/:orderId" element={isValidAuth ? <ViewOrder/> : <UserSignIn/> } />
  
  
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={userInfo.isAdmin ? <Dashboard /> : <AccessDenied/>} />
          <Route path="/admin/create-product" element={userInfo.isAdmin ? <CreateProduct /> : <AccessDenied/>} />
          <Route path="/admin/products" element={userInfo.isAdmin ? <ListProduct /> : <AccessDenied/>} />
          <Route path="/admin/updateproduct/:productId" element={userInfo.isAdmin ? <UpdateProduct/> : <AccessDenied/>} />
          <Route path="/admin/orders" element={userInfo.isAdmin ? <ListOrders /> : <AccessDenied/>} />
          <Route path='/admin/update-order/:orderId' element={userInfo.isAdmin ? <UpdateOrder /> : <AccessDenied/>} />
          <Route path="/admin/users" element={userInfo.isAdmin ? <ListUsers /> : <AccessDenied/>} />
          <Route path='/admin/update-user/:userId' element={userInfo.isAdmin ? <UpdateUser/> : <AccessDenied/>} />
        </Routes>
        <Footer/>
      </div>
    );
  }else{
    return(
      <div>
        <SlowLoader/>
      </div>
    )
  }


}

export default App;
