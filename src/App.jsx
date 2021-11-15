import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { getUserInfoAndCart } from "./redux/actions";
import { getCartId } from "./customFunctions";
import Navbar from "./components/Navbar";

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
        <Route path='/profile/'>{user ? <Profile></Profile> : <Redirect to='/' />}</Route>

        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
        <Route path='/register'>{user ? <Redirect to='/' /> : <Register />}</Route>
      </Switch>
    </Router>
  );
};

export default App;
