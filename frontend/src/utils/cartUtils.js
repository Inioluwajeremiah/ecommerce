export const addDecimals = (num) => {
  return (Math.round(parseFloat(num) * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   calculate items price
  state.itemPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantityNeeded,
      0
    )
  );
  //   calculate shipping price (if order is over 4100 then free else addd $10 for shipping)
  state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);
  //   calculate items price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));
  //   calculate items price
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
};
