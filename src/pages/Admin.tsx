import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Pick {
  id: string;
  gift: string;
  created_at: string;
}

const Admin = () => {
  const [picks, setPicks] = useState<Pick[]>([]);

  const fetchPicks = async () => {
    const { data } = await supabase
      .from("gift_picks")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPicks(data);
  };

  useEffect(() => {
    fetchPicks();
  }, []);

  return (
    <div className="min-h-screen bg-valentine-bg p-6 sm:p-10">
      <div className="max-w-lg mx-auto">
        <h1 className="font-serif text-3xl text-valentine-gold mb-2">Admin</h1>
        <p className="text-valentine-cream/50 text-sm mb-8 font-light">Gift picks from Munchkin</p>

        <button
          onClick={fetchPicks}
          className="mb-6 px-4 py-2 text-sm text-valentine-gold border border-valentine-gold/30 rounded-sm hover:border-valentine-gold/60 transition-colors"
        >
          Refresh
        </button>

        {picks.length === 0 ? (
          <p className="text-valentine-cream/40 font-serif italic">No picks yet...</p>
        ) : (
          <div className="space-y-3">
            {picks.map((pick) => (
              <div
                key={pick.id}
                className="border border-valentine-gold/30 rounded-sm p-4 bg-valentine-red/10"
              >
                <p className="text-valentine-gold font-serif text-lg">{pick.gift}</p>
                <p className="text-valentine-cream/40 text-xs mt-1">
                  {new Date(pick.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
