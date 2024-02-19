import { RiArrowDownLine, RiArrowDropDownLine } from "@remixicon/react";
import { useState } from "react";
import Popup from 'reactjs-popup';

type FilterButtonTypes = {
    text: string,
    value: string,
    handleChange: Function,
    className?: string
};
const PopupExample = () => (
    <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
    </Popup>
);

function FilterButton({
    text = '',
    value = '',
    handleChange = () => { },
    className = ''
}: FilterButtonTypes) {
    const [open, setOpen] = useState(false);
    return <>
            <button onClick={() => setOpen(true)} className={`h-9 py-2 px-3 text-sm text-secondary border border-surface-400 hover:bg-surface rounded-lg flex justify-center items-center ${className}`}>
                <span>{text}</span>
                <span className="text-primary ml-1 font-medium">{value}</span>
                <RiArrowDropDownLine />
            </button>
            {/* {open && <PopupExample /> } */}
    </>;
}

export default FilterButton;