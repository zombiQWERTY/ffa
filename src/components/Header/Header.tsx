import classNames from "classnames";
import { useCallback, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { AuthSlice } from "../../store/Auth";
import { Menu } from "../Icon";

const not = <T,>(v: T): boolean => !v;

const dumbLinks = "Some maybe useful links"
  .split(" ")
  .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`);

export const Header = () => {
  const [isMenuOpen, setToggleMenu] = useState<boolean>(false);

  const toggleMenu = useCallback(() => setToggleMenu(not), [setToggleMenu]);

  const dispatch = useAppDispatch();

  const onLogoutClick = useCallback(() => {
    dispatch(AuthSlice.actions.logout());
  }, [dispatch]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            FFA
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          data-testid="toggle-menu"
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="w-6 h-6" />
        </button>
        <div
          className={classNames("w-full md:block md:w-auto", {
            hidden: !isMenuOpen,
          })}
          data-testid="navbar"
          id="navbar-default"
        >
          <ul
            data-testid="navbar-links"
            className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <NavLink
                to="/"
                aria-current="page"
                className={({ isActive }) =>
                  classNames(
                    "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white",
                    {
                      "md:text-blue-700": isActive,
                    }
                  )
                }
              >
                Home
              </NavLink>
            </li>
            {dumbLinks.map((w, idx) => (
              <li key={idx}>
                <Link
                  to="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {w}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={onLogoutClick}
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
