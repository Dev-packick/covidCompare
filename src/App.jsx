import { useState } from 'react';
import { getCountryData } from "./services/CovidAPI";
import CountrySelector from "./components/CountrySelector";
import CountryStats from "./components/CountryStats";
import ComparisonChart from "./components/ComparisonChart";
import "./App.css";

function App() {
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [loading, setLoading] = useState({ c1: false, c2: false });

  const handleSelect1 = async (name) => {
    if (!name) return;
    setLoading(prev => ({ ...prev, c1: true }));
    const data = await getCountryData(name);
    if (data) setCountry1(data);
    setLoading(prev => ({ ...prev, c1: false }));
  };

  const handleSelect2 = async (name) => {
    if (!name) return;
    setLoading(prev => ({ ...prev, c2: true }));
    const data = await getCountryData(name);
    if (data) setCountry2(data);
    setLoading(prev => ({ ...prev, c2: false }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
            Covid<span className="text-blue-600">Compare</span>
          </h1>
          <p className="text-slate-500 mt-2">Analyse comparative des données sanitaires</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <CountrySelector label="Premier pays" onSelect={handleSelect1} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <CountrySelector label="Deuxième pays" onSelect={handleSelect2} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className={loading.c1 ? "opacity-40 transition-opacity" : "transition-opacity"}>
            {country1 && <CountryStats country={country1} />}
          </div>
          <div className={loading.c2 ? "opacity-40 transition-opacity" : "transition-opacity"}>
            {country2 && <CountryStats country={country2} />}
          </div>
        </div>

        {/* Section Graphique avec les classes suggérées (min-h-112.5 et grow) */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 min-h-112.5 flex flex-col">
          {country1 && country2 ? (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Comparaison Visuelle</h3>
              <div className="grow">
                <ComparisonChart 
                  key={`${country1.country}-${country2.country}`} 
                  country1={country1} 
                  country2={country2} 
                />
              </div>
            </>
          ) : (
            <div className="grow flex flex-col items-center justify-center text-slate-400">
              <div className="mb-4 text-5xl">📊</div>
              <p className="font-medium text-center">
                Veuillez sélectionner deux pays pour générer le graphique
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;