
import React from 'react';
import RiskQuestionnaire from '../RiskWise/RiskQuestionnaire';

const AssessmentPage: React.FC = () => {

  const handleComplete = (profile: string) => {
    // Handle questionnaire completion
    console.log("Completed with profile:", profile);
    // Redirect logic would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Risk Assessment Questionnaire</h1>
          <p className="text-lg text-gray-600 mb-10 text-center">
            Answer these questions to determine which investment approach is best suited 
            for your goals, timeline, and comfort with risk.
          </p>
          
          <RiskQuestionnaire onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;