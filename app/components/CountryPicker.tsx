import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { US, GB } from 'country-flag-icons/react/3x2'
import LocationIcon from "./icons/LocationIcon";
import { RiSearchLine } from "@remixicon/react";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const countries = [
    { short: '',  value: '', name: 'Anywhere', flag: LocationIcon },
    { short: 'US', value: 'United States', name: 'United States', flag: US },
    { short: 'CA', value: 'Canada', name: 'Canada', flag: US },
    { short: 'UK', value: 'United Kingdom', name: 'United Kingdom', flag: GB },
]
function CountryPicker({country= '', setCountry= () => {}, className= '', api=''}: {country: string, setCountry: Function, className?: string, api?: string}) {
    const getSelectedIcon = () => {
        if ( country ) {
            const selCountry = countries.find(c => c.value === country);
            if (selCountry) return selCountry.flag;
        }
        return RiSearchLine;
    }
    // useEffect(() => {
    //     axios.get(`${API_URL}/api/keywords/location?api=${api}`)
    //     .then((d: any) => {
    //         if (d.data?.success) {
    //             const data = JSON.parse(d.data.data);
    //             // if (data['result'][0]?.['items']) setSerp(data['result'][0]['items'].slice(0, 10));
    //             console.log(data);
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }, [])
    return <>
        <SearchSelect 
            icon={getSelectedIcon()} 
            value={country} 
            onValueChange={(ele) => setCountry(ele)}
            className={className}
        >
            { countries.map((c, index) => (
                <SearchSelectItem 
                    value={c.value} 
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