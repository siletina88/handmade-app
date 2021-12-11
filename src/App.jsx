import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Product, Home, ProductList, Login, Cart, UserVerificationSuccess, Register, Profile } from "./pages";
import { Navbar } from "./components";

import { getUserInfoAndCart } from "./redux/actions";
import { getCartId } from "./customFunctions";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) {
      getUserInfoAndCart(user, getCartId(cart), dispatch);
    } else return;
  }, [user]);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products/:catergory'>
          <ProductList />
        </Route>
        <Route path='/product/:id'>
          <Product />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/profile/'>{user ? <Profile /> : <Redirect to='/' />}</Route>

        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
        <Route path='/register'>{user ? <Redirect to='/' /> : <Register />}</Route>
        <Route exact path='/verified'>
          <UserVerificationSuccess />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
