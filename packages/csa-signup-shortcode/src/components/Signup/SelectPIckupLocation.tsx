import {PickupLocation, PickupLocationId, PickupLocations, Season, SelectedPickupLocation} from "../../types";

interface SelectPickupLocationProps {
    pickupLocations: PickupLocations
    handleUpdateSelectedPickupLocation: (pickupLocation: PickupLocation) => void
}
function SelectPickupLocation({pickupLocations, handleUpdateSelectedPickupLocation}: SelectPickupLocationProps) {
    const handleChangePickupLocation = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const pickupLocationId: PickupLocationId = e.currentTarget.getAttribute('data-pickup-location-id') || "missing-pickup-location-id-from-radio"
        const pickupLocation: PickupLocation = pickupLocations[pickupLocationId]
        console.log("change location")
        if (selectedPickupLocation && selectedPickupLocation.id === pickupLocationId) {
            unsetSelectedPickupLocation();
        } else {
            handleUpdateSelectedPickupLocation(pickupLocation)
        }
    }
    return <>
        <h3>Choose Your {season.label} Pick Up Spot:</h3>
        <div>
            This will be your pickup location for the duration of the season.
            NOTE: Locations and times are subject to change, so please watch your email.
        </div>
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