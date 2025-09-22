import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Users,
  Settings,
  Check,
  Edit2,
  Home,
  CreditCard
} from "lucide-react";

// Tipos TypeScript
export interface UserPayments {
  q1: boolean;
  q2: boolean;
  q3: boolean;
  q4: boolean;
}

export interface User {
  id: number;
  name: string;
  payments: UserPayments;
}

export type Quarter = "q1" | "q2" | "q3" | "q4";
export type ViewType = "home" | "cuotas";

// Datos de usuarios
const initialUsers: User[] = [
  {
    id: 1,
    name: "PEIX",
    payments: { q1: false, q2: true, q3: false, q4: false }
  },
  {
    id: 2,
    name: "POCHI",
    payments: { q1: true, q2: true, q3: true, q4: false }
  },
  {
    id: 3,
    name: "PUMU",
    payments: { q1: true, q2: false, q3: false, q4: false }
  },
  {
    id: 4,
    name: "VERO",
    payments: { q1: false, q2: false, q3: true, q4: true }
  },
  {
    id: 5,
    name: "LLUC",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 6,
    name: "AITOR",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 7,
    name: "YVONNE",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 8,
    name: "CALLE",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 9,
    name: "RENA",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 10,
    name: "RAUL",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 11,
    name: "NIL",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 12,
    name: "TROME",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 13,
    name: "VISO",
    payments: { q1: true, q2: true, q3: false, q4: false }
  }
];

const ADMIN_PASSWORD = "admin123";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Aplicar tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleAdminLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      // Toast success en lugar de alert
      showToast("Acceso de administrador activado ✓", "success");
    } else {
      showToast("Contraseña incorrecta ✗", "error");
      setPasswordInput("");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    // Simple toast implementation
    const toast = document.createElement("div");
    toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-white font-medium ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const togglePayment = (userId: number, quarter: Quarter) => {
    if (!isAdmin || !editMode) return;

    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              payments: { ...user.payments, [quarter]: !user.payments[quarter] }
            }
          : user
      )
    );
  };

  const getPaymentStatus = (payments: UserPayments) => {
    const paid = Object.values(payments).filter(Boolean).length;
    const percentage = (paid / 4) * 100;
    return { paid, total: 4, percentage };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdminLogin();
    }
  };

  // Componente Home optimizado para móvil
  const renderHome = () => (
    <div className="px-4 py-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          BASS WARRIORS
        </h1>
        <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-6">
          DÍSELO A TU PRIMA
        </p>
      </div>

      <div className="space-y-4">
        {/* Tarjeta principal */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <Users className="mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2 text-center">
            Gestión de Cuotas
          </h2>
          <p className="text-blue-100 text-center mb-6 text-sm">
            Controla los pagos de los miembros
          </p>
          <button
            onClick={() => setCurrentView("cuotas")}
            className="w-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 hover:bg-opacity-30 text-white py-3 rounded-lg font-semibold transition-all active:scale-95"
          >
            Ver Cuotas
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {users.reduce(
                (acc, user) =>
                  acc + Object.values(user.payments).filter(Boolean).length,
                0
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Cuotas Pagadas
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {users.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Miembros
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente Cuotas optimizado para móvil
  const renderCuotas = () => {
    const quarters: Quarter[] = ["q1", "q2", "q3", "q4"];
    const quarterLabels = { q1: "Q1", q2: "Q2", q3: "Q3", q4: "Q4" };

    return (
      <div className="px-4 py-6">
        {/* Header con botón de edición */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Gestión de Cuotas
          </h2>
          {isAdmin && (
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all active:scale-95 ${
                editMode
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              }`}
            >
              <Edit2 size={16} className="mr-1" />
              {editMode ? "Guardar" : "Editar"}
            </button>
          )}
        </div>

        {/* Lista de usuarios optimizada para móvil */}
        <div className="space-y-3">
          {users.map((user) => {
            const status = getPaymentStatus(user.payments);
            return (
              <div
                key={user.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                {/* Header del usuario */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {status.paid}/{status.total}
                      </div>
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300"
                          style={{ width: `${status.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trimestres */}
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-3">
                    {quarters.map((quarter) => (
                      <button
                        key={quarter}
                        onClick={() => togglePayment(user.id, quarter)}
                        disabled={!isAdmin || !editMode}
                        className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                          user.payments[quarter]
                            ? "bg-green-500 border-green-500 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                        } ${
                          isAdmin && editMode
                            ? "cursor-pointer hover:scale-105"
                            : "cursor-not-allowed opacity-75"
                        }`}
                      >
                        {user.payments[quarter] ? (
                          <Check size={20} />
                        ) : (
                          <span className="text-sm font-medium">
                            {quarterLabels[quarter]}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isAdmin && (
          <div className="mt-6 text-center">
            <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">
                🔒 Solo el TROME puede gestionar la movida
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header móvil optimizado */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-95"
          >
            <Menu size={22} className="text-gray-700 dark:text-gray-300" />
          </button>

          <h1 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            BASS WARRIORS
          </h1>

          {isAdmin && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
      </header>

      {/* Sidebar móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMenu}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Menú
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
              >
                <X size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {/* Navegación */}
              <button
                onClick={() => {
                  setCurrentView("home");
                  closeMenu();
                }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  currentView === "home"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Home size={20} className="mr-3" />
                <span>Inicio</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("cuotas");
                  closeMenu();
                }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  currentView === "cuotas"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <CreditCard size={20} className="mr-3" />
                <span>Cuotas</span>
              </button>

              <hr className="my-4 border-gray-200 dark:border-gray-600" />

              {/* Opciones */}
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  closeMenu();
                }}
                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-500 mr-3" />
                ) : (
                  <Moon size={20} className="text-blue-500 mr-3" />
                )}
                <span className="text-gray-700 dark:text-gray-300">
                  {darkMode ? "Tema Claro" : "Tema Oscuro"}
                </span>
              </button>

              <button
                onClick={() => {
                  if (isAdmin) {
                    setIsAdmin(false);
                    setEditMode(false);
                    showToast("Sesión de administrador cerrada", "success");
                  } else {
                    setShowPasswordModal(true);
                  }
                  closeMenu();
                }}
                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings
                  size={20}
                  className="text-gray-600 dark:text-gray-400 mr-3"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {isAdmin ? "Cerrar Admin" : "Administrador"}
                </span>
                {isAdmin && (
                  <span className="ml-auto text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    Activo
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="pb-20">
        {currentView === "home" ? renderHome() : renderCuotas()}
      </main>

      {/* Modal de contraseña */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm z-10 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-center">
              Acceso de Administrador
            </h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-3 border dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white text-base"
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all active:scale-95"
              >
                Acceder
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordInput("");
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all active:scale-95"
              >
                Cancelar
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Demo: admin123
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
