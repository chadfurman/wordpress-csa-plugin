import {useState} from "react";
import {Region, Regions} from "../../types";

interface SelectRegionsProps {
    regions: Regions,
    handleSelect: (region?: Region) => void
}

const SelectRegion = ({regions, handleSelect}: SelectRegionsProps) => {
    const [selectedRegion, setSelectedRegion] = useState<Region>()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const selection = regions[e.currentTarget.value]
        if (selectedRegion && selectedRegion.id == selection.id) {
            setSelectedRegion(undefined)
            handleSelect(undefined)
        } else {
            setSelectedRegion(selection)
            handleSelect(selection)
        }
    }
    const regionElements = Object.keys(regions).map(regionId => {
        return (
            <li key={regionId} >
                <label>
                    <input type="radio" value={regionId} checked={selectedRegion && selectedRegion.id === regionId} onClick={handleChange} onChange={handleChange}/>
                    {regions[regionId].label}
                </label>
            </li>
        )
    })
    return <>
        <h3>Start by choosing your farm share area:</h3>
        <p>Where you would like to get a share? [answer reveals pricing and pickup locations.]</p>
        <ul>
            {regionElements}
        </ul>
    </>;
}


export default SelectRegion