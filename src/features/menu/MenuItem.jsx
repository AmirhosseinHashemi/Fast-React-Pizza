import { useDispatch, useSelector } from "react-redux";
import PropType from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { addItem, getCurrentItemQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const quantity = useSelector(getCurrentItemQuantityById(id));
  const isInCart = quantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
      quantity: 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase text-stone-500">Sold out</p>
          )}

          {isInCart && (
            <div className="flex items-center gap-1 sm:gap-1">
              <UpdateItemQuantity pizzaId={id} currentQuantity={quantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropType.object,
};

export default MenuItem;
