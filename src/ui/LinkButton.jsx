import PropType from "prop-types";
import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = "text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1") return <button onClick={() => navigate(-1)}></button>;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

LinkButton.propTypes = {
  children: PropType.any,
  to: PropType.string,
};

export default LinkButton;
