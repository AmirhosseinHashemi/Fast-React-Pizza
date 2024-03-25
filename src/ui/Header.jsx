import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-stone-400 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link className="tracking-widest" to="/">
        Fast React Pizza
      </Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
