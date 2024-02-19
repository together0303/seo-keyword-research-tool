import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { US, GB } from 'country-flag-icons/react/3x2'
import LocationIcon from "./icons/LocationIcon";
import { RiSearchLine } from "@remixicon/react";

const countries = [
    { short: 'Any',   name: 'Anywhere', flag: LocationIcon },
    { short: 'US', name: 'United States', flag: US },
    { short: 'UK', name: 'United Kingdom', flag: GB },
]
function CountryPicker({country= '', setCountry= () => {}, className= ''}: {country: string, setCountry: Function, className?: string}) {
    const getSelectedIcon = () => {
        if ( country ) {
            const selCountry = countries.find(c => c.short === country);
            if (selCountry) return selCountry.flag;
        }
        return RiSearchLine;
    }
    return <>
        <SearchSelect 
            icon={getSelectedIcon()} 
            value={country} 
            onValueChange={(ele) => setCountry(ele)}
            className={className}
        >
            { countries.map((c, index) => (
                <SearchSelectItem 
                    value={c.short} 
                    icon={c.flag} 
                    key={index}
                >
                    {c.name}
                </SearchSelectItem>
            ))}
        </SearchSelect>
    </>;
}

export default CountryPicker;