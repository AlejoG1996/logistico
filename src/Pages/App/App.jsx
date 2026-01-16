// Importaciones de React
import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AosProvider } from "../../Hooks/useAos";

// Pages
import Home from "../Home";
import Login from "../Login";
import Chat from "../Chat";

// Componentes de protección de rutas
import ProtectedRoute from "../../Components/Rutas/ProtectedRoute";

// Contexto
import { LogisticoProvider } from "../../Context";

// Definición de las rutas CON PROTECCIÓN
const AppRoutes = () => {
  let routes = useRoutes([
    // ✅ Ruta pública de inicio
    {
      path: "/",
      element: <Home />,
    },

    // ✅ Ruta de login - solo accesible si NO estás logueado
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    // ✅ Ruta protegida - SOLO accesible si estás logueado

    // ✅ Ruta 404
    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-[#09090B]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
              404 - Página no encontrada
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              La página que buscas no existe.
            </p>
          </div>
        </div>
      ),
    },
  ]);

  return routes;
};

function App() {
  return (
    <LogisticoProvider>
      <AosProvider>
        <BrowserRouter basename="/logistico">
          <AppRoutes />
        </BrowserRouter>
      </AosProvider>
    </LogisticoProvider>
  );
}

export default App;
