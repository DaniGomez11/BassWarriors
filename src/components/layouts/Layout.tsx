import React, { useState, useEffect, JSX } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Users,
  Settings,
  Check,
  Edit2
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

// Datos simulados de usuarios (en producción vendrían de la base de datos)
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
    id: 5,
    name: "AITOR",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "YVONNE",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "CALLE",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "RENA",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "RAUL",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "NIL",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "TROME",
    payments: { q1: true, q2: true, q3: false, q4: false }
  },
  {
    id: 5,
    name: "VISO",
    payments: { q1: true, q2: true, q3: false, q4: false }
  }
];

const ADMIN_PASSWORD = "admin123"; // En producción, esto se haría con hash y base de datos

export default function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Aplicar tema oscuro/claro
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleMenu = (): void => setMenuOpen(!menuOpen);
  const closeMenu = (): void => setMenuOpen(false);

  const handleAdminLogin = (): void => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      alert("Acceso de administrador activado");
    } else {
      alert("Contraseña incorrecta");
      setPasswordInput("");
    }
  };

  const togglePayment = (userId: number, quarter: Quarter): void => {
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

  const getPaymentStatus = (payments: UserPayments): string => {
    const paid = Object.values(payments).filter(Boolean).length;
    return `${paid}/4 trimestres pagados`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAdminLogin();
    }
  };

  const renderHome = (): JSX.Element => (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Bienvenido a la Asociación
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <Users className="mx-auto mb-4 text-blue-500" size={64} />
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Gestiona las cuotas de los miembros de nuestra asociación
        </p>
        <button
          onClick={() => setCurrentView("cuotas")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Ver Cuotas
        </button>
      </div>
    </div>
  );

  const renderCuotas = (): JSX.Element => {
    const quarters: Quarter[] = ["q1", "q2", "q3", "q4"];

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Gestión de Cuotas
          </h2>
          {isAdmin && (
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                editMode
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-500 hover:bg-gray-600 text-white"
              }`}
            >
              <Edit2 size={16} className="mr-2" />
              {editMode ? "Guardar" : "Editar"}
            </button>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Usuario
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Q1
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Q2
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Q3
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Q4
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {users.map((user: User) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    {quarters.map((quarter: Quarter) => (
                      <td key={quarter} className="px-4 py-3 text-center">
                        <button
                          onClick={() => togglePayment(user.id, quarter)}
                          disabled={!isAdmin || !editMode}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            user.payments[quarter]
                              ? "bg-green-500 border-green-500"
                              : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500"
                          } ${
                            isAdmin && editMode
                              ? "cursor-pointer hover:bg-green-400"
                              : "cursor-not-allowed"
                          }`}
                        >
                          {user.payments[quarter] && (
                            <Check size={16} className="text-white" />
                          )}
                        </button>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 text-center">
                      {getPaymentStatus(user.payments)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {!isAdmin && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Solo el Trome puede gestionar la movida
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Mi Asociación
          </h1>

          <div className="w-10"></div>
        </div>
      </header>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeMenu}
          ></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Menú
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Cambiar tema */}
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

              {/* Administrador */}
              <button
                onClick={() => {
                  if (isAdmin) {
                    setIsAdmin(false);
                    setEditMode(false);
                    alert("Sesión de administrador cerrada");
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
                  <span className="ml-auto text-xs bg-green-500 text-white px-2 py-1 rounded">
                    Activo
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-6">
        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setCurrentView("home")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                currentView === "home"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setCurrentView("cuotas")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                currentView === "cuotas"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Cuotas
            </button>
          </div>
        </div>

        {/* Content */}
        {currentView === "home" ? renderHome() : renderCuotas()}
      </main>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 mx-4 z-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Acceso de Administrador
            </h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-3 border dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
              onKeyPress={handleKeyPress}
            />
            <div className="flex space-x-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Acceder
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordInput("");
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold"
              >
                Cancelar
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Demo: admin123
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
