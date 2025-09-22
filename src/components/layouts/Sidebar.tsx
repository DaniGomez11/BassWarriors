import { X, Sun, Moon, Settings } from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onAdminClick: () => void;
}

export default function Sidebar({
  darkMode,
  isAdmin,
  onClose,
  onToggleTheme,
  onAdminClick
}: SidebarProps) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Menú
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <button
            onClick={() => {
              onToggleTheme();
              onClose();
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
              onAdminClick();
              onClose();
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
  );
}
