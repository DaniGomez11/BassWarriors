import { Check, Edit2 } from "lucide-react";
import React from "react";
import { Quarter, User } from "../../types";

interface PaymentsTableProps {
  users: User[];
  isAdmin: boolean;
  editMode: boolean;
  togglePayment: (userId: number, quarter: Quarter) => void;
}

function getPaymentStatus(payments: User["payments"]): string {
  const paid = Object.values(payments).filter(Boolean).length;
  return `${paid}/4 trimestres pagados`;
}

export default function PaymentsTable({
  users,
  isAdmin,
  editMode,
  togglePayment
}: PaymentsTableProps) {
  const quarters: Quarter[] = ["q1", "q2", "q3", "q4"];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Gestión de Cuotas
        </h2>
        {isAdmin && (
          <button
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  {quarters.map((quarter) => (
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
}
