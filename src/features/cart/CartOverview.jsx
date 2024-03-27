import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 font-semibold text-stone-300 md:space-x-6">
        <span>{totalQuantity} PIZZAS</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
