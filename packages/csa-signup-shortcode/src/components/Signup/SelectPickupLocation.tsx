import {PickupLocation, PickupLocationId, PickupLocations} from "../../types";
import {useState} from "react";

interface SelectPickupLocationProps {
    pickupLocations: PickupLocations
    handleSelect: (pickupLocation?: PickupLocation) => void
}
function SelectPickupLocation({pickupLocations, handleSelect}: SelectPickupLocationProps) {
    const [selected, setSelected] = useState<PickupLocation>()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const locationIdAttr = e.currentTarget.getAttribute("data-pickup-location-id")
        if (!locationIdAttr) {
            return
        }
        const locationId: PickupLocationId = locationIdAttr
        const current = pickupLocations[locationId]
        if (selected && selected.id == current.id) {
            console.debug('unselected location: ' + current)
            setSelected(undefined)
            handleSelect(undefined)
        } else {
            console.debug('selected location: ' + current)
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
                        <input type="radio" data-pickup-location-id={pickupLocation.id} checked={(selected && selected.id === pickupLocation.id) || false} onClick={handleChange}/> {pickupLocation.label}
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