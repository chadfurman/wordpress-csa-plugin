import {
    Bundle,
    BundleId,
    BundleOption,
    BundleOptionId,
    BundleOptions, Bundles,
} from "../../types";
import {useState} from "react";

interface SelectBundleProps {
    bundles: Bundles
    bundleOptions: BundleOptions,
    handleSelect: (bundle?: Bundle, bundleOption?: BundleOption) => void
}
function SelectBundleOption({bundles, bundleOptions, handleSelect}: SelectBundleProps) {
    const [selectedBundleOption, setSelectedBundleOption] = useState<BundleOption>()
    const [selectedBundle, setSelectedBundle] = useState<Bundle>()
    const handleChangeBundleOption = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const bundleId: BundleId = e.currentTarget.getAttribute('data-bundle-id') || "missing-bundle-id-from-bundle-radio"
        const bundle: Bundle = bundles[bundleId]
        const bundleOptionId: BundleOptionId = e.currentTarget.getAttribute('data-bundle-option-id') || "missing-bundle-option-id-from-bundle-radio"
        const bundleOption: BundleOption = bundleOptions[bundleOptionId]
        if (selectedBundle && selectedBundle.id == bundleId && selectedBundleOption && selectedBundleOption.id === bundleOptionId) {
            setSelectedBundle(undefined);
            setSelectedBundleOption(undefined);
            handleSelect(undefined, undefined)
        } else {
            setSelectedBundle(bundle);
            setSelectedBundleOption(bundleOption);
            handleSelect(bundle, bundleOption)
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
                    {bundle.bundle_option_ids.map(optionId => {
                        const bundleOption = bundleOptions[optionId]
                        return <li key={optionId}>
                            <label>
                                <>
                                    <input type="radio" data-testid={bundle.id+'-'+bundleOption.id} data-bundle-id={bundle.id} data-bundle-option-id={bundleOption.id} checked={selectedBundle && selectedBundle.id === bundle.id && selectedBundleOption && selectedBundleOption.id === bundleOption.id} onClick={handleChangeBundleOption} /> {Intl.NumberFormat('en-us',{style:"currency", currency:"USD"}).format(bundleOption.price)} {bundleOption.label}
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