import PropType from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentItemQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currQuantity = useSelector(getCurrentItemQuantityById(pizzaId));

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currQuantity} />
        <DeleteItem pizzaId={pizzaId} type="small">
          Delete
        </DeleteItem>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropType.object,
};

export default CartItem;
