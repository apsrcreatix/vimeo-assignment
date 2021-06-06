import Button from "components/Button";
import {
  CHECKOUT_STORE_ACTIONS,
  useCheckoutDispatcher,
  useCheckoutStore,
} from "contexts/CheckoutStore";

function Checkout(props) {
  const checkoutDispatcher = useCheckoutDispatcher();
  const { products } = useCheckoutStore();
  const TOTAL_PRODUCTS = products?.length;

  return (
    <section className="w-100 p-1rem m-1rem">
      <div className="d-flex align-items-center justify-content-between py-1rem">
        <div className="m-1rem">Cart</div>
        <div className="m-1rem">{TOTAL_PRODUCTS} Items</div>
      </div>
      {TOTAL_PRODUCTS === 0 ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center calc-100vh-400px p-1rem">
          Cart is empty.
        </div>
      ) : (
        <ul className="clean-list calc-100vh-400px overflow-y-auto">
          {products?.map((product, index) => (
            <li className=" clean-list-items" key={`${product?.id}-i-${index}`}>
              {product.title}
            </li>
          ))}
        </ul>
      )}
      <div className="p-1rem">
        <Button
          customClassName="w-100"
          onClick={() =>
            checkoutDispatcher({
              type: CHECKOUT_STORE_ACTIONS.RESET,
            })
          }
        >
          Checkout to Cart
        </Button>
      </div>
    </section>
  );
}

export default Checkout;
