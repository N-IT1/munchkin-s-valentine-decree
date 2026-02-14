import { useState, useEffect } from "react";

interface Pick {
  gift: string;
  timestamp: string;
}

const Admin = () => {
  const [picks, setPicks] = useState<Pick[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("valentine-picks") || "[]");
    setPicks(stored);
  }, []);

  const clearPicks = () => {
    localStorage.removeItem("valentine-picks");
    setPicks([]);
  };

  return (
    <div className="min-h-screen bg-valentine-bg p-6 sm:p-10">
      <div className="max-w-lg mx-auto">
        <h1 className="font-serif text-3xl text-valentine-gold mb-2">Admin</h1>
        <p className="text-valentine-cream/50 text-sm mb-8">Gift picks from Munchkin</p>

        {picks.length === 0 ? (
          <p className="text-valentine-cream/40 font-serif italic">No picks yet...</p>
        ) : (
          <div className="space-y-3">
            {picks.map((pick, i) => (
              <div
                key={i}
                className="border border-valentine-gold/30 rounded-sm p-4 bg-valentine-red/10"
              >
                <p className="text-valentine-gold font-serif text-lg">{pick.gift}</p>
                <p className="text-valentine-cream/40 text-xs mt-1">
                  {new Date(pick.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {picks.length > 0 && (
          <button
            onClick={clearPicks}
            className="mt-6 px-4 py-2 text-sm text-valentine-cream/50 border border-valentine-gold/20 rounded-sm hover:border-valentine-gold/50 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default Admin;
