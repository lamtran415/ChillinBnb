import { useState } from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkCreateSpot } from "../../store/spotReducer";

const CreateNewSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const spotDetails = {
            address,
            city,
            state,
            country,
            lat: 100,
            lng: -100,
            name,
            description,
            price,
            url
        };

        const spot = await dispatch(thunkCreateSpot(spotDetails))
            // console.log("AFTER CREATING A SPOT===========", spot)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

            history.push(`/spots/${spot.id}`)
            closeModal();
    }

    return (
        <>
            <h1>Create A Spot</h1>
            <form
                className="create-spot-form"
                onSubmit={handleSubmit}
            >
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Address:
                    <input
                        type='text'
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type='text'
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input
                        type='text'
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input
                        type='text'
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type='text'
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type='text'
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type='number'
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                        />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default CreateNewSpot;