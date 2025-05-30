/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const {setAuthUser} = useAuthContext();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // console.log(theme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then(function (result) {
      if (result.isConfirmed) {
      Swal.fire(
        'Your has been logged out.',
        'success'
      )
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");

      setAuthUser(null);
      navigate("/");
      } else {
        Swal.fire(
          'Cancelled',
          'You are still logged in',
          'error'
        )
      }
    }) 
  };

  return (
    <div
      className={`w-full ${
        theme === "dark" ? "bg-black text-light" : "bg-light text-dark"
      }`}
    >
      <nav className="container relative flex flex-wrap items-center justify-between p-6 mx-auto lg:justify-between xl:px-0">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                {localStorage.getItem("authToken") ? (
                  <Link className="navbar-brand" to="/profile">
                    <img
                      src="/assets/avatar_icon.png"
                      alt="Avatar Logo"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  </Link>
                ) : (
                  ""
                )}
                <Link to="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100 font-sans ml-2">
                    <span>DysLexiLens</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    <div>
                      <Link
                        to="/"
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        Home
                      </Link>
                      {/* <Link
                        to="/about"
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        About
                      </Link> */}
                      {/* <a
                        href="http://localhost:3000/#team"
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        Team
                      </a> */}
                      {/* {localStorage.getItem("authToken") ? ( */}
                        <>
                          <Link
                            to="/test"
                            className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                          >
                            Test
                          </Link>
                          <Link
                            to="/history"
                            className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                          >
                            History
                          </Link>
                        </>
                      {/* ) : ( */}
                        {/* "" */}
                      {/* )} */}
                    </div>

                    {!localStorage.getItem("authToken") ? (
                      <div className="d-flex">
                        <Link
                          to="/login"
                          className="w-full px-4 mt-auto text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                        >
                          Log In
                        </Link>
                      </div>
                    ) : (
                      <div className="d-flex justify-end">
                        <div
                          className="w-full px-4 mt-auto text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                          onClick={handleLogout}
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            <li className="mr-3 nav__item">
              <Link
                to="/"
                className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
              >
                Home
              </Link>
              {/* <Link
                to="/about"
                className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
              >
                About
              </Link> */}
              {/* <a
                href="http://localhost:3000/#team"
                className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
              >
                Team
              </a> */}
              {/* {localStorage.getItem("authToken") ? ( */}
                <>
                  <Link
                    to="/test"
                    className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                  >
                    Test
                  </Link>
                  <Link
                    to="/history"
                    className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                  >
                    History
                  </Link>
                </>
              {/* ) : (
                ""
              )} */}
            </li>
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link
                to="/login"
                className="w-full px-4 py-2 mt-auto text-center text-white bg-indigo-600 rounded-md lg:ml-5"
              >
                Log In
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-end justify-end">
              <div
                className="w-full px-4 py-2 mt-auto text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}

          {/* <ThemeChanger theme={theme} toggleTheme={toggleTheme} /> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
