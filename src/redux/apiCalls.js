import { publicRequest, userRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userSlice";
import {
  getUserCartFailure,
  getUserCartStart,
  getUserCartSuccess,
  updateUserCartFailure,
  updateUserCartStart,
  updateUserCartSuccess,
  clearUserCartStart,
  clearUserCartSuccess,
  clearUserCartFailure,
  createUserCartStart,
  createUserCartFailure,
  createUserCartSuccess,
  clearCart,
} from "./cartSlice";

//login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return "success";
  } catch (error) {
    const { response } = error;
    if (response) {
      dispatch(loginFailure(response.data));
    } else {
      dispatch(loginFailure("Server nije dostupan. Provjerite vasu internet konekciju ili pokusajte kasnije!"));
    }

    return "failed";
  }
};

// logout
export const logout = (dispatch) => {
  dispatch(logoutStart());
  dispatch(clearCart());

  try {
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};
//register user
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);

    dispatch(registerSuccess());
    return true;
  } catch (error) {
    const { response } = error;
    if (response) {
      dispatch(registerFailure(response.data));
    } else {
      dispatch(registerFailure("Server nije dostupan. Provjerite vasu internet konekciju ili pokusajte kasnije!"));
    }
    return false;
  }
};

// update user
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
    return "success";
  } catch (error) {
    console.log(error);
    dispatch(updateUserFailure());
    return "failed";
  }
};

// assign cart to user
export const assignCartToUser = async (id, cartId, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, { _id: id, cart: cartId });
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateUserFailure());
  }
};

// get cart
export const getCart = async (id, dispatch) => {
  dispatch(getUserCartStart());
  try {
    const res = await userRequest.get(`/cart/find/${id}`);

    dispatch(getUserCartSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getUserCartFailure());
  }
};
// create cart
export const createCart = async (userId, dispatch) => {
  dispatch(createUserCartStart());
  try {
    const res = await userRequest.post(`/cart/`, { userId });
    await dispatch(createUserCartSuccess(res.data));
    console.log("from function", res.data);
    assignCartToUser(userId, res.data._id, dispatch);
  } catch (error) {
    console.log(error);
    dispatch(createUserCartFailure());
  }
};
// add item to cart
export const updateCart = async (cartId, item, userId, dispatch) => {
  dispatch(updateUserCartStart());
  try {
    const res = await userRequest.put(`/cart/add/${userId}`, { item, cartId, userId });
    dispatch(updateUserCartSuccess(res.data));
    return "success";
  } catch (error) {
    console.log(error);
    dispatch(updateUserCartFailure());
    return "failure";
  }
};
// clear cart
export const clearCartOnOrder = async (cartId, userId, dispatch) => {
  dispatch(clearUserCartStart());
  try {
    const res = await userRequest.put(`/cart/clear/${userId}`, { cartId });
    dispatch(clearUserCartSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch(clearUserCartFailure());
  }
};
// remove item from cart
export const removeItemFromCart = async (cartId, productId, cartPrice, dispatch) => {
  console.log(cartId, productId, cartPrice);
  dispatch(updateUserCartStart());

  try {
    const res = await userRequest.put(`/cart/remove/${cartId}/${productId}`, { cartPrice });
    dispatch(updateUserCartSuccess(res.data));
    return "success";
  } catch (error) {
    return "failed";
    dispatch(updateUserCartFailure());
  }
};
export const makeAnOrder = async (order) => {
  try {
    const res = await publicRequest.post(`orders`, order);
    return "success";
  } catch (error) {
    return "failed";
  }
};
