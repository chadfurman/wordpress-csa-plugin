import {
    Bundle,
    BundleId,
    BundleOption,
    BundleOptionId,
    BundleOptions, Bundles,
    Region,
    Seasons,
    SelectedBundle
} from "../../types";
import {useState} from "react";

interface SelectBundleProps {
    bundles: Bundles
    bundleOptions: BundleOptions,
    handleSelect: (bundleOption?: BundleOption) => void
}
function SelectBundleOption({bundleOptions, handleSelect}: SelectBundleProps) {
    const [selectedBundleOption, setSelectedBundleOption] = useState<BundleOption>()
    const handleChangeBundleOption = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const bundleOptionId: BundleOptionId = e.currentTarget.getAttribute('data-bundle-option-id') || "missing-bundle-option-id-from-bundle-radio"
        const bundleOption: BundleOption = bundleOptions[bundleOptionId]
        if (selectedBundleOption && selectedBundleOption.id === bundleOptionId) {
            setSelectedBundleOption(undefined);
            handleSelect(undefined)
        } else {
            setSelectedBundleOption(bundleOption);
            handleSelect(bundleOption)
        }
    }
    return <>
        <h3>Bundles</h3>
        {Object.keys(bundles).map((bundleId: BundleId) => {
            const bundle = bundles[bundleId]
            return <div key={bundleId}>
                <h4>{bundle.label}</h4>
                <div>{bundle.description}</div>
                <ul>
                    {bundle.options.map(optionId => {
                        const bundleOption = bundleOptions[optionId]
                        return <li key={optionId}>
                            <label>
                                <>
                                    <input type="radio" data-bundle-id={bundle.id} data-bundle-option-id={bundleOption.id} checked={selectedBundle && selectedBundle.bundleId === bundle.id && selectedBundle.bundleOptionId === bundleOption.id} onChange={handleChangeBundleOption} onClick={handleChangeBundleOption} /> {Intl.NumberFormat('en-us',{style:"currency", currency:"USD"}).format(bundleOption.price)} {bundleOption.label}
                                    <p>{bundleOption.description}</p>
                                </>
                            </label>
                        </li>
                    })}
                </ul>
            </div>
        })}
    </>;
}

export default SelectBundleOption