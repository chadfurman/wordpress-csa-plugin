import {useState} from "react";
import {Seasons} from "../../types";

interface SelectSeasons {
    seasons: Seasons
    handleSelect: (seasons: Seasons) => void
}
const SelectSeasons = ({seasons, handleSelect}: SelectSeasons) => {
    const [selectedSeasons, setSelectedSeasons] = useState<Seasons>({})
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seasonId = e.currentTarget.value
        const isSelected = e.currentTarget.checked
        setSelectedSeasons((selectedSeasons) => {
            if (!isSelected) {
                delete selectedSeasons[seasonId]
            } else if (isSelected) {
                selectedSeasons[seasonId] = seasons[seasonId]
            }
            handleSelect(selectedSeasons)
            return {
                ...selectedSeasons
            }
        })
    }

    return <>
        <h3>Which Seasons are you interested in?</h3>
        <ul>
            {Object.keys(seasons).map(seasonId => {
                const season = seasons[seasonId]
                return (
                    <li key={seasonId}>
                        <label>
                            <input type="checkbox" value={season.id} onChange={handleChange}/>
                            {season.label}
                        </label>
                    </li>
                )
            })}
        </ul>
    </>;
}

export default SelectSeasons