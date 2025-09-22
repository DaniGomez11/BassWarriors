import React, { useEffect, useState } from "react";
import Header from "./components/layouts/Header";
import Sidebar from "./components/layouts/Sidebar";
import NavigationTabs from "./components/layouts/NavigationTabs";
import Home from "./components/views/Home";
import Cuotas from "./components/views/Cuotas";
import PasswordModal from "./components/modals/PasswordModal";
import { initialUsers, ADMIN_PASSWORD } from "./data/initialUsers";
import type { User, ViewType, Quarter } from "./types";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleMenu = () => setMenuOpen((s) => !s);
  const closeMenu = () => setMenuOpen(false);

  const handleAdminLogin = () => {
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

  const togglePayment = (userId: number, quarter: Quarter) => {
    if (!isAdmin || !editMode) return;
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              payments: { ...user.payments, [quarter]: !user.payments[quarter] }
            }
          : user
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdminLogin();
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Header onMenuClick={toggleMenu} />

      {menuOpen && (
        <Sidebar
          darkMode={darkMode}
          isAdmin={isAdmin}
          onClose={closeMenu}
          onToggleTheme={() => setDarkMode((s) => !s)}
          onAdminClick={() => {
            if (isAdmin) {
              setIsAdmin(false);
              setEditMode(false);
              alert("Sesión de administrador cerrada");
            } else {
              setShowPasswordModal(true);
            }
          }}
        />
      )}

      <main className="pb-6">
        <NavigationTabs currentView={currentView} setView={setCurrentView} />

        {currentView === "home" ? (
          <Home onNavigateCuotas={() => setCurrentView("cuotas")} />
        ) : (
          <Cuotas
            users={users}
            isAdmin={isAdmin}
            editMode={editMode}
            togglePayment={togglePayment}
          />
        )}
      </main>

      <PasswordModal
        visible={showPasswordModal}
        password={passwordInput}
        onChange={setPasswordInput}
        onCancel={() => {
          setShowPasswordModal(false);
          setPasswordInput("");
        }}
        onConfirm={handleAdminLogin}
        onKeyPress={handleKeyPress}
      />

      {/* Desktop admin controls floating in header area */}
      <div className="fixed right-4 bottom-6 flex gap-2">
        {isAdmin && (
          <button
            onClick={() => setEditMode((s) => !s)}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
              editMode
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            }`}
          >
            <span className="mr-2">{editMode ? "Guardar" : "Editar"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
