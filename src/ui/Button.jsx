import PropType from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disable, to, type }) {
  const base =
    "inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wider text-stone-800 ring-yellow-300 ring-offset-2 transition hover:bg-yellow-300 focus:outline-none focus:ring disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 sm:px-6 sm:py-4",
    small: base + " px-3 py-2 sm:px-5 sm:py-3 text-xs",
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
