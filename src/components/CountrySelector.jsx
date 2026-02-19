import { useState, useEffect } from 'react';
import axios from 'axios';

const CountrySelector = ({ label, onSelect }) => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const fetchCountries = async () => {
      try {
        const response = await axios.get(
            'https://disease.sh/v3/covid-19/countries'
        );

        // Tri alphabétique des noms de pays
        const sortedCountries = response.data.sort((a, b) =>
            a.country.localeCompare(b.country)
        );

        setCountries(sortedCountries);
      } catch (error) {
        console.error(
            "Erreur lors du chargement de la liste des pays",
          error
        );
      }
    };

    fetchCountries();
  }, []);

  // Filtrage pour la recherche (optionnel mais recommandé)
  const filteredCountries = countries.filter((c) =>
    c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">
        {label}
      </label>

      <div className="relative">
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer text-slate-800"
          defaultValue=""
        >
          <option value="" disabled>
            Choisir un pays...
          </option>

          {filteredCountries.map((c) => (
            <option
              key={c.countryInfo._id || c.country}
              value={c.country}
            >
              {c.country}
            </option>
          ))}
        </select>

        {/* Petit chevron décoratif */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
          ▼
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
