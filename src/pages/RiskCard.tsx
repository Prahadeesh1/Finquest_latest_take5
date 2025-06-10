import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskCardProps {
  title: string;//Title of the risk profile
  description: string; //Description of the risk profile
  color: string; 
  examples: string[]; //List of the investment examples for this profile
  returns: string; //Expected returns
  allocation: { //Percentage allocation across different asset classes
    stocks: number;
    bonds: number;
    cash: number;
    other: number;
  };
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * RiskCard Component
 * Displays detailed information about a specific investment risk profile.
 * It includes a title, description, examples, expected returns, and a visual
 * representation of asset allocation. The card's appearance changes when active.
 */
const RiskCard: React.FC<RiskCardProps> = ({
  title,
  description,
  color,
  examples,
  returns,
  allocation,
  isActive = false,
  onClick,
}) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden",
        isActive ? `border-2 border-${color} shadow-md` : "border border-gray-200"
      )}
      onClick={onClick}
    >
      {/* Top border strip, dynamically colored based on the profile's 'color' prop. */}
      <div className={`h-2 bg-riskwise-${color}`} />
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {/* Badge displaying expected returns, dynamically colored. */}
          <Badge 
            variant="outline" 
            className={`bg-riskwise-${color} text-white px-3 py-1`}
          >
            {returns}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-500 mb-2">Examples</h4>
          <ul className="list-disc pl-5 space-y-1">
            {/* Renders a list of example investments for the profile. */}
            {examples.map((example, i) => (
              <li key={i} className="text-sm">{example}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-gray-500 mb-2">Asset Allocation</h4>
          {/* Visual representation of asset allocation as a horizontal bar chart. */}
          <div className="flex w-full h-3 rounded-full overflow-hidden">
            {/* Each div represents a segment of the portfolio, with width set by allocation percentage. */}
            <div 
              className="bg-blue-500" 
              style={{ width: `${allocation.stocks}%` }} 
              title={`Stocks: ${allocation.stocks}%`}
            />
            <div 
              className="bg-green-500" 
              style={{ width: `${allocation.bonds}%` }} 
              title={`Bonds: ${allocation.bonds}%`}
            />
            <div 
              className="bg-yellow-500" 
              style={{ width: `${allocation.cash}%` }} 
              title={`Cash: ${allocation.cash}%`}
            />
            <div 
              className="bg-purple-500" 
              style={{ width: `${allocation.other}%` }} 
              title={`Other: ${allocation.other}%`}
            />
          </div>
          {/* Text labels below the bar chart showing exact percentages for the various asset class. */}
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <div>{allocation.stocks}% Stocks</div>
            <div>{allocation.bonds}% Bonds</div>
            <div>{allocation.cash}% Cash</div>
            <div>{allocation.other}% Other</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskCard;
