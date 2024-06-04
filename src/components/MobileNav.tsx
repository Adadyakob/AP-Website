import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const modalVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetUrl = e.currentTarget.getAttribute("href");

    handleClose();

    setTimeout(() => {
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }, 500);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-50"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="w-8 h-8 hover:text-black"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 bg-slate-700 flex justify-center items-center"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-center flex flex-col gap-3"
            >
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white text-xl hover:text-black block"
                  onClick={handleNavigation}
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 m-2 z-50"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-8 h-8 hover:text-black"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
