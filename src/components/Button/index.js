import { useGlobalStore } from "contexts/GlobalStore";
import "./button.css";

export default function Button({ customStyle, customClassName, ...props }) {
  //accessing button variant color from global store
  const { buttonVariant } = useGlobalStore();

  return (
    <button
      {...props}
      style={{ ...customStyle, backgroundColor: buttonVariant }}
      className={`btn ${customClassName}`}
    />
  );
}
