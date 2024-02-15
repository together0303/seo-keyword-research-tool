import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { US, GB } from 'country-flag-icons/react/3x2'
import LocationIcon from "./icons/LocationIcon";
import { RiSearchLine } from "@remixicon/react";

const countries = [
    { short: 'Any',   name: 'Anywhere', flag: LocationIcon },
    { short: 'US', name: 'United States', flag: US },
    { short: 'UK', name: 'United Kingdom', flag: GB },
]
export default function CountryPicker(props: {country: string, setCountry: Function}) {
    const getSelectedIcon = () => {
        if ( props.country ) {
            const selCountry = countries.find(c => c.short === props.country);
            if (selCountry) return selCountry.flag;
        }
        return RiSearchLine;
    }
    return <>
        <SearchSelect 
            icon={getSelectedIcon()} 
            value={props.country} 
            onValueChange={(ele) => props.setCountry(ele)}
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