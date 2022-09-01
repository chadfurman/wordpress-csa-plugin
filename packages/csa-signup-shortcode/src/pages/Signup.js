import React, {useEffect, useState} from 'react'

const SignupRegions = ({selectedRegion, changeRegion}) => {
    const regions = {
        "western-ma": "Western Massachusetts",
        "boston-worcester": "Boston Area & Worcester",
    }
    const handleRegionChange = (e) => {
        changeRegion(e.target.value)
    }
    const regionElements = Object.keys(regions).map(region => {
        return (
            <li key={region} >
                <input type="radio" value={region} checked={selectedRegion === region} onChange={handleRegionChange}/>
                <label>{regions[region]}</label>
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

const SignupSeasons = ({selectedSeasons, changeSeasons}) => {
    let seasons = [...selectedSeasons]
    const handleSeasonChange = (e) => {
        const season = e.target.value
        const isSelected = e.target.checked
        if (!isSelected) {
            seasons = seasons.filter((e) => e !== season)
        } else if (isSelected && seasons.indexOf(season) === -1) {
            seasons.push(season)
        }
        changeSeasons(seasons)
    }

    return <>
        <h3>Which Seasons are you interested in?</h3>
        <ul>
            <li>
                <input type="checkbox" value="summer" id="csa-share-summer-csa" onChange={handleSeasonChange}/>
                <label htmlFor="csa-share-summer-csa">Summer CSA</label>
            </li>
            <li>
                <input type="checkbox" value="fall" id="csa-share-fall-csa" onChange={handleSeasonChange}/>
                <label htmlFor="csa-share-summer-csa">Fall CSA</label>
            </li>
        </ul>
    </>;
}

const SignupSeason = ({season}) => {
        const summer = (<>
            <h3>Summer CSA Shares</h3>
            <ul>
                <li>
                    <label>Regular Summer CSA Share (Western MA)</label>
                    <div>Great for 2-4 people who cook 3 times per week. Enjoy all the crops and varieties RFF has to
                        offer. Weekly shares through mid-October. Comes with full PYO privileges.
                    </div>
                    <div>
                        <input type="text"/>
                        <span>Price:</span> <span>$247.00</span>
                        <span>Quantity:</span> <input type="text"/>
                    </div>
                </li>
                <li>
                    <label>Regular Summer CSA Share (Boston &amp; Worcester)</label>
                    <div>Great for 2-4 people who cook 3 times per week. Enjoy all the crops and varieties RFF has to
                        offer. Weekly shares through mid-October. Comes with full PYO privileges.
                    </div>
                    <div>
                        <input type="text"/>
                        <span>Price:</span> <span>$278.00</span>
                        <span>Quantity:</span> <input type="text"/>
                    </div>
                </li>
                <li>
                    <label>Small Summer CSA Share (Western MA)</label>
                    <div>Great for 1-2 people who cook 3 times per week. Not all items or varieties may be available
                        with the small share. PYO availability is half of the regular share.
                    </div>
                    <div>
                        <input type="text"/>
                        <span>Price:</span> <span>$192.00</span>
                        <span>Quantity:</span> <input type="text"/>
                    </div>
                </li>
                <li>
                    <label>Small Summer CSA Share (Boston &amp; Worcester)</label>
                    <div>Great for 1-2 people who cook 3 times per week. Not all items or varieties may be available
                        with the small share. PYO availability is half of the regular share.
                    </div>
                    <div>
                        <input type="text"/>
                        <span>Price:</span> <span>$219.00</span>
                        <span>Quantity:</span> <input type="text"/>
                    </div>
                </li>
            </ul>
        </>)
        const fall = (
            <>
                <h3>Fall CSA Shares</h3>
                <ul>
                    <li>
                        <label>Fall CSA Share (Western MA)</label>
                        <div>Great for 2-4 people who cook 3 times per week. Enjoy all the crops and varieties RFF has to
                            offer. Weekly shares through mid-October. Comes with full PYO privileges.
                        </div>
                        <div>
                            <input type="text"/>
                            <span>Price:</span> <span>$247.00</span>
                            <span>Quantity:</span> <input type="text"/>
                        </div>
                    </li>
                    <li>
                        <label>Fall CSA Share (Boston &amp; Worcester)</label>
                        <div>Delicious organic fall produce including winter squash, fall greens, potatoes, brussels sprouts
                            and more. Four hearty pickups every other week in November and December.
                        </div>
                        <div>
                            <input type="text"/>
                            <span>Price:</span> <span>$207.00</span>
                            <span>Quantity:</span> <input type="text"/>
                        </div>
                    </li>
                </ul>
            </>
        )
        const seasons = {
            summer,
            fall
        }
        return seasons[season]
}

function SignupWelcomeText() {
    return <>
        <h3>Welcome to our share sign up page! Hello!</h3>
        <h4>sign up for your vegetable share (and any additional shares) here!</h4>
        <p>
            Upon completion of this form, you will be prompted to pay with a check or redirected to paypal. please
            call or email the farm with any questions while doing the form.
        </p>
        <p>
            413-467-7645 | &nbsp;<a href="mailto:thefarmers@redfirefarm.com">thefarmers@redfirefarm.com</a>
            <br/>
        </p>
        <p>
            <strong>Be a part of building the local food system!</strong>
        </p>
    </>;
}

function SignupBundles() {
    return <>
        <h3>Bundles</h3>
        <ul>
            <li>
                <label className="gfield_label">Summer &amp; Fall Vegetable Bundle (Western MA)</label>
                <div>
                    Delicious organic Summer &amp; fall produce bundled into one signup option to save you
                    money! Summer Shares run for 20 weeks (June-October) with Fall Shares
                    beginning after (November-December). much you can afford to pay. Payments
                    over the Regular Price help offset households needing lower priced shares.
                </div>
                <div>
                    <ul>
                        <li><input name="input_116" type="radio" id="choice_35_116_0" disabled=""/>
                            <label htmlFor="choice_35_116_0" id="label_35_116_0">$1,180 Bundle Helping Hands Bundle'
                                - Help offset signup costs for up to 7 households needing lower priced
                                shares</label>
                        </li>
                        <li className="gchoice_35_116_1">
                            <input name="input_116" type="radio" id="choice_35_116_1" disabled=""/>
                            <label htmlFor="choice_35_116_1" id="label_35_116_1">$925 Bundle 'Helping Hands Bundle'
                                - Help offset signup costs for a household needing lower priced shares</label>
                        </li>
                        <li className="gchoice_35_116_2">
                            <input name="input_116" type="radio" id="choice_35_116_2" disabled=""/>
                            <label htmlFor="choice_35_116_2" id="label_35_116_2">$885 Bundle Regular Price</label>
                        </li>
                        <li className="gchoice_35_116_3">
                            <input name="input_116" type="radio" id="choice_35_116_3" disabled=""/>
                            <label htmlFor="choice_35_116_3" id="label_35_116_3">$847 Bundle</label>
                        </li>
                        <li className="gchoice_35_116_4">
                            <input name="input_116" type="radio" id="choice_35_116_4" disabled=""/>
                            <label htmlFor="choice_35_116_4" id="label_35_116_4">$842 Bundle</label>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </>;
}

function SignupAddons() {
    return <>
        <h3>Available Add-On Shares For Summer</h3>
        <p>UPDATE: Please note that Summer Egg Shares are SOLD OUT for the season!</p>
        <ul>
            <li id="field_35_103"
                className="gfield gfield_price gfield_price_35_103 gfield_product_35_103 field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_103_1">Summer Cheese Share (Western MA)</label>
                <div>
                    A weekly 6-8
                    oz package of fresh, locally sourced cheese sourced from local creameries
                    that are committed to happy, healthy animals and practices that support our
                    environment.
                </div>
                <div className="ginput_container ginput_container_singleproduct">
                    <input type="text"/>
                    <span>Price:</span> <span>$65.00</span>
                    <span>Quantity:</span> <input type="text"/>
                </div>
            </li>
            <li id="field_35_119"
                className="gfield gfield_price gfield_price_35_119 gfield_product_35_119 field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_119_1">Summer Cheese Share (Boston &amp; Worcester)</label>
                <div className="gfield_description" id="gfield_description_35_119">
                    A weekly 6-8
                    oz package of fresh, locally sourced cheese sourced from local creameries
                    that are committed to happy, healthy animals and practices that support our
                    environment.
                </div>
                <div className="ginput_container ginput_container_singleproduct">
                    <input type="text"/>
                    <span>Price:</span> <span>$67.00</span>
                    <span>Quantity:</span> <input type="text"/>
                </div>
            </li>
        </ul>
    </>;
}

function SignupPickupLocation() {
    return <>
        <h3>Choose Your Share Pick Up Spot:</h3>
        <p>
            NOTE: Summer &amp; Fall pickup sites are subject to change once the 2020 list is
            finalized. Thanks for your patience and understanding!
        </p>
        <ul>
            <li id="field_35_39" className="gfield gfield_contains_required field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label">Choose a Western Massachusetts pickup location for Summer 2022<span className="gfield_required">*</span></label>
                <div className="gfield_description" id="gfield_description_35_39">
                    This will be
                    your pickup location for the duration of your summer farm share. IMPORTANT:
                    Select N/A if you are not purchasing a Fall Share.

                    NOTE: Locations and times are subject to change as we prepare for the
                    season.
                </div>
                <div>
                    <ul>
                        <li>
                            <input name="input_39" type="radio" id="choice_35_39_0"/>
                            <label htmlFor="choice_35_39_0" id="label_35_39_0">N/A - NOT GETTING A SUMMER SHARE</label>
                        </li>
                        <li>
                            <input name="input_39" type="radio" id="choice_35_39_0"/>
                            <label htmlFor="choice_35_39_0" id="label_35_39_0">GRANBY - Wednesdays 2-6:30 p.m. at the farm store (7 Carver Street)</label>
                        </li>
                        <li>
                            <input name="input_39" type="radio" id="choice_35_39_0"/>
                            <label htmlFor="choice_35_39_0" id="label_35_39_0">HOME DELIVERY - Fridays 10-8 p.m. (NOTE: Flower Shares are NOT ELIGIBLE for home delivery)</label>
                        </li>
                    </ul>
                </div>
            </li>
            <li id="field_35_39" className="gfield gfield_contains_required field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label">Choose a Boston Area or Worcester pickup location for Summer 2022</label>
                <div className="gfield_description" id="gfield_description_35_39">
                    This will be
                    your pickup location for the duration of your summer farm share. IMPORTANT:
                    Select N/A if you are not purchasing a Fall Share.

                    NOTE: Locations and times are subject to change as we prepare for the
                    season.
                </div>
                <div>
                    <ul>
                        <li>
                            <input name="input_39" type="radio" id="choice_35_39_0"/>
                            <label htmlFor="choice_35_39_0" id="label_35_39_0">N/A - NOT GETTING A SUMMER SHARE</label>
                        </li>
                        <li className="gchoice_35_40_1">
                            <input name="input_40" type="radio" id="choice_35_40_1" disabled=""/>
                            <label htmlFor="choice_35_40_1" id="label_35_40_1">
                                WORCESTER - Wednesdays 3-7 p.m. at
                                the First Unitarian Church (90 Main Street)
                            </label>
                        </li>
                        <li className="gchoice_35_40_2">
                            <input name="input_40" type="radio" id="choice_35_40_2" disabled=""/>
                            <label htmlFor="choice_35_40_2" id="label_35_40_2">
                                CAMBRIDGE - Wednesdays 4-7 p.m. at the East Cambridge Savings Bank in Inman Square (1310 Cambridge Street)
                            </label>
                        </li>
                        <li>
                            <input name="input_39" type="radio" id="choice_35_39_0"/>
                            <label htmlFor="choice_35_39_0" id="label_35_39_0">
                                HOME DELIVERY via Mass
                                Food Delivery - Wednesdays 10-8 p.m. (Areas NOT ELIGIBLE for
                                delivery: Cape &amp; Islands, North Shore, South Shore below Rte.
                                44, Dudley, Webster, Douglas, Uxbridge, Millville, Mendon,
                                Hopedale &amp; Blackstone)
                            </label>
                        </li>
                    </ul>
                </div>
            </li>
            <li id="field_35_45" className="gfield gfield_price gfield_price_35_45 gfield_product_35_45 field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_45_1">Fall Boxing Fee</label>
                <div className="gfield_description" id="gfield_description_35_45">$2.50/week for boxes (required to cover cost-thanks!)</div>
                <div className="ginput_container ginput_container_singleproduct">
                    <input type="hidden" name="input_45.1" className="gform_hidden" disabled=""/>
                    <span className="ginput_product_price_label">Price:</span> <span className="ginput_product_price" id="input_35_45">$10.00</span>
                    <input type="hidden" name="input_45.2" id="ginput_base_price_35_45" className="gform_hidden" disabled=""/>
                    <input type="hidden" name="input_45.3" className="ginput_quantity_35_45 gform_hidden" disabled=""/>
                </div>
            </li>
            <li id="field_35_102" className="gfield gfield_price gfield_price_35_102 gfield_product_35_102 field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_102_1">Summer Boxing Fee</label>
                <div className="gfield_description" id="gfield_description_35_102">$1.50/week for boxes (required to cover cost-thanks!)</div>
                <div className="ginput_container ginput_container_singleproduct">
                    <input type="hidden" name="input_102.1" className="gform_hidden" disabled=""/>
                    <span className="ginput_product_price_label">Price:</span> <span className="ginput_product_price" id="input_35_102">$10.50</span>
                    <input type="hidden" name="input_102.2" id="ginput_base_price_35_102" className="gform_hidden" disabled=""/>
                    <input type="hidden" name="input_102.3" className="ginput_quantity_35_102 gform_hidden" disabled=""/>
                </div>
            </li>
            <li id="field_35_100" className="gfield gfield_price gfield_price_35_100 gfield_product_35_100 field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_100_1">Fall Home Delivery Fee</label>
                <div className="gfield_description" id="gfield_description_35_100">$13.75 per week fee for home delivery via Mass Food Delivery.</div>
                <div className="ginput_container ginput_container_singleproduct">
                    <input type="hidden" name="input_100.1" className="gform_hidden" disabled=""/>
                    <span className="ginput_product_price_label">Price:</span> <span className="ginput_product_price" id="input_35_100">$55.00</span>
                    <input type="hidden" name="input_100.2" id="ginput_base_price_35_100" className="gform_hidden" disabled=""/>
                    <input type="hidden" name="input_100.3" className="ginput_quantity_35_100 gform_hidden" disabled=""/>
                </div>
            </li>
            <li id="field_35_101" className="gfield gfield_price gfield_price_35_101 gfield_product_35_101 field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_101_1">Summer Home Delivery Fee</label>
                <div className="gfield_description" id="gfield_description_35_101">$13.75 per week fee for home delivery via Mass Food Delivery.</div>
                <div className="ginput_container ginput_container_singleproduct">
                    <input type="hidden" name="input_101.1" className="gform_hidden" disabled=""/>
                    <span className="ginput_product_price_label">Price:</span> <span className="ginput_product_price" id="input_35_101">$96.00</span>
                    <input type="hidden" name="input_101.2" id="ginput_base_price_35_101" className="gform_hidden" disabled=""/>
                    <input type="hidden" name="input_101.3" className="ginput_quantity_35_101 gform_hidden" disabled=""/>
                </div>
            </li>
        </ul>
    </>
}

function SignupTotal() {
    return (
        <>
        <h3>Total</h3>
        <ul>
            <li id="field_35_6" className="gfield gfield_price gfield_price_35_ gfield_total gfield_total_35_ field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_6">Total</label>
                <div className="ginput_container ginput_container_total">
                    <span className="ginput_total ginput_total_35" aria-live="polite">$0.00</span>
                    <input type="hidden" name="input_6" id="input_35_6" className="gform_hidden"/>
                </div>
            </li>
        </ul>
        </>
    )
}

function SignupPaymentOptions() {
    return <>
        <h3>Payment Options</h3>
            <label className="gfield_label"><span className="gfield_required">*</span></label>
            <div className="gfield_description" id="gfield_description_35_15">
                Deposits are
                non-refundable. We work with people all the time to make payment plans that
                are viable. Please contact thefarmers@redfirefarm.com to discuss further
                details!
            </div>
            <div className="ginput_container ginput_container_radio">
                <ul className="gfield_radio" id="input_35_15">
                    <li className="gchoice_35_15_0">
                        <input name="input_15" type="radio" id="choice_35_15_0"/>
                        <label htmlFor="choice_35_15_0" id="label_35_15_0">Full payment today</label>
                    </li>
                    <li className="gchoice_35_15_1">
                        <input name="input_15" type="radio" id="choice_35_15_1"/>
                        <label htmlFor="choice_35_15_1" id="label_35_15_1">$100 deposit, with full balance paid
                            by June 1st</label>
                    </li>
                    <li className="gchoice_35_15_2">
                        <input name="input_15" type="radio" id="choice_35_15_2"/>
                        <label htmlFor="choice_35_15_2" id="label_35_15_2">$100 deposit, with three payment
                            installments on July 1st, August 1st, and September 1st</label>
                    </li>
                </ul>
            </div>
        <div>
            <label className="gfield_label" htmlFor="input_35_46">Amount you will pay today:<span
                className="gfield_required">*</span></label>
            <div className="gfield_description" id="gfield_description_35_46">Please enter
                the amount you commit to paying now.
            </div>
            <div className="ginput_container ginput_container_number">
                <input name="input_46" id="input_35_46" type="text" className="medium" aria-required="true"
                       aria-invalid="false" aria-describedby="gfield_description_35_46"/>
            </div>
        </div>
        <h3>Payment Method</h3>
        <div className="gfield_description" id="gfield_description_35_16">
            Please choose your payment method. SNAP/EBT available with sign up- please email
            thefarmers@redfirefarm.com to request SNAP/EBT CSA signup forms
        </div>
        <ul className="gfield_radio" id="input_35_16">
            <li className="gchoice_35_16_0">
                <input name="input_16" type="radio" id="choice_35_16_0"/>
                <label htmlFor="choice_35_16_0" id="label_35_16_0">Mail us a check- we love this option!</label>
            </li>
            <li className="gchoice_35_16_1">
                <input name="input_16" type="radio" id="choice_35_16_1"/>
                <label htmlFor="choice_35_16_1" id="label_35_16_1">PayPal</label>
            </li>
        </ul>
    </>;
}

function SignupComments() {
    return <>
        <h3>Comments</h3>
        <textarea name="input_18" id="input_35_18" className="textarea medium" aria-invalid="false" rows="10" cols="50"></textarea>
        <ul>
            <li>
                <label>How did you hear about Red Fire Farm?</label>
                <div>
                    <ul>
                        <li>
                            <input name="input_19" type="radio" id="choice_35_19_0"/>
                            <label htmlFor="choice_35_19_0" id="label_35_19_0">I was a member in a previous
                                season</label>
                        </li>
                        <li>
                            <input name="input_19" type="radio" id="choice_35_19_1"/>
                            <label htmlFor="choice_35_19_1" id="label_35_19_1">A friend</label>
                        </li>
                        <li>
                            <input name="input_19" type="radio" id="choice_35_19_2"/>
                            <label htmlFor="choice_35_19_2" id="label_35_19_2">Flyer or brochure</label>
                        </li>
                        <li>
                            <input name="input_19" type="radio" id="choice_35_19_3"/>
                            <label htmlFor="choice_35_19_3" id="label_35_19_3">Online</label>
                        </li>
                        <li>
                            <input name="input_19" type="radio" id="choice_35_19_4"/>
                            <label htmlFor="choice_35_19_4" id="label_35_19_4">Other</label>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <label>Did a friend refer you? If so, please enter their name.</label>
                <input/>
            </li>
        </ul>;
    </>
}

function SignupContactInfo() {
    return <>
        <h3>Contact Info</h3>
        <ul id="gform_fields_35_2" className="gform_fields top_label form_sublabel_below description_above">
            <li id="field_35_10"
                className="gfield gfield_contains_required field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label gfield_label_before_complex">Name<span
                    className="gfield_required">*</span></label>
                <div
                    className="ginput_complex ginput_container no_prefix has_first_name no_middle_name has_last_name no_suffix gf_name_has_2 ginput_container_name"
                    id="input_35_10">
                            <span id="input_35_10_3_container" className="name_first">
                                <input type="text" name="input_10.3" id="input_35_10_3" aria-label="First name"
                                       aria-required="true" aria-invalid="false"/>
                                <label htmlFor="input_35_10_3">First</label>
                            </span>
                    <span id="input_35_10_6_container" className="name_last">
                                <input type="text" name="input_10.6" id="input_35_10_6" aria-label="Last name"
                                       aria-required="true" aria-invalid="false"/>
                                <label htmlFor="input_35_10_6">Last</label>
                            </span>
                </div>
            </li>
            <li id="field_35_11"
                className="gfield gfield_contains_required field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_11">Phone<span
                    className="gfield_required">*</span></label>
                <div className="ginput_container ginput_container_phone">
                    <input name="input_11" id="input_35_11" type="text" className="medium"
                           aria-required="true" aria-invalid="false"/>
                </div>
            </li>
            <li id="field_35_12"
                className="gfield gfield_contains_required field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label" htmlFor="input_35_12">Email<span
                    className="gfield_required">*</span></label>
                <div className="ginput_container ginput_container_email">
                    <input name="input_12" id="input_35_12" type="text" className="medium"
                           aria-required="true" aria-invalid="false"/>
                </div>
            </li>
            <li id="field_35_13"
                className="gfield gfield_contains_required field_sublabel_below field_description_above gfield_visibility_visible">
                <label className="gfield_label gfield_label_before_complex">Address<span
                    className="gfield_required">*</span></label>
                <div>
                    <input type="text" name="input_13.1" id="input_35_13_1" aria-required="true"/>
                    <label htmlFor="input_35_13_1" id="input_35_13_1_label">Street Address</label>
                    <input type="text" name="input_13.2" id="input_35_13_2"/>
                    <label htmlFor="input_35_13_2" id="input_35_13_2_label">Address Line 2</label>
                    <input type="text" name="input_13.3" id="input_35_13_3"/>
                    <label htmlFor="input_35_13_3" id="input_35_13_3_label">City</label>
                    <select defaultValue={"Massachusetts"}>
                        <option value=""></option>
                        <option value="Alabama">Alabama</option>
                        <option
                            value="Alaska">Alaska
                        </option>
                        <option value="Arizona">Arizona</option>
                        <option
                            value="Arkansas">Arkansas
                        </option>
                        <option
                            value="California">California
                        </option>
                        <option
                            value="Colorado">Colorado
                        </option>
                        <option
                            value="Connecticut">Connecticut
                        </option>
                        <option
                            value="Delaware">Delaware
                        </option>
                        <option value="District of Columbia">District of Columbia</option>
                        <option
                            value="Florida">Florida
                        </option>
                        <option value="Georgia">Georgia</option>
                        <option
                            value="Hawaii">Hawaii
                        </option>
                        <option value="Idaho">Idaho</option>
                        <option
                            value="Illinois">Illinois
                        </option>
                        <option value="Indiana">Indiana</option>
                        <option
                            value="Iowa">Iowa
                        </option>
                        <option value="Kansas">Kansas</option>
                        <option
                            value="Kentucky">Kentucky
                        </option>
                        <option
                            value="Louisiana">Louisiana
                        </option>
                        <option value="Maine">Maine</option>
                        <option
                            value="Maryland">Maryland
                        </option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option
                            value="Michigan">Michigan
                        </option>
                        <option
                            value="Minnesota">Minnesota
                        </option>
                        <option
                            value="Mississippi">Mississippi
                        </option>
                        <option
                            value="Missouri">Missouri
                        </option>
                        <option value="Montana">Montana</option>
                        <option
                            value="Nebraska">Nebraska
                        </option>
                        <option value="Nevada">Nevada</option>
                        <option
                            value="New Hampshire">New Hampshire
                        </option>
                        <option value="New Jersey">New Jersey</option>
                        <option
                            value="New Mexico">New Mexico
                        </option>
                        <option
                            value="New York">New York
                        </option>
                        <option value="North Carolina">North Carolina</option>
                        <option
                            value="North Dakota">North Dakota
                        </option>
                        <option value="Ohio">Ohio</option>
                        <option
                            value="Oklahoma">Oklahoma
                        </option>
                        <option value="Oregon">Oregon</option>
                        <option
                            value="Pennsylvania">Pennsylvania
                        </option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option
                            value="South Carolina">South Carolina
                        </option>
                        <option value="South Dakota">South Dakota</option>
                        <option
                            value="Tennessee">Tennessee
                        </option>
                        <option value="Texas">Texas</option>
                        <option
                            value="Utah">Utah
                        </option>
                        <option value="Vermont">Vermont</option>
                        <option
                            value="Virginia">Virginia
                        </option>
                        <option
                            value="Washington">Washington
                        </option>
                        <option value="West Virginia">West Virginia</option>
                        <option
                            value="Wisconsin">Wisconsin
                        </option>
                        <option value="Wyoming">Wyoming</option>
                        <option
                            value="Armed Forces Americas">Armed Forces Americas
                        </option>
                        <option
                            value="Armed Forces Europe">Armed Forces Europe
                        </option>
                        <option
                            value="Armed Forces Pacific">Armed Forces Pacific
                        </option>
                    </select>
                    <label htmlFor="input_35_13_4" id="input_35_13_4_label">State</label>
                    <input type="text" name="input_13.5" id="input_35_13_5" aria-required="true"/>
                    <label htmlFor="input_35_13_5" id="input_35_13_5_label">ZIP Code</label>
                </div>
            </li>
        </ul>
    </>
}

function Signup() {
    const [selectedRegion, changeRegion] = useState()
    const [selectedSeasons, changeSeasons] = useState([])
    let isFall = false;
    let isSummer = false;
    useEffect(() => {
        console.log("selected region is: " + selectedRegion)
    }, [selectedRegion])
    return (
        <>
            <SignupWelcomeText/>
            <SignupRegions selectedRegion={selectedRegion} changeRegion={changeRegion}/>
            { selectedRegion ? <SignupSeasons selectedSeasons={selectedSeasons} changeSeasons={changeSeasons} /> : '' }
            { selectedSeasons.indexOf('summer') !== -1 ? (
                <>
                    <SignupSeason season={"summer"}/>
                    <SignupAddons season={"summer"}/>
                </>
            ) : '' }
            { selectedSeasons.indexOf('fall') !== -1 ? (
                <>
                    <SignupSeason season={"fall"}/>
                    <SignupAddons season={"fall"}/>
                </>
            ) : '' }
            { selectedSeasons.indexOf('summer') !== -1 && selectedSeasons.indexOf('fall') != -1 ? <SignupBundles/> : '' }
            {/*<SignupPickupLocation/>*/}
            {/*<SignupTotal/>*/}
            {/*<SignupPaymentOptions/>*/}
            {/*<SignupContactInfo/>*/}
            {/*<SignupComments />*/}
        </>
    )
}

export default Signup;
