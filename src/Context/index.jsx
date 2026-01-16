//importaciones react
import React, { useState, useEffect } from 'react';

const LogisticoContext = React.createContext();

import { Clock, Medal, TrendingUp } from 'lucide-react';
import apiService from '../services/apiService';
function LogisticoProvider({ children }) {

    //estado para el dark mode
    const [isDark, setIsDark] = useState(true);
    const toggleDarkMode = () => { setIsDark(!isDark); };
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme'); // Lee la preferencia guardada en localStorage
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');  // Aplica la preferencia guardada: 'dark' o 'light'
        } else {
            // Si no hay preferencia guardada, detecta la preferencia del sistema operativo
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark'); // Añade la clase 'dark' al <html>
            localStorage.setItem('theme', 'dark');           // Guarda la preferencia en localStorage
        } else {
            document.documentElement.classList.remove('dark'); // Remueve la clase 'dark'
            localStorage.setItem('theme', 'light');             // Guarda la preferencia como 'light'
        }
    }, [isDark]);

    //Mostrar contraseña
    const [showPassword, setShowPassword] = useState(false);

    // SideBar menu
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSideBar((prev) => !prev);

    };


    //nombre del chat actual y menu desplegable
    const [chatName, setChatName] = useState("Nombre del chat");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownConfigOpen, setIsDropdownConfigOpen] = useState(false);

    // Estados para notificaciones
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Nueva actualización", message: "Se ha actualizado el sistema", time: "hace 2 min", read: false },
        { id: 2, title: "Mensaje recibido", message: "Tienes un nuevo mensaje de usuario", time: "hace 5 min", read: false },
        { id: 3, title: "Backup completado", message: "El backup diario se completó exitosamente", time: "hace 1 hora", read: true }
    ]);

    // Funciones para notificaciones
    const unreadNotifications = notifications.filter(n => !n.read).length;
    const hasNotifications = notifications.length > 0;

    const handleNotificationClick = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setIsNotificationOpen(false);
    };
    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    // Estado para controlar el modal del sidebar
    const [isModalSidebarOpen, setIsModalSidebarOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isModalSidebarOpen) {
                setIsModalSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Limpiar el listener al desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isModalSidebarOpen, setIsModalSidebarOpen]);
    // Close modal on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalSidebarOpen(false);
        }
    };
    // Toggle Sidebar Modal
    const handleToggleModalSidebar = () => {
        setIsModalSidebarOpen(!isModalSidebarOpen);
    };

    //modal de preguntas frecuentes
    const questions = [
        {
            id: 1,
            title: "Tiempos de Espera y Permanencia",
            icon: <Clock className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
            description: "Consultas relacionadas con el tiempo promedio que los vehículos permanecen en distintas regiones o zonas, segmentadas por fechas específicas o periodos definidos.",
            detailedInfo: "Esta sección te permite analizar en profundidad los tiempos de permanencia de vehículos en diferentes zonas geográficas. Puedes filtrar por fechas específicas, tipos de vehículo, y obtener métricas detalladas sobre patrones de comportamiento.",
            questioOptions: [
                {
                    id: 1, titleQuestion: 'Tiempo promedio de permanencia por zona', formFields: [
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: true },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                },
                {
                    id: 2, titleQuestion: 'Tiempo promedio de permanencia por Región', formFields: [
                        { name: "region", label: "Región", type: "select", options: [], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                    ]
                },
                {
                    id: 3, titleQuestion: 'Tiempo promedio de permanencia por Vehículo', formFields: [
                        { name: "vehiculo", label: "Vehículo", type: "select", options: [], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                    ]
                }
            ],

        },
        {
            id: 2,
            title: "Ranking de tiempos críticos",
            icon: <Medal className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
            description: "Preguntas que permiten analizar rankings críticos de tiempos de permanencia de los vehículos, segmentados por tipo de vehículo, zona, región y periodos definidos.",
            detailedInfo: "Genera rankings de rendimiento basados en tiempos críticos de permanencia. Identifica las zonas y vehículos con mejor y peor desempeño, estableciendo benchmarks para optimización operativa.",
            questioOptions: [
                {
                    id: 1, titleQuestion: 'Top N de regiones por zona', formFields: [
                        { name: "Top", label: "Top", type: "number", required: true, },
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                },
                {
                    id: 2, titleQuestion: 'Top N de vehículos por por zona', formFields: [
                        { name: "Top", label: "Top", type: "number", required: true, },
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                },
                {
                    id: 3, titleQuestion: 'Top N de vehículos por por region', formFields: [
                        { name: "Top", label: "Top", type: "number", required: true, },
                        { name: "region", label: "Región", type: "select", options: [], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                }
            ],
        },
        {
            id: 3,
            title: "Tendencias y Cumplimiento",
            icon: <TrendingUp className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
            description: "Preguntas enfocadas en analizar la evolución del comportamiento operativo y el cumplimiento de tiempos por región, zona o vehículo, a lo largo de distintos periodos.",
            detailedInfo: "Analiza la evolución temporal del comportamiento operativo y mide el cumplimiento de objetivos de tiempo. Identifica tendencias, patrones estacionales y áreas de mejora en el rendimiento operacional.",
            questioOptions: [
                {
                    id: 1, titleQuestion: 'Tendencia por zona', formFields: [
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: true },


                    ]
                },
                {
                    id: 2, titleQuestion: 'Tendencia por Región', formFields: [
                        { name: "region", label: "Región", type: "select", options: [], required: true, unique: true },


                    ]
                },
                {
                    id: 3, titleQuestion: 'Tendencia por Vehículo', formFields: [
                        { name: "vehiculo", label: "Vehículo", type: "select", options: [], required: true, unique: true },


                    ]
                }
            ],
        },
    ];
    const [isOpenFAQ, setIsOpenFAQ] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState(1);
    const [selectedQuestionOption, setSelectedQuestionOption] = useState(null); // Opción de pregunta seleccionada

    const handleSlideClick = (questionId) => {
        setSelectedFAQ(questionId);  // Establece la pregunta seleccionada
        setIsOpenFAQ(true);              // Abre el modal

    };


    //estado para chat actual
    const fakeDataToSend = {
        idgrupo: 1,
        idquestionslect: 2,
        rol: "usuario",
        formData: {
            nombre: "Usuario de prueba",
            email: "test@example.com",
            mensaje: "Esta es una consulta de prueba"
        },
        puntoInteresTemporal: undefined,
        fechaEnvio: new Date().toISOString(),
        preguntaFormulada: "¿Cómo puedo realizar una consulta sobre logística?"
    };

    const fakeMensajeChatbot = {
        pregunta: fakeDataToSend,
        respuesta: ""
    };

    // Estado con datos fake para pruebas
    const [chatHistoryCurrent, setChatHistoryCurrent] = useState([]);
    const [mensajeInput, setMensajeInput] = useState('');

    // Nuevos estados para autenticación
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // Función para hacer login usando ApiService
    // Función para hacer login usando ApiService - CORREGIDA
    // Función para hacer login usando ApiService - CORREGIDA CON DEBUGGING
    const login = async (email, password) => {
        console.log("🔄 Login iniciado en contexto para:", email);
        setIsLoading(true);

        try {
            console.log("📡 Llamando a apiService.login...");
            const result = await apiService.login(email, password);
            console.log("📥 Respuesta de apiService:", result);

            if (result.success) {
                console.log("✅ Login exitoso en contexto");
                // Guardar token en localStorage
                localStorage.setItem('token', result.data.access_token);
                localStorage.setItem('refresh_token', result.data.refresh_token);

                setUser(result.data.user);
                setIsAuthenticated(true);
                setError(null); // Limpiar error en caso de éxito

                return { success: true, data: result.data };
            } else {
                console.log("❌ Login fallido en contexto:", result.error);
                return { success: false, error: result.error };
            }
        } catch (err) {
            console.log("💥 Error en catch del contexto:", err);
            console.log("💥 Detalles del error:", err.response?.data);

            // ✅ CORREGIDO: era "error" ahora es "err"
            const errorMessage = err.response?.data?.detail || err.message || 'Error inesperado en el login';
            console.log("💥 Mensaje de error procesado:", errorMessage);

            return { success: false, error: errorMessage };
        } finally {
            console.log("🏁 Finalizando login, setting isLoading = false");
            setIsLoading(false);
        }
    };

    // Función para logout usando ApiService
    const logout = async () => {
        try {
            await apiService.logout();
        } catch (error) {
            console.warn('Error en logout:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setError(null);
        }
    };

    

    // Función para verificar si hay token válido al cargar la app - MEJORADA
    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token');
        console.log("🔍 Verificando estado de autenticación. Token presente:", !!token);

        if (!token) {
            console.log("❌ No hay token, usuario no autenticado");
            setIsAuthenticated(false);
            setUser(null);
            return false;
        }

        try {
            console.log("📡 Verificando token con el servidor...");
            const result = await apiService.verifyToken();

            if (result.success) {
                console.log("✅ Token válido, usuario autenticado:", result.data);
                setUser(result.data);
                setIsAuthenticated(true);
                return true;
            } else {
                console.log("❌ Token inválido:", result.error);
                // Token inválido, limpiar datos
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                setUser(null);
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.warn('❌ Error verificando token:', error);
            // En caso de error, limpiar por seguridad
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            setUser(null);
            setIsAuthenticated(false);
            return false;
        }
    };

    return (
        <LogisticoContext.Provider value={{

            isDark, setIsDark, toggleDarkMode,

            showPassword, setShowPassword,

            isOpenSideBar, setIsOpenSideBar, toggleSidebar,
            chatName, isDropdownOpen, setIsDropdownOpen,

            isNotificationOpen, setIsNotificationOpen,
            notifications, setNotifications,
            unreadNotifications, hasNotifications, handleNotificationClick, clearAllNotifications, markAsRead,

            isDropdownConfigOpen, setIsDropdownConfigOpen,

            isModalSidebarOpen, setIsModalSidebarOpen, handleOverlayClick, handleToggleModalSidebar,

            questions, isOpenFAQ, setIsOpenFAQ, selectedFAQ, setSelectedFAQ, handleSlideClick, selectedQuestionOption, setSelectedQuestionOption,
            chatHistoryCurrent, setChatHistoryCurrent, mensajeInput, setMensajeInput,
            user,
            isAuthenticated,
            isLoading,
            error,
            login,
            logout,
            checkAuthStatus,
            setError
        }}>
            {children}
        </LogisticoContext.Provider>
    )
}

export { LogisticoContext, LogisticoProvider };