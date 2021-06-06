import { useCallback, useState } from "react";
import useFetch from "hooks/useFetch";
import Button from "components/Button";
import InputWrapper from "components/InputWrapper";
import {
    CHECKOUT_STORE_ACTIONS,
    useCheckoutDispatcher,
} from "contexts/CheckoutStore";
import API from "api";

//initial filter state
const INIT_FILTER_STATE = {
  isApplied: false,
  data: [],
};

const Purchase = (props) => {
  const checkoutDispatcher = useCheckoutDispatcher();

  const { data, isLoading } = useFetch({ ...API.getAllProducts });

  //states
  const [searchValue, setSearchValue] = useState("");
  const [currentSelected, setCurrentSelected] = useState([]);
  const [
    { isApplied: isFilterApplied, data: filteredData },
    setFilterAppliedResults,
  ] = useState(() => INIT_FILTER_STATE);

  //responsible for handling the selection of products
  const handleOnSelect = (value) => {
    if (currentSelected.some((element) => element.id === value.id)) {
      //remove the value from collection
      setCurrentSelected((prev) =>
        prev.filter((element) => element.id !== value.id)
      );
    } else {
      //add the value from collection
      setCurrentSelected((prev) => [...prev, value]);
    }
  };

  //responsible for add to cart
  const handleOnAddToCart = useCallback(() => {
    checkoutDispatcher({
      type: CHECKOUT_STORE_ACTIONS.ADD_TO_CART,
      payload: currentSelected,
    });
  }, [checkoutDispatcher, currentSelected]);

  // responsible for reseting filter
  const handleOnResetFilter = () => {
    setFilterAppliedResults(INIT_FILTER_STATE);
    setSearchValue("");
  };

  const handleOnSearch = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setFilterAppliedResults({
      isApplied: true,
      data: data.products.filter(
        (product) => product.title.toLowerCase().indexOf(searchValue) > -1
      ),
    });
  };

  const getInputMapped = (product) => (
    <div className="w-100" key={product?.id}>
      <InputWrapper
        {...{
          type: "checkbox",
          name: "select-products",
          id: `product-${product.id}`,
          label: product?.title,
          value: product?.id,
          checked: currentSelected?.some(
            (element) => element.id === product.id
          ),
          labelClassName: "w-100 d-flex",
          parentClassName: "d-flex",
          onChange: () => {
            handleOnSelect(product);
          },
        }}
      />
    </div>
  );

  return (
    <section className="w-100 p-1rem m-1rem">
      {/* SEARCH BAR */}
      <div style={{ marginBottom: "5px" }}>
        <form className="d-flex p-relative" onSubmit={handleOnSearch}>
          <InputWrapper
            type="text"
            parentClassName="w-100"
            inputClassName="w-100"
            placeholder="Enter product name here"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button
            children={"clear"}
            type="button"
            className="my-1rem search-x-button"
            onClick={() => handleOnResetFilter()}
            disabled={!isFilterApplied}
          />
          <Button
            children={"Search"}
            customClassName="my-1rem"
            disabled={!searchValue}
          />
        </form>
      </div>
      {/* LIST OF ITEMS */}
      <div
        className={`calc-100vh-400px overflow-y-auto p-1rem ${
          isLoading || (isFilterApplied && filteredData.length === 0)
            ? "d-flex align-items-center justify-content-center"
            : ""
        }`}
      >
        {isLoading
          ? "loading..."
          : isFilterApplied
          ? filteredData.length === 0
            ? "No results found."
            : filteredData?.map(getInputMapped)
          : data?.products?.map(getInputMapped)}
      </div>
      <div className="p-1rem">
        <Button customClassName="w-100" onClick={() => handleOnAddToCart()}>
          Add to Cart
        </Button>
      </div>
    </section>
  );
};

export default Purchase;
