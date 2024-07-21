import React, { useState } from 'react';
import './UserProfile.css';

// Initialize the UserProfile component
const UserProfile = () => {
    // Blank and preset values for default user profile
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        height: '',
        weight: '',
        fitnessLevel: '',
        fitnessGoal: '',
        bodyType: '',
        heightUnit: 'imperial',
        heightFeet: '',
        heightInches: '',
        heightMeters: '',
        heightCentimeters: '',
        weightUnit: 'lbs',
    });

    // Handle the form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`User Profile: ${JSON.stringify(user)}`);
        console.log('Profile submitted', user);
    };

    // Handle the unit change for height
    const handleHeightUnitChange = (e) => {
        setUser({
            ...user,
            heightUnit: e.target.value
        });
    };

    // Handle the unit change for weight
    const handleWeightUnitChange = (e) => {
        setUser({
            ...user,
            weightUnit: e.target.value
        });
    };

    // Return the UserProfile component with form inputs
    return (
        <div className="user-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={handleChange}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={user.password} onChange={handleChange}/>
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={user.age} onChange={handleChange}/>
                </label>
                <label>
                    Height Unit:
                    <select name="heightUnit" value={user.heightUnit} onChange={handleHeightUnitChange}>
                        <option value="imperial">Imperial (ft/in)</option>
                        <option value="metric">Metric (m/cm)</option>
                    </select>
                </label>
                {user.heightUnit === 'imperial' ? (
                    <>
                        <label>
                            Height (Feet):
                            <input type="number" name="heightFeet" value={user.heightFeet} onChange={handleChange}/>
                        </label>
                        <label>
                            Height (Inches):
                            <input type="number" name="heightInches" value={user.heightInches} onChange={handleChange}/>
                        </label>
                    </>
                ) : (
                    <>
                        <label>
                            Height (Meters):
                            <input type="number" name="heightMeters" value={user.heightMeters} onChange={handleChange}/>
                        </label>
                        <label>
                            Height (Centimeters):
                            <input type="number" name="heightCentimeters" value={user.heightCentimeters} onChange={handleChange}/>
                        </label>
                    </>
                )}
                <label>
                    Weight:
                    <input type="number" name="weightValue" value={user.weightValue} onChange={handleChange}/>
                    <select name="weightUnit" value={user.weightUnit} onChange={handleWeightUnitChange}>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                    </select>
                </label>
                <label>
                    Fitness Level:
                    <select name="fitnessLevel" value={user.fitnessLevel} onChange={handleChange}>
                        <option value="">Select Fitness Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </label>
                <label>
                    Fitness Goal:
                    <select name="fitnessGoal" value={user.fitnessGoal} onChange={handleChange}>
                        <option value="">Select Fitness Goal</option>
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Increase Flexibility">Increase Flexibility</option>
                        <option value="Build Muscle Mass">Build Muscle Mass</option>
                        <option value="Build Strength">Build Strength</option>
                        <option value="Build Endurance">Build Endurance</option>
                    </select>
                    gh repo clone dennislam4/CrossPlatformTrainer       </label>
                <label>
                    Body Type:
                    <select name="bodyType" value={user.bodyType} onChange={handleChange}>
                        <option value="">Select Body Type</option>
                        <option value="Ectomorph">Ectomorph</option>
                        <option value="Mesomorph">Mesomorph</option>
                        <option value="Endomorph">Endomorph</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
// Export the UserProfile component
export default UserProfile;
