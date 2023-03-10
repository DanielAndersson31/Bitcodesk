// Header with navigation for BITCODESK
import { FaBitcoin } from "react-icons/fa";

// Created a navigation bar for the Header page

//Additional links has been added in order to continue with the project. Login in and Signup will be added in the future.

// More Route pages will be created for different types of content.

function Header() {
  return (
    <nav className="text-white bg-slate-900 flex flex-col xl:flex-row  justify-between items-center border-b-2 border-orange-400 relative bg-opacity-20 p-6 backdrop-blur-md ">
      <div>
        <h1 className="font-bold uppercase flex  items-center">
          <a href="/" className="text-4xl p-2 items-center text-gradient">
            Bitcodesk
          </a>
        </h1>
      </div>
      <ul className="flex flex-col sm:flex-row text-2xl pointer-events-none ">
        <li className="font-gray-700 font-bold p-2  ">
          <a href="#">
            <span>Currencies</span>
          </a>
        </li>
        <li className="p-2">
          <a href="#">
            <span>Markets</span>
          </a>
        </li>
        <li className="p-2">
          <a href="#">
            <span>Finance</span>
          </a>
        </li>
        <li className="p-2">
          <a href="#">
            <span>Investments</span>
          </a>
        </li>
        <li className="p-2">
          <a href="#">
            <span>Margins</span>
          </a>
        </li>
      </ul>

      <div className="flex justify-center md:justify-end pointer-events-none ">
        <a href="#" className="text-2xl text-gradient">
          Log in
        </a>
        <a href="#" className="text-2xl ml-4 text-gradient">
          Sign up
        </a>
      </div>
    </nav>
  );
}

export default Header;
