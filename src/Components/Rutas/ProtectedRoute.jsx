// components/ProtectedRoute.jsx - CORREGIDO
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LogisticoContext } from '../../Context';


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuthStatus } = useContext(LogisticoContext);
    const [isLoading, setIsLoading] = useState(true);
    const [hasChecked, setHasChecked] = useState(false); // ✅ NUEVO: flag para evitar re-checks
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = async () => {
            // ✅ Solo verificar una vez por montaje del componente
            if (hasChecked) return;
            
            console.log("🔒 ProtectedRoute: Verificando autenticación (primera vez)...");
            await checkAuthStatus();
            setHasChecked(true);
            setIsLoading(false);
            console.log("🔒 ProtectedRoute: Verificación completada.");
        };

        verifyAuth();
    }, []); // ✅ Array vacío - solo ejecutar en mount

    // ✅ Segundo useEffect para reaccionar a cambios de autenticación
    useEffect(() => {
        if (hasChecked) {
            setIsLoading(false);
            console.log("🔒 ProtectedRoute: Estado de autenticación actualizado:", isAuthenticated);
        }
    }, [isAuthenticated, hasChecked]);

    // Mostrar loading mientras verificamos el token
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-[#09090B]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-zinc-600 dark:text-zinc-400">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login guardando la ruta actual
    if (!isAuthenticated) {
        console.log("🚫 ProtectedRoute: Usuario no autenticado, redirigiendo a login");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si está autenticado, mostrar el componente hijo
    console.log("✅ ProtectedRoute: Usuario autenticado, mostrando contenido");
    return children;
};

export default ProtectedRoute;