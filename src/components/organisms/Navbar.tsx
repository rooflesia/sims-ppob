import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu } from "../../redux/slices/menuSlice";

const Navbar = () => {
  const activeMenu = useSelector((state: any) => state.menu);
  const dispatch = useDispatch();

  const menus = ["Top Up", "Transaction", "Akun"];

  return (
    <header className="flex justify-between items-center pb-4 border-b-2 border-gray-100">
      <div className="text-xl font-bold text-black cursor-pointer flex" onClick={() => dispatch(setActiveMenu("Home"))}>
        <img src="/Logo.png" alt="SIMS PPOB" className="w-6 h-6 mr-2" />
        <p>SIMS PPOB</p>
      </div>
      <nav>
        <ul className="flex space-x-6">
          {menus.map((menu) => (
            <li key={menu}>
              <button
                onClick={() => dispatch(setActiveMenu(menu))}
                className={`text-sm font-medium ${
                  activeMenu === menu ? "text-red-500" : "text-gray-700"
                } hover:text-red-500`}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
