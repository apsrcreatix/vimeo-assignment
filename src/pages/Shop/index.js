import Toolbar from "./Toolbar";
import Checkout from "./Checkout";
import Purchase from "./Purchase";
import { CheckoutStoreProvier } from "contexts/CheckoutStore";

const Shop = () => {
  return (
    <div className="p-1rem">
      {/* Toolbar contains button variant settings */}
      <Toolbar />
      {/* Divided into card & checkout */}
      <div className="w-100 d-flex">
        <CheckoutStoreProvier>
          {/* Add to cart section*/}
          <Purchase />
          {/* Checkout Section */}
          <Checkout />
        </CheckoutStoreProvier>
      </div>
    </div>
  );
};

export default Shop;
