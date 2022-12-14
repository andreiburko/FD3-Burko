import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { clearCart } from "../redux/vinesSlice";

import "./CartResultBlock.css";

function CartResultBlock() {

  const cartItems = useSelector(state => state.vines.cart);
  const dispatch = useDispatch();

  const minOrder = 50;
  const [totalAmount, setTotalAmount] = useState(0);
  const [freeDeliveryAmount, setFreeDeliveryAmount] = useState(50);
  const [sendedOrder, setSendedOrder] = useState(false);

  useEffect( () => {
    if (cartItems.length > 0) {
      const amount = cartItems.reduce( (r,v) => r + (v.amount * v.item.price), 0);
      setTotalAmount(amount);
      setFreeDeliveryAmount(minOrder - amount);
    }
  },[cartItems]);

  function sendOrder() {
    dispatch(clearCart());
    setTotalAmount(0);
    setFreeDeliveryAmount(0);
    setSendedOrder(true);
  };

  return(
    <div className="cart-result-wrap">
      <div className="cart-result-decorate-line"></div>
      { (cartItems.length !== 0) &&
        <div className="cart-result-block">
          <div className="cart-result-block-info">
            <p className="cart-result-block-title">
              Итого:
              <span> {totalAmount.toFixed(2)} &#8364;</span>
            </p>
            { (totalAmount < minOrder) && 
              <p className="cart-result-block-par">
                До бесплатной доставки не хватает:
                <span> {freeDeliveryAmount.toFixed(2)} &#8364;</span>
              </p>
            }
          </div>
          <input className="cart-result-block-btn" type="button" value="Оформить заказ" onClick={sendOrder} />
        </div>
      }

      { (sendedOrder) &&
        <p className="cart-result-block-response">Спасибо, Ваш заказ принят!</p>
      }

      { (cartItems.length === 0 && !sendedOrder) &&
        <div className="cart-result-empty">
          <div className="cart-result-empty-img-block"></div>
          <h2 className="cart-result-empty-title">
            корзина пустая
          </h2>
          <NavLink to="/" className="cart-result-empty-link">Выбрать вино</NavLink>
        </div>
      }

    </div>
  );
}

export default CartResultBlock;