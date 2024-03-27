import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.userName);

  if (!username) return null;

  return <p className="hidden text-sm font-semibold md:block">{username}</p>;
}

export default UserName;
