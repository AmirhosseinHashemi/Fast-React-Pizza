import PropType from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disable, to, type }) {
  const base =
    "text-center text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wider text-stone-800 ring-yellow-300 ring-offset-2 transition hover:bg-yellow-300 focus:outline-none focus:ring disabled:cursor-not-allowed focus:bg-yellow-300";

  const styles = {
    primary: base + " px-4 py-3 sm:px-6 sm:py-4",
    small: base + " px-3 py-2 sm:px-5 sm:py-3 text-xs",
    secondary:
      "px-4 sm:px-6 text-sm inline-block rounded-full font-semibold uppercase tracking-wider text-stone-300 ring-stone-300 ring-offset-2 transition hover:bg-stone-300 focus:outline-none focus:ring disabled:cursor-not-allowed hover:text-stone-800 border-2 border-stone-300 focus:bg-stone-300 focus:text-stone-800",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disable} className={styles[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropType.any,
  disable: PropType.bool,
  type: PropType.string,
  to: PropType.string,
};

export default Button;
