import React, { useState, useEffect } from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link, useNavigate } from "react-router-dom";
import { Editor } from "./pages/editor";
import { Main } from "./pages/main";
import "./index.css";

const MenuModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-[90%] w-full md:max-w-4xl mx-4 flex flex-col gap-6 overflow-y-auto max-h-[90%]">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-gray-900 font-bold text-center">
          Wystawa - Claude Monet
        </h1>

        {/* Featured Image */}
        <div className="relative w-full h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="/18.jpg"
            alt="Water Lilies - Japanese Bridge"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-base md:text-xl text-gray-900 mb-6">
            Claude Monet, mistrz impresjonizmu, zaprasza do świata pełnego
            światła, barw i ulotnych wrażeń. Wystawa ukazuje jego niezwykłą
            zdolność uchwycenia piękna natury w zmieniających się porach dnia i
            roku.
          </p>

          {/* Movement Instructions */}
          <div className="space-y-2 text-sm md:text-base text-gray-700">
            <p>
              <span className="font-medium">Poruszanie się:</span> strzałki lub
              klawisze WASD
            </p>
            <p>
              <span className="font-medium">Podgląd obrazu:</span> kliknięcie
              myszką
            </p>
            <p>
              <span className="font-medium">Powrót do menu:</span> klawisz ESC
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              navigate('/');
              onClose();
            }}
            className="px-4 py-2 md:px-6 md:py-3 bg-red-950 text-white rounded-lg hover:bg-red-900 transition-colors"
          >
            Galeria
          </button>
          <button
            onClick={() => {
              navigate('/editor');
              onClose();
            }}
            className="px-4 py-2 md:px-6 md:py-3 bg-red-950 text-white rounded-lg hover:bg-red-900 transition-colors"
          >
            Edytor
          </button>
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(true);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
      <>
        {showMenu && <MenuModal onClose={() => setShowMenu(false)} />}
        {children}
      </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Layout>
          <Main />
        </Layout>
    ),
  },
  {
    path: "/editor",
    element: (
        <Layout>
          <Editor />
        </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
);

export default router;