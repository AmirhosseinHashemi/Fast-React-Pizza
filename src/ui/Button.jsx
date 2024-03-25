import PropType from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disable, to }) {
  const className =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wider text-stone-800 ring-yellow-300 ring-offset-2 transition hover:bg-yellow-300 focus:outline-none focus:ring disabled:cursor-not-allowed sm:px-6";

  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  return (
    <button disabled={disable} className={className}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropType.any,
  disable: PropType.bool,
};

export default Button;
