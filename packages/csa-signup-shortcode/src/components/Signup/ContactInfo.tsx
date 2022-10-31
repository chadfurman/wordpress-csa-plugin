interface ContactInfoProps {
    setFirstName: (firstName: FirstName) => void
    setLastName: (lastName: LastName) => void
    setPhone: (phone: Phone) => void
    setEmail: (email: Email) => void
    setAddress1: (streetAddress: StreetAddress) => void
    setAddress2: (streetAddress: StreetAddress) => void
    setCity: (city: City) => void
    setState: (state: State) => void
    setZip: (zip: Zip) => void
}

function ContactInfo({ setFirstName, setLastName, setPhone, setEmail, setAddress1, setAddress2, setCity, setState, setZip} : ContactInfoProps) {
    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const firstName = e.currentTarget.value
        setFirstName(firstName)
    }
    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lastName = e.currentTarget.value
        setLastName(lastName)
    }
    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phone = e.currentTarget.value
        setPhone(phone)
    }
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.currentTarget.value
        setEmail(email)
    }
    const handleChangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const address1 = e.currentTarget.value
        setAddress1(address1)
    }
    const handleChangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const address2 = e.currentTarget.value
        setAddress2(address2)
    }
    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const city = e.currentTarget.value
        setCity(city)
    }
    const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const state = e.currentTarget.value
        setState(state)
    }
    const handleChangeZip = (e: React.ChangeEvent<HTMLInputElement>) => {
        const zip = e.currentTarget.value
        setZip(zip)
    }
    return <>
        <h3>Contact Info</h3>
        <div>
            <label>First Name: <input type="text" onChange={handleChangeFirstName} /></label>
            <label>Last Name: <input type="text" onChange={handleChangeLastName}/></label>
        </div>
        <div><label>Phone: <input type={"phone"} onChange={handleChangePhone}/></label></div>
        <div><label>Email: <input type={"email"} onChange={handleChangeEmail} /></label></div>

        <h4>Address</h4>
        <div><label>Street Address<input type={"text"} onChange={handleChangeAddress1}/></label></div>
        <div><label>Address Line 2<input type={"text"} onChange={handleChangeAddress2}/></label></div>
        <div><label>City<input type={"text"} onChange={handleChangeCity}/></label></div>
        <div>
            <label>
                State
                <select defaultValue={"Massachusetts"} onChange={handleChangeState}>
                    <option value=""></option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District of Columbia">District of Columbia</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                    <option value="Armed Forces Americas">Armed Forces Americas</option>
                    <option value="Armed Forces Europe">Armed Forces Europe</option>
                    <option value="Armed Forces Pacific">Armed Forces Pacific</option>
                </select>
            </label>
        </div>
        <div><label>Zip<input type={"text"} onChange={handleChangeZip}/></label></div>
    </>
}

export default ContactInfo