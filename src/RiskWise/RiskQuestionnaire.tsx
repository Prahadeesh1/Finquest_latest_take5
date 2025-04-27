
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
    text: "Imagine you've just received an unexpected $50,000. What's your first instinct",
    answers: [
      { 
        text: "Keep most of it in the bank — better safe than sorry", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Use a part to invest cautiously, but save the rest", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Invest a good chunk into opportunities I believe in", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Go big — once-in-a-lifetime chance to multiply it", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
  {
    id: 2,
    text: "When you hear about a (market crash) on the news, what emotion best describes your reaction?",
    answers: [
      { 
        text: "Anxiety — I worry about losing what I have", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Caution — I consider making changes if needed", 
        score: { safe: 5, moderate: 6, aggressive: 0 } 
      },
      { 
        text: "Curiosity — I want to understand what's happening", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Excitement — discounts everywhere!", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 3,
    text: "Which weekend activity sounds most appealing to you?",
    answers: [
      { 
        text: "A quiet, familiar dinner at my favourite restaurant", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Exploring a new cafe recommended by a friend", 
        score: { safe: 5, moderate: 6, aggressive: 0 } 
      },
      { 
        text: "Taking a spontaneous short road trip", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Booking a last-minute adventure overseas", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 4,
    text: "If a friend pitched you an investment with (high potential but not fully proven) how would you respond?",
    answers: [
      { 
        text: "Politely decline — too risky for my taste", 
        score: { safe: 10, moderate: 2, aggressive: 0 } 
      },
      { 
        text: "Ask a lot of questions before even considering", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Consider investing a small amount just in case", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Jump in early and accept whatever the outcome will be!", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 5,
    text: "How would you feel about a portfolio that could lose 15% in a year, but might gain 20%?",
    answers: [
      { 
        text: "Uncomfortable — I'd prefer something safer", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Nervous, but I could accept a small portion being risky", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Neutral — losses and gains are part of the game", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Excited — I like taking chances for better returns", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
  {
    id: 6,
    text: " Think about a past financial decision you made — what describes it best?",
    answers: [
      { 
        text: "Very cautious — I chose safety over potential reward", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Balanced — weighed pros and cons carefully", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Opportunistic — took a calculated risk", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Bold — chased big wins even if the risk was high", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
  {
    id: 7,
    text: "If the price of a stock you like drops sharply, what’s your gut reaction?",
    answers: [
      { 
        text: "Avoid it — it’s clearly dangerous", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Wait and watch — maybe it will stabilize", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Investigate — maybe it’s a good time to buy", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Buy aggressively — it's a discount!", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
  {
    id: 8,
    text: "Which quote resonates most with you?",
    answers: [
      { 
        text: "Better safe than sorry", 
        score: { safe: 8, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Don't put all your eggs in one basket", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Fortune favors the bold", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "No risk, no reward", 
        score: { safe: 0, moderate: 2, aggressive: 10 } 
      },
    ]
  },
  {
    id: 9,
    text: " If an investment opportunity promised small but guaranteed returns, how would you feel?",
    answers: [
      { 
        text: "Very satisfied — I love certainty", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "Content — it’s not exciting, but it’s stable", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Somewhat restless — I'd want a bit more growth", 
        score: { safe: 2, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Bored — I'd look for bigger opportunities elsewhere", 
        score: { safe: 0, moderate: 0, aggressive: 10 } 
      },
    ]
  },
  {
    id: 10,
    text: "How do you typically make important financial decisions?",
    answers: [
      { 
        text: "Slowly, after consulting multiple trusted sources", 
        score: { safe: 10, moderate: 0, aggressive: 0 } 
      },
      { 
        text: "After doing research and thinking it over carefully", 
        score: { safe: 4, moderate: 5, aggressive: 0 } 
      },
      { 
        text: "Based on a mix of research and intuition", 
        score: { safe: 1, moderate: 8, aggressive: 3 } 
      },
      { 
        text: "Quickly, trusting my instincts and seizing the moment", 
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