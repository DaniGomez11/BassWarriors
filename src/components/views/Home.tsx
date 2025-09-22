import { Users } from "lucide-react";

interface HomeProps {
  onNavigateCuotas: () => void;
}

export default function Home({ onNavigateCuotas }: HomeProps) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        BASS WARRIORS, DISELO A TU PRIMA
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <Users className="mx-auto mb-4 text-blue-500" size={64} />

        <button
          onClick={onNavigateCuotas}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Ver Cuotas
        </button>
      </div>
    </div>
  );
}
