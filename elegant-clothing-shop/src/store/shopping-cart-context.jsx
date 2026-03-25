import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const ShoppingCartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id,
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.id,
        );

        return {
          ...state,
          items: [
            ...state.items,
            {
              id: action.payload.id,
              name: product.title,
              price: product.price,
              quantity: 1,
            },
          ],
        };
      }
    case "UPDATE_ITEM_QUANTITY":
      const { productId, amount } = action.payload;
      const updatedItems = state.items
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + amount };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      return { ...state, items: updatedItems };
    default:
      return state;
  }
}

export default function ShoppingCartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    },
  );

  const shoppingCartContextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  function handleAddItemToCart(id) {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: { id } });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { productId, amount },
    });
  }

  return (
    <ShoppingCartContext.Provider value={shoppingCartContextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
