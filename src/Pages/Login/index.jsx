import React, { useState, useEffect } from "react";
import { LogisticoContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Mail, LockKeyhole, EyeOff, Eye } from "lucide-react";
import logo from "../../../public/logo.png";
import { useLocation } from "react-router-dom";

function Login() {
  const {
    isDark,
    toggleDarkMode,
    showPassword,
    setShowPassword,
    login,
    error,
    setError,
    isLoading,
  } = React.useContext(LogisticoContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la ruta de donde venía el usuario (si fue redirigido por ProtectedRoute)
  const from = location.state?.from?.pathname || "/chat";
  const from2 = location.state?.from?.pathname || "/chat2";
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🚀 handleLogin ejecutándose...");

    setError(null);
    navigate(from2, { replace: false });
    // try {
    //     navigate(from2, { replace: true });
    //   const result = await login(email, password);
    //   console.log("🧪 Se llamó login, resultado:", result);

    //   if (result.success) {
    //     console.log("✅ Login exitoso, navegando a:", from);
    //     // Redirigir a donde venía o al chat por defecto
    //     navigate(from, { replace: true });
    //   } else {
    //     console.log("❌ Login fallido, estableciendo error:", result.error);
    //     navigate(from2, { replace: true });
    //   }
    // } catch (error) {
    //   console.log("💥 Error inesperado en handleLogin:", error);
    //   setError("Error inesperado. Intenta de nuevo.");
    //   navigate(from2, { replace: true });
    // }
  };

  // Limpiar error cuando el usuario modifica los campos
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <>
      <div className="bg-zinc-100 dark:bg-[#09090B] relative w-full max-h-screen ">
        {/* SVG y fondos decorativos - sin cambios */}
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute inset-0 z-40 h-full w-full text-zinc-900/15 dark:text-white/10 
                            [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
            width="100%"
            height="100%"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <pattern
                id="highlightGrid"
                width="560"
                height="480"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="160"
                  y="80"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.2)"
                />
                <rect
                  x="400"
                  y="240"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.15)"
                />
                <rect
                  x="80"
                  y="320"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.1)"
                />
                <rect
                  x="320"
                  y="160"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.12)"
                />
                <rect
                  x="480"
                  y="0"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.14)"
                />
                <rect
                  x="0"
                  y="240"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.11)"
                />
                <rect
                  x="240"
                  y="400"
                  width="80"
                  height="80"
                  fill="rgba(100,100,100,0.13)"
                />
              </pattern>
              <radialGradient id="fade" cx="50%" cy="40%" r="75%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="fadeMask">
                <rect width="100%" height="100%" fill="url(#fade)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#highlightGrid)"
              mask="url(#fadeMask)"
              opacity="0.6"
              className="animate-pulse"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
              mask="url(#fadeMask)"
            />
          </svg>
        </div>

        <div
          className="absolute inset-x-0 top-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/532] w-[69.25rem] flex-none bg-gradient-to-r from-cyan-500 to-blue-800 opacity-20 dark:opacity-20"
            style={{
              clipPath:
                "polygon(77.5% 40.13%, 90% 10%, 100% 50%, 95% 80%, 92% 85%, 75% 65%, 61.26% 54.7%, 50% 54.7%, 47.24% 65.81%, 50% 85%, 26.16% 73.91%, 0.1% 100%, 1% 40.13%, 20% 48.75%, 60% 0.25%, 67.5% 32.63%)",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 z-40 w-full min-h-[650px] flex flex-col lg:flex-row items-center lg:items-start lg:justify-start justify-center ">
          <div
            id="selectform"
            className="w-[90%] lg:w-[50%] ml-0 lg:ml-10 h-[450px] lg:h-[100%] bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(47,51,51,0.3)] backdrop-blur-md rounded-md shadow-xl flex justify-center items-center order-2 lg:order-1 "
          >
            <div className="w-full justify-center">
              <p className="mt-10 text-zinc-700 dark:text-zinc-300 text-3xl font-extralight text-center">
                INICIO DE SESIÓN
              </p>

              {/* ✅ FORMULARIO EXPLÍCITO */}
              <form onSubmit={handleSubmit}>
                <div className="mt-6 mx-10">
                  <label
                    htmlFor="email-input"
                    className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    Email
                  </label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <Mail className="w-4 h-4 text-gray-500 dark:text-zinc-300"></Mail>
                    </div>
                    <input
                      type="email"
                      id="email-input"
                      className="bg-white dark:bg-[rgba(47,51,51,0.6)] text-gray-500 dark:text-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-none ring-1 ring-zinc-200 dark:ring-zinc-700"
                      placeholder="email@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 mx-10">
                  <label
                    htmlFor="password-input"
                    className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    Contraseña
                  </label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <LockKeyhole className="w-4 h-4 text-gray-500 dark:text-zinc-300"></LockKeyhole>
                    </div>
                    <div className="">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password-input"
                        className="bg-white dark:bg-[rgba(47,51,51,0.6)] text-gray-500 dark:text-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-none ring-1 ring-zinc-200 dark:ring-zinc-700"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute text-gray-400 inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden`}
                      >
                        {showPassword ? (
                          <Eye className="w-4 h-4 text-gray-500 dark:text-zinc-300"></Eye>
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-500 dark:text-zinc-300"></EyeOff>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 mx-10">
                  {error && (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-700 dark:border-red-600"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Error</span>
                      <div>
                        {Array.isArray(error) ? (
                          error.map((e, i) => <p key={i}>{e.msg}</p>)
                        ) : typeof error === "object" && error?.detail ? (
                          <p>{error.detail}</p>
                        ) : (
                          <p>{String(error)}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ✅ BOTÓN DE TIPO SUBMIT */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#E4E4E7] h-10 rounded-md text-gray-800 transition-all duration-300 hover:bg-zinc-300 hover:shadow-md hover:translate-y-px hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "INICIANDO..." : "INICIAR SESIÓN"}
                  </button>
                </div>

                <div className="mt-2 mx-10">
                  <p className="text-center text-gray-500">
                    ¿Olvido su contraseña? recupérala{" "}
                    <span className="text-blue-900">
                      <a className="cursor-pointer">aquí</a>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div
            id="selectimage"
            className="w-[90%] lg:w-[50%] h-auto lg:h-[100%] rounded-md flex items-center justify-center order-1 lg:order-2 pb-8 lg:pb-8"
          >
            <img src={logo} className="w-22 md:w-30 lg:w-32 mr-2" alt="Logo" />
            <div>
              <p className="text-justify text-zinc-700 dark:text-zinc-400 text-2xl lg:text-5xl md:text-4xl/[1.07] font-extralight mb-0">
                CHATBOT
              </p>
              <p className="bg-gradient-to-br from-gray-600 to-gray-900 dark:from-white dark:to-zinc-500 bg-clip-text text-5xl/[1.07] md:text-7xl/[1.07] font-bold tracking-tight text-transparent mt-[-0.5rem]">
                LOGISTICO
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
