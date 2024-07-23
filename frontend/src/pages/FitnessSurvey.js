import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FitnessSurvey.css';

// FitnessSurvey component
const FitnessSurvey = () => {
    const [step, setStep] = useState(0);
    const [fitnessGoal, setFitnessGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [heightUnit, setHeightUnit] = useState('imperial');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightMeters, setHeightMeters] = useState('');
    const [heightCentimeters, setHeightCentimeters] = useState('');
    const [weightUnit, setWeightUnit] = useState('lbs');
    const [weightValue, setWeightValue] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    // Survey Navigation
    const nextStep = () => {
        setStep(step + 1);
    };
    const previousStep = () => {
        setStep(step - 1);
    };

    // Handle the form submission
    const handleSubmit = () => {
        console.log({
            fitnessGoal,
            fitnessLevel,
            bodyType,
            heightUnit,
            heightFeet,
            heightInches,
            heightMeters,
            heightCentimeters,
            weightUnit,
            weightValue,
            age,
            gender,
        });
    };

    // Render the survey steps
    const renderStep = () => {
        switch (step) {
            // Fitness Goal Survey Question
            case 0:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your Fitness Goal?</h2>
                        <button className="survey-button" onClick={() => { setFitnessGoal('Lose weight'); nextStep(); }}>Lose weight</button>
                        <button className="survey-button" onClick={() => { setFitnessGoal('Build strength'); nextStep(); }}>Build strength</button>
                        <button className="survey-button" onClick={() => { setFitnessGoal('Build endurance'); nextStep(); }}>Build endurance</button>
                        <button className="survey-button" onClick={() => { setFitnessGoal('Build muscle mass'); nextStep(); }}>Build muscle mass</button>
                        <button className="survey-button" onClick={() => { setFitnessGoal('Flexibility'); nextStep(); }}>Flexibility</button>
                    </div>
                );
            // Fitness Level Survey Question
            case 1:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your Fitness Level?</h2>
                        <button className="survey-button" onClick={() => { setFitnessLevel('Beginner'); nextStep(); }}>Beginner</button>
                        <button className="survey-button" onClick={() => { setFitnessLevel('Intermediate'); nextStep(); }}>Intermediate</button>
                        <button className="survey-button" onClick={() => { setFitnessLevel('Advanced'); nextStep(); }}>Advanced</button>
                        <div>
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                        </div>
                    </div>
                );
            // Body Type Survey Question
            case 2:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your Body Type?</h2>
                        <button className="survey-button" onClick={() => { setBodyType('Ectomorph'); nextStep(); }}>Ectomorph</button>
                        <button className="survey-button" onClick={() => { setBodyType('Mesomorph'); nextStep(); }}>Mesomorph</button>
                        <button className="survey-button" onClick={() => { setBodyType('Endomorph'); nextStep(); }}>Endomorph</button>
                        <div>
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                        </div>
                    </div>
                );
            // Height Survey Question with Imperial and Metric Unit Selection
            case 3:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">Height Unit:</h2>
                        <select name="heightUnit" value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} className="survey-input">
                            <option value="imperial">Imperial (ft/in)</option>
                            <option value="metric">Metric (m/cm)</option>
                        </select>
                        {heightUnit === 'imperial' ? (
                            <>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (Feet):</label>
                                <input type="number" name="heightFeet" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} className="survey-input"/>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (Inches):</label>
                                <input type="number" name="heightInches" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} className="survey-input"/>
                            </>
                        ):
                            (
                            <>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (Meters):</label>
                                <input type="number" name="heightMeters" value={heightMeters} onChange={(e) => setHeightMeters(e.target.value)} className="survey-input"/>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (Centimeters):</label>
                                <input type="number" name="heightCentimeters" value={heightCentimeters} onChange={(e) => setHeightCentimeters(e.target.value)} className="survey-input"/>
                            </>
                        )}
                        <div className="flex space-x-4">
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                            <button className="survey-nav-button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            // Weight Survey Question with lbs and kgs Unit Selection
            case 4:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">Weight:</h2>
                        <input type="number" name="weightValue" value={weightValue} onChange={(e) => setWeightValue(e.target.value)} className="survey-input"/>
                        <select name="weightUnit" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} className="survey-input mt-2">
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                        </select>
                        <div className="flex space-x-4">
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                            <button className="survey-nav-button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            // Age Survey Question
            case 5:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your age?</h2>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="survey-input"
                        />
                        <div className="flex space-x-4">
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                            <button className="survey-nav-button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            // Gender Survey Question
            case 6:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your gender?</h2>
                        <button className="survey-button" onClick={() => { setGender('Male'); handleSubmit(); }}>Male</button>
                        <button className="survey-button" onClick={() => { setGender('Female'); handleSubmit(); }}>Female</button>
                        <button className="survey-nav-button" onClick={previousStep}>Back</button>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">Your Weekly Fitness Plan</h2>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col items-center px-14 py-20 mx-auto w-full text-2xl bg-lime-200 max-w-[480px]">
            {renderStep()}
        </div>
    );
};

export default FitnessSurvey;
