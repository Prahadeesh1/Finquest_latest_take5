
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
    text: "How would you react if your investment dropped 20% in a month?",
    answers: [
      { 
        text: "I would sell everything to prevent further losses", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "I would be concerned and consider adjusting my portfolio", 
        score: { safe: 5, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "I would stay the course since I'm investing for the long-term", 
        score: { safe: 0, moderate: 8, aggressive: 5 } 
      },
      { 
        text: "I would see it as an opportunity to invest more", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 2,
    text: "What is your primary investment goal?",
    answers: [
      { 
        text: "Preserving my capital with minimum risk", 
        score: { safe: 10, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "Growing my investments with moderate risk", 
        score: { safe: 3, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Maximizing returns with higher risk tolerance", 
        score: { safe: 0, moderate: 3, aggressive: 10 } 
      },
      { 
        text: "Balancing growth and safety", 
        score: { safe: 5, moderate: 5, aggressive: 2 } 
      },
    ]
  },
  {
    id: 3,
    text: "How soon do you expect to need this money?",
    answers: [
      { 
        text: "I'll need it within 1-3 years", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "I'll need it within 3-5 years", 
        score: { safe: 6, moderate: 6, aggressive: 0 } 
      },
      { 
        text: "I'll need it within 5-10 years", 
        score: { safe: 2, moderate: 8, aggressive: 4 } 
      },
      { 
        text: "I won't need it for 10+ years", 
        score: { safe: 0, moderate: 4, aggressive: 10 } 
      },
    ]
  },
  {
    id: 4,
    text: "Which statement best describes your investment experience?",
    answers: [
      { 
        text: "I'm new to investing and prefer safer options", 
        score: { safe: 10, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "I have some experience and understand market fluctuations", 
        score: { safe: 3, moderate: 8, aggressive: 2 } 
      },
      { 
        text: "I'm experienced and comfortable with volatility", 
        score: { safe: 0, moderate: 4, aggressive: 10 } 
      },
      { 
        text: "I have mixed experience across different investment types", 
        score: { safe: 4, moderate: 6, aggressive: 4 } 
      },
    ]
  },
  {
    id: 5,
    text: "How would you allocate $10,000 across these investment options?",
    answers: [
      { 
        text: "Mostly in savings accounts and certificates of deposit", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "A mix of bonds and some blue-chip stocks", 
        score: { safe: 4, moderate: 9, aggressive: 0 } 
      },
      { 
        text: "Balanced across stocks, bonds, and alternative investments", 
        score: { safe: 2, moderate: 5, aggressive: 5 } 
      },
      { 
        text: "Primarily in growth stocks and higher-risk investments", 
        score: { safe: 0, moderate: 1, aggressive: 10 } 
      },
    ]
  },
  {
    id: 6,
    text: "What's your current financial situation?",
    answers: [
      { 
        text: "I have significant debt and limited savings", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "I have some debt but also a stable emergency fund", 
        score: { safe: 5, moderate: 7, aggressive: 0 } 
      },
      { 
        text: "I have minimal debt and good savings", 
        score: { safe: 2, moderate: 6, aggressive: 6 } 
      },
      { 
        text: "I have substantial savings and little to no debt", 
        score: { safe: 0, moderate: 3, aggressive: 10 } 
      },
    ]
  },
  {
    id: 7,
    text: "If your investment lost 15% of its value over a year, but experts predicted recovery in the next two years, what would you do?",
    answers: [
      { 
        text: "Sell everything to avoid further losses", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Sell half to protect some of my investment", 
        score: { safe: 7, moderate: 4, aggressive: 0 } 
      },
      { 
        text: "Hold everything and wait for recovery", 
        score: { safe: 2, moderate: 8, aggressive: 5 } 
      },
      { 
        text: "Buy more while prices are low", 
        score: { safe: 0, moderate: 3, aggressive: 10 } 
      },
    ]
  },
  {
    id: 8,
    text: "How would you describe your knowledge of financial markets?",
    answers: [
      { 
        text: "Minimal - I know the basics but not much more", 
        score: { safe: 8, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "Average - I understand how markets generally work", 
        score: { safe: 4, moderate: 8, aggressive: 2 } 
      },
      { 
        text: "Above average - I follow markets and understand various investments", 
        score: { safe: 1, moderate: 6, aggressive: 6 } 
      },
      { 
        text: "Expert - I have deep knowledge of market dynamics", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 9,
    text: "What percentage of your monthly income can you comfortably save or invest?",
    answers: [
      { 
        text: "Less than 5%", 
        score: { safe: 10, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "5-15%", 
        score: { safe: 5, moderate: 7, aggressive: 2 } 
      },
      { 
        text: "16-25%", 
        score: { safe: 2, moderate: 5, aggressive: 7 } 
      },
      { 
        text: "More than 25%", 
        score: { safe: 0, moderate: 3, aggressive: 10 } 
      },
    ]
  },
  {
    id: 10,
    text: "Which statement best describes your attitude toward investing?",
    answers: [
      { 
        text: "I prefer security even if it means lower returns", 
        score: { safe: 10, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "I want a good balance between growth and security", 
        score: { safe: 4, moderate: 9, aggressive: 2 } 
      },
      { 
        text: "I'm willing to accept moderate risk for better returns", 
        score: { safe: 1, moderate: 6, aggressive: 7 } 
      },
      { 
        text: "I'll take significant risks for potentially high returns", 
        score: { safe: 0, moderate: 1, aggressive: 10 } 
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