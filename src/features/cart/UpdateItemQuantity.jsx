import PropType from "prop-types";
import { useDispatch } from "react-redux";

import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1">
      <Button
        type="counter"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <p className="text-sm font-medium">{currentQuantity}</p>
      <Button
        type="counter"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

UpdateItemQuantity.propTypes = {
  pizzaId: PropType.number,
  currentQuantity: PropType.number,
};

export default UpdateItemQuantity;
