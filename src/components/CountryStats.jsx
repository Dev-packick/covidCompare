import { Activity, Skull, ShieldCheck, Users, Calendar } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, colorClass }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} className="text-white" />
        </div>
        <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value.toLocaleString()}</p>
        </div>
    </div>
    );

    const CountryStats = ({ country }) => {
    if (!country) return null;

    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 w-full">
        {/* Header avec le drapeau */}
        <div className="flex items-center space-x-4 mb-6">
            <img 
            src={country.countryInfo.flag}
            alt={`Drapeau ${country.country}`}
            className="w-12 h-8 object-cover rounded shadow-sm"
            />
            <h2 className="text-2xl font-bold text-gray-800">{country.country}</h2>
        </div>

        {/* Grille de stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard 
            icon={Activity} 
            label="Cas Totaux"
            value={country.cases}
            colorClass="bg-blue-500"
            />
            <StatCard
            icon={Users}
            label="Cas Actifs"
            value={country.active}
            colorClass="bg-orange-500"
            />
            <StatCard
            icon={Skull}
            label="Décès"
            value={country.deaths}
            colorClass="bg-red-500"
            />
            <StatCard 
            icon={ShieldCheck}
            label="Vaccinations"
            value={country.vaccinations}
            colorClass="bg-green-500"
            />
        </div>

        {/* Date de mise à jour */}
        <div className="mt-6 flex items-center text-xs text-gray-400">
            <Calendar size={14} className="mr-1" />
            Mis à jour le : {country.updatedAt}
        </div>
        </div>
    );
};

export default CountryStats;