import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElement/Backdrop";

export default function MainNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 768 && setIsDrawerOpen(false));
    return () => window.removeEventListener("resize", () => window.innerWidth >= 768 && setIsDrawerOpen(false));
  }, []);

  const handleDrawerToggleOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerToggleClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      {isDrawerOpen && <Backdrop onClick={handleDrawerToggleClose} />}
      <AnimatePresence>
        {isDrawerOpen && (
          <SideDrawer onClick={handleDrawerToggleClose}>
            <nav>
              <ul>
                <NavLinks />
              </ul>
            </nav>
          </SideDrawer>
        )}
      </AnimatePresence>
      <MainHeader>
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="block ml-6 md:hidden md:ml-0"
          onClick={isDrawerOpen ? handleDrawerToggleClose : handleDrawerToggleOpen}
        >
          <span className="block mb-2 bg-white w-10 h-1.5 border" />
          <span className="block mb-2 bg-white w-10 h-1.5 border" />
          <span className="block mb-2 bg-white w-10 h-1.5 border" />
        </motion.button>

        <h1 className="text-white text-3xl ml-12">
          <Link to="/">YourPlaces</Link>
        </h1>

        <nav className="mr-12 invisible md:visible">
          <ul>
            <NavLinks />
          </ul>
        </nav>
      </MainHeader>
    </>
  );
}
