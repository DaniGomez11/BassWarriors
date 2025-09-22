import React from "react";
import PaymentsTable from "../tables/PaymentsTable";
import type { User, Quarter } from "../../types";

interface CuotasProps {
  users: User[];
  isAdmin: boolean;
  editMode: boolean;
  togglePayment: (userId: number, quarter: Quarter) => void;
}

export default function Cuotas({
  users,
  isAdmin,
  editMode,
  togglePayment
}: CuotasProps) {
  return (
    <PaymentsTable
      users={users}
      isAdmin={isAdmin}
      editMode={editMode}
      togglePayment={togglePayment}
    />
  );
}
