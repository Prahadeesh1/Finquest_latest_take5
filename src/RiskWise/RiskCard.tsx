
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskCardProps {
  title: string;
  description: string;
  color: string;
  examples: string[];
  returns: string;
  allocation: {
    stocks: number;
    bonds: number;
    cash: number;
    other: number;
  };
  isActive?: boolean;
  onClick?: () => void;
}

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
      <div className={`h-2 bg-riskwise-${color}`} />
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
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
            {examples.map((example, i) => (
              <li key={i} className="text-sm">{example}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-gray-500 mb-2">Asset Allocation</h4>
          <div className="flex w-full h-3 rounded-full overflow-hidden">
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