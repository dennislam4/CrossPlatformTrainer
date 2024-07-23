import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FitnessSurvey.css';

// FitnessSurvey component
const FitnessSurvey = () => {
    const [step, setStep] = useState(0);
    const [fitnessGoal, setFitnessGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
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
            height,
            weight,
            age,
            gender,
        });
    };

    // Render the survey steps
    const renderStep = () => {
        switch (step) {
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
            case 1:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your Fitness Level?</h2>
                        <button className="survey-button" onClick={() => { setFitnessLevel('Beginner'); nextStep(); }}>Beginner</button>
                        <button className="survey-button" onClick={() => { setFitnessLevel('Intermediate'); nextStep(); }}>Intermediate</button>
                        <button className="survey-button" onClick={() => { setFitnessLevel('Advanced'); nextStep(); }}>Advanced</button>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your Body Type?</h2>
                        <button className="survey-button" onClick={() => { setBodyType('Ectomorph'); nextStep(); }}>Ectomorph</button>
                        <button className="survey-button" onClick={() => { setBodyType('Mesomorph'); nextStep(); }}>Mesomorph</button>
                        <button className="survey-button" onClick={() => { setBodyType('Endomorph'); nextStep(); }}>Endomorph</button>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your height?</h2>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="survey-input"
                        />
                        <div className="flex space-x-4">
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                            <button className="survey-nav-button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl italic">What is your weight?</h2>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="survey-input"
                        />
                        <div className="flex space-x-4">
                            <button className="survey-nav-button" onClick={previousStep}>Back</button>
                            <button className="survey-nav-button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
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
                        {/* Render the fitness plan here */}
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
