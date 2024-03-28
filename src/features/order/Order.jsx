// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";

import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdatePriority from "./UpdatePriority";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const fetcher = useFetcher();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(
    function () {
      if (fetcher.state === "idle" && !fetcher.data) fetcher.load("/menu");
    },
    [fetcher],
  );

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold">Order #{id} status </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-4 py-3">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((pizza) => pizza.id === item.pizzaId)
                .ingredients
            }
          />
        ))}
      </ul>

      <div className="bg-stone-200 px-4 py-3">
        <p className="text-sm text-stone-500">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm text-stone-500">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="mt-1 font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdatePriority />}
    </div>
  );
}

export function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}

export default Order;
