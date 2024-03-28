import PropType from "prop-types";

import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-4">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs italic text-stone-500">
        {isLoadingIngredients ? "loading..." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropType.object,
  isLoadingIngredients: PropType.any,
  ingredients: PropType.array,
};

export default OrderItem;
