import React from "react";

interface PasswordModalProps {
  visible: boolean;
  password: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function PasswordModal({
  visible,
  password,
  onChange,
  onCancel,
  onConfirm,
  onKeyPress
}: PasswordModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 mx-4 z-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Acceso de Administrador
        </h3>
        <input
          type="password"
          value={password}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-3 border dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
          onKeyPress={onKeyPress}
        />

        <div className="flex space-x-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Acceder
          </button>
          <button
            onClick={onCancel}
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
  );
}
