import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, BookOpen, Wallet, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostService } from "@/services/realtimeDB";
import { useAuth } from "@/contexts/Auth";
import { toast } from "sonner";

const communities = [
  {
    id: "stockmarket",
    name: "StockMarket",
    description: "Discussion about stock markets, trading strategies, and investment trends.",
    memberCount: 0,
    icon: TrendingUp,
    color: "text-finance-primary bg-finance-primary/10",
    route: "/CommunityPages/stockmarketpage",
  },
  {
    id: "budgeting-101",
    name: "Budgeting 101",
    description: "Tips, advice, and discussions about managing personal finances and budgeting.",
    memberCount: 0,
    icon: Wallet,
    color: "text-finance-secondary bg-finance-secondary/10",
    route: "/CommunityPages/Budgeting101",
  },
  {
    id: "easy-invest-hub",
    name: "Easy Invest Hub",
    description: "A supportive community for those who are new to investing.",
    memberCount: 0,
    icon: BookOpen,
    color: "text-finance-accent bg-finance-accent/10",
    route: "/CommunityPages/EasyInvestHub",
  },
];

const CommunityList = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [membershipStatus, setMembershipStatus] = useState<Record<string, boolean>>({});
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [joiningCommunity, setJoiningCommunity] = useState<string | null>(null);

  // Load membership status and member counts
  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        setLoading(true);
        
        console.log('Loading community data for user:', currentUser?.uid);
        
        // Load data for all communities
        const results = await Promise.all(
          communities.map(async (community) => {
            try {
              const [isMember, memberCount] = await Promise.all([
                currentUser 
                  ? PostService.isUserMember(currentUser.uid, community.id) 
                  : Promise.resolve(false),
                PostService.getCommunityMemberCount(community.id)
              ]);
              
              console.log(`Community ${community.id}:`, { isMember, memberCount });
              
              return { id: community.id, isMember, memberCount };
            } catch (error) {
              console.error(`Error loading data for ${community.id}:`, error);
              return { id: community.id, isMember: false, memberCount: 0 };
            }
          })
        );
        
        // Build status and count objects
        const newMembershipStatus: Record<string, boolean> = {};
        const newMemberCounts: Record<string, number> = {};
        
        results.forEach(({ id, isMember, memberCount }) => {
          newMembershipStatus[id] = isMember;
          newMemberCounts[id] = memberCount;
        });

        console.log('Final membership status:', newMembershipStatus);
        console.log('Final member counts:', newMemberCounts);

        setMembershipStatus(newMembershipStatus);
        setMemberCounts(newMemberCounts);
      } catch (error) {
        console.error('Error loading community data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCommunityData();
  }, [currentUser]);

  // Handle community button click
  const handleCommunityClick = async (communityId: string, route: string, communityName: string) => {
    const isMember = membershipStatus[communityId];

    // If already a member, just navigate to the community
    if (isMember) {
      console.log(`User is already a member, navigating to: ${route}`);
      navigate(route);
      window.scrollTo(0, 0);
      return;
    }

    // If not logged in, let them browse the community
    if (!currentUser) {
      console.log(`User not logged in, navigating to: ${route}`);
      navigate(route);
      window.scrollTo(0, 0);
      return;
    }

    // If not a member and logged in, join first then navigate
    setJoiningCommunity(communityId);
    try {
      await PostService.joinCommunity(currentUser.uid, communityId);
      
      // Update local state
      setMembershipStatus(prev => ({ ...prev, [communityId]: true }));
      setMemberCounts(prev => ({ 
        ...prev, 
        [communityId]: (prev[communityId] || 0) + 1 
      }));
      
      toast.success(`Joined ${communityName}!`);
      
      // Navigate to the community
      navigate(route);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error joining community:', error);
      toast.error('Failed to join community');
    } finally {
      setJoiningCommunity(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Popular Communities</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {communities.map((community) => {
          const isMember = membershipStatus[community.id];
          const memberCount = memberCounts[community.id] || 0;
          const isJoining = joiningCommunity === community.id;

          return (
            <div key={community.id} className="p-4 hover:bg-blue-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${community.color}`}>
                  <community.icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-blue-900">{community.name}</h3>
                    <div className="flex items-center text-xs text-blue-300">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{loading ? '...' : memberCount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{community.description}</p>
                  
                  <Button 
                    variant={isMember ? "default" : "outline"}
                    size="sm" 
                    className={
                      isMember 
                        ? "bg-finance-primary hover:bg-finance-primary/90 text-white w-full"
                        : "text-finance-primary border-finance-primary hover:bg-finance-primary hover:text-white w-full"
                    }
                    onClick={() => handleCommunityClick(community.id, community.route, community.name)}
                    disabled={isJoining || loading}
                  >
                    {isJoining ? (
                      <div className="flex items-center space-x-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Joining...</span>
                      </div>
                    ) : isMember ? (
                      'View Community'
                    ) : (
                      'Join Community'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityList;