
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ResultsScreen from "./ResultsScreen";

interface Question {
  id: number;
  text: string;
  answers: {
    text: string;
    score: {
      safe: number;
      moderate: number;
      aggressive: number;
    };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is your main objective for investing?",
    answers: [
      { 
        text: "Preserve my capital, even if returns are low ", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Earn moderate returns with limited risk ", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Grow my wealth over time, accepting some fluctuations ", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Maximize long-term growth, even with high short-term losses ", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
  {
    id: 2,
    text: "How would you react if your portfolio dropped by 20% in value during a market downturn?",
    answers: [
      { 
        text: "I’d sell everything to prevent further losses ", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "I’d reduce my risky investments ", 
        score: { safe: 5, moderate: 6, aggressive: 0 } 
      },
      { 
        text: "I’d stay invested and wait for recovery ", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "I’d invest more to take advantage of lower prices ", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 3,
    text: "When do you expect to use the money you’re investing now? ",
    answers: [
      { 
        text: "Within the next 3 years", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "In 3–5 years", 
        score: { safe: 5, moderate: 6, aggressive: 0 } 
      },
      { 
        text: "In 5–10 years", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "After 10 years or more", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 4,
    text: "What level of short-term loss are you comfortable accepting for potential long-term gains?",
    answers: [
      { 
        text: "Less than 5%", 
        score: { safe: 10, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "Up to 10%", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Up to 20%", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "More than 20%", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 5,
    text: "How familiar and confident are you with investing concepts like stocks, bonds, and mutual funds?",
    answers: [
      { 
        text: "I’m new and not confident in understanding investment risks", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "I have some experience but prefer safer options", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "I understand market ups and downs and invest across assets", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "I actively follow markets and am confident managing higher-risk assets", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
];

interface RiskQuestionnaireProps {
  onComplete: (profile: string) => void;
}

const RiskQuestionnaire: React.FC<RiskQuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [scores, setScores] = useState({ safe: 0, moderate: 0, aggressive: 0 });
  const [showResults, setShowResults] = useState(false);
  const [profile, setProfile] = useState("");

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let safeScore = 0;
    let moderateScore = 0;
    let aggressiveScore = 0;

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== -1) {
        const question = questions[questionIndex];
        const answer = question.answers[answerIndex];
        safeScore += answer.score.safe;
        moderateScore += answer.score.moderate;
        aggressiveScore += answer.score.aggressive;
      }
    });

    const finalScores = {
      safe: safeScore,
      moderate: moderateScore,
      aggressive: aggressiveScore,
    };
    setScores(finalScores);

    // Determine the highest score
    let determinedProfile = "moderate";
    let maxScore = moderateScore;
    
    if (safeScore > maxScore) {
      determinedProfile = "safe";
      maxScore = safeScore;
    }
    
    if (aggressiveScore > maxScore) {
      determinedProfile = "aggressive";
    }

    setProfile(determinedProfile);
    setShowResults(true);
    onComplete(determinedProfile);
  };

  const handleStartOver = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(-1));
    setScores({ safe: 0, moderate: 0, aggressive: 0 });
    setShowResults(false);
  };

  // If results should be shown, render the ResultsScreen component
  if (showResults) {
    return <ResultsScreen profile={profile} onStartOver={handleStartOver} />;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <Card className="w-full animate-fade-in shadow-lg border border-riskwise-lightpurple">
      <CardHeader className="bg-gradient-to-r from-riskwise-lightpurple/30 to-white">
        <CardTitle className="text-xl text-riskwise-darkpurple">Risk Assessment Questionnaire</CardTitle>
        <CardDescription className="text-gray-600">
          Answer these questions to determine your ideal investment profile
        </CardDescription>
        <Progress value={progress} className="h-2 mt-3 bg-gray-200" 
          style={{ 
            background: 'linear-gradient(to right, #e5deff, #f9f8ff)',
            overflow: 'hidden',
          }}
        />
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-riskwise-darkpurple">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <span className="text-sm text-riskwise-moderate font-medium px-3 py-1 bg-riskwise-lightpurple/30 rounded-full">
              {Math.floor((currentQuestion / questions.length) * 100)}% Complete
            </span>
          </div>
          <p className="text-gray-700 mb-6 text-lg">{question.text}</p>
          
          <RadioGroup 
            value={selectedAnswer !== -1 ? selectedAnswer.toString() : undefined} 
            className="space-y-4"
          >
            {question.answers.map((answer, index) => (
              <div 
                key={index} 
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                  selectedAnswer === index 
                    ? 'bg-riskwise-lightpurple/20 border border-riskwise-moderate/30' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`answer-${index}`}
                  onClick={() => handleAnswer(index)}
                  className={`mt-0.5 ${
                    selectedAnswer === index 
                      ? 'text-riskwise-moderate border-riskwise-moderate' 
                      : ''
                  }`}
                />
                <Label 
                  htmlFor={`answer-${index}`}
                  className="cursor-pointer flex-grow"
                >
                  {answer.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentQuestion === 0}
          className="border-riskwise-moderate/30 text-riskwise-darkpurple hover:bg-riskwise-lightpurple/20 hover:text-riskwise-darkpurple"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={selectedAnswer === -1}
          className={`bg-gradient-to-r ${
            selectedAnswer === -1 
              ? 'from-gray-400 to-gray-500 opacity-50' 
              : 'from-riskwise-moderate to-riskwise-aggressive hover:opacity-90'
          } text-white transition-all`}
        >
          {currentQuestion < questions.length - 1 ? (
            <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
          ) : (
            'See Results'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskQuestionnaire;