export const getCartId = ({ cart }) => {
  if (cart) {
    return cart._id;
  }
};

export const handleQuantity = (type, quantity, setQuantity) => {
  if (type === "dec") {
    quantity > 1 && setQuantity(quantity - 1);
    console.log(quantity);
  } else {
    quantity < 50 && setQuantity(quantity + 1);
    console.log(quantity);
  }
};
