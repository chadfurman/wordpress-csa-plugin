import {PickupLocation, PickupLocationId, PickupLocations, Season, SelectedPickupLocation} from "../../types";
import {useState} from "react";

interface SelectPickupLocationProps {
    pickupLocations: PickupLocations
    handleSelect: (pickupLocation?: PickupLocation) => void
}
function SelectPickupLocation({pickupLocations, handleSelect}: SelectPickupLocationProps) {
    const [selected, setSelected] = useState<PickupLocation>()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const location = e.currentTarget.value
        const current = pickupLocations[location]
        if (selected && selected.id == current.id) {
            setSelected(undefined)
            handleSelect(undefined)
        } else {
            setSelected(current)
            handleSelect(current)
        }
    }
    return <>
        <ul>
            {Object.keys(pickupLocations).map(pickupLocationKey => {
                const pickupLocation = pickupLocations[pickupLocationKey]
                return <li key={pickupLocationKey}>
                    <label>
                        <input type="radio" data-pickup-location-id={pickupLocation.id} checked={(selected && selected.id === pickupLocation.id) || false} onClick={handleChange} onChange={handleChange}/> {pickupLocation.label}
                        {pickupLocation.description ?
                            <div>
                                {pickupLocation.description}
                            </div>
                            : "" }
                    </label>
                </li>
            })}
        </ul>
    </>
}

export default SelectPickupLocation