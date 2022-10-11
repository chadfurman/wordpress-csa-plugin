import {PickupLocation, PickupLocationId, PickupLocations, Season, SelectedPickupLocation} from "../../types";
import {useState} from "react";

interface SelectPickupLocationProps {
    pickupLocations: PickupLocations
    handleSelect: (pickupLocation?: PickupLocation) => void
}
function SelectPickupLocation({pickupLocations, handleSelect}: SelectPickupLocationProps) {
    const [selected, setSelected] = useState<PickupLocation>()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const current = pickupLocations[e.currentTarget.value]
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
                        <input type="radio" data-pickup-location-id={pickupLocation.id} checked={(selectedPickupLocation && selectedPickupLocation.id === pickupLocation.id) || false} onClick={handleChangePickupLocation} onChange={handleChangePickupLocation}/> {pickupLocation.label}
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