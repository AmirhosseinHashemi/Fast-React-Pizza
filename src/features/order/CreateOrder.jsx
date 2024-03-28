import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.userName);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);

  const isSubmitting = navigation.state === "submitting";
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-1 rounded-md bg-red-100 p-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="my-6 flex items-start gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-12">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disable={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  //error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter your correct phone number.";
  if (Object.keys(errors).length > 0) return errors;

  // if everithing is ok
  const newOrder = await createOrder(order);

  // clear cart - do not overuse this trick
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
