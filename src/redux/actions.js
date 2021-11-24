import { logoutStart, logoutSuccess, logoutFailure, clearError, loading } from "./userSlice";
import { clearCart } from "./cartSlice";
import { getCart, createCart, assignCartToUser } from "./apiCalls";

export const logout = (dispatch) => {
  dispatch(logoutStart());

  try {
    dispatch(clearCart());
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};
export const clear = (dispatch) => {
  dispatch(clearError());
};
export const load = (dispatch) => {
  dispatch(loading());
};

export const getUserInfoAndCart = async (user, getCartId, dispatch) => {
  if (user) {
    const id = user._id;
    if (user.cart) {
      getCart(id, dispatch);
    } else {
      const userId = user._id;

      createCart(userId, dispatch);
      // const cartId = getCartId();
      // console.log(cartId);
      // assignCartToUser(id, cartId, dispatch);
      //asign cart to user
    }
  } else return;
};
