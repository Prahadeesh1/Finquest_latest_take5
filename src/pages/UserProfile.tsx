import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Camera, Mail, Calendar, Users, FileText, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/Auth";

const UserProfile = () => {
  const { userData, updateUserProfile } = useAuth(); // ✅ Now updateUserProfile exists
  
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(userData || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Update draft when userData changes
  useEffect(() => {
    if (userData) {
      setDraft(userData);
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-finance-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    if (draft) {
      setDraft({ ...draft, [field]: value });
    }
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (draft) {
        setDraft({ ...draft, avatarUrl: url });
      }
    }
  };

  const handleSave = async () => {
    if (!draft) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Only include fields that have actual values (not undefined/null/empty string)
      const updates: any = {};
      
      if (draft.firstName && draft.firstName.trim()) {
        updates.firstName = draft.firstName.trim();
      }
      
      if (draft.lastName && draft.lastName.trim()) {
        updates.lastName = draft.lastName.trim();
      }
      
      if (draft.description !== undefined) {
        updates.description = draft.description; // Allow empty string for description
      }
      
      if (draft.avatarUrl && draft.avatarUrl.trim()) {
        updates.avatarUrl = draft.avatarUrl.trim();
      }

      // Only proceed if there are actual updates to make
      if (Object.keys(updates).length === 0) {
        setError('No changes to save.');
        setIsLoading(false);
        return;
      }

      await updateUserProfile(updates);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setDraft(userData || null);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Profile Form Section */}
            <div>
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <User className="h-12 w-12 text-finance-primary" />
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Your Profile
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Manage your account information and preferences
                </p>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                  <div className="h-5 w-5 text-green-400 mr-2 flex-shrink-0">✓</div>
                  <span className="text-sm text-green-700">{success}</span>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="mt-8 space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative">
                    {draft?.avatarUrl ? (
                      <img
                        src={draft.avatarUrl}
                        alt="Profile picture"
                        className="w-24 h-24 rounded-full object-cover border-4 border-finance-primary/20"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/api/placeholder/96/96";
                        }}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-finance-primary/20 border-4 border-finance-primary/20 flex items-center justify-center">
                        <User className="h-12 w-12 text-finance-primary" />
                      </div>
                    )}
                    {isEditing && (
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-finance-primary text-white p-2 rounded-full cursor-pointer hover:bg-finance-primary/90 transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                          disabled={isLoading}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      {isEditing ? (
                        <input
                          id="first-name"
                          name="first-name"
                          type="text"
                          value={draft?.firstName || ''}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="finance-input mt-1"
                          disabled={isLoading}
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md text-gray-900">
                          {userData?.firstName || ''}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      {isEditing ? (
                        <input
                          id="last-name"
                          name="last-name"
                          type="text"
                          value={draft?.lastName || ''}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="finance-input mt-1"
                          disabled={isLoading}
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md text-gray-900">
                          {userData?.lastName || ''}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-500">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {userData?.email || ''}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed. Contact support if you need to update this.
                    </p>
                  </div>

                  {/* Experience Level (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Experience Level
                    </label>
                    <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-500">
                      {userData?.experienceLevel ? userData.experienceLevel.charAt(0).toUpperCase() + userData.experienceLevel.slice(1) : 'Not specified'}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Experience level is set during registration. Contact support to change this.
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      About you
                    </label>
                    {isEditing ? (
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={draft?.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Tell us about your financial goals and interests..."
                        className="finance-input mt-1 resize-none"
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md text-gray-900 min-h-[100px]">
                        {userData?.description || "No description added yet."}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {isEditing ? (
                      <>
                        <Button
                          type="button"
                          onClick={handleSave}
                          className="flex-1 finance-button-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </div>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                        <Button
                          type="button"
                          onClick={handleCancel}
                          variant="outline"
                          className="flex-1"
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="w-full finance-button-primary"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-finance-primary to-finance-secondary rounded-xl overflow-hidden shadow-xl h-full">
                <div className="p-10 text-white">
                  <h3 className="text-2xl font-bold mb-6">
                    Profile Information
                  </h3>
                  
                  {/* Account Stats */}
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Calendar className="h-6 w-6 text-white mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Member since</p>
                        <p className="text-white/80 text-sm">
                          {formatDate(userData?.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-white mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Experience Level</p>
                        <p className="text-white/80 text-sm">
                          {userData?.experienceLevel ? userData.experienceLevel.charAt(0).toUpperCase() + userData.experienceLevel.slice(1) : 'Not specified'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Following ({userData?.following?.length || 0})</p>
                        <div className="text-white/80 text-sm mt-1">
                          {userData?.following && userData.following.length > 0 ? (
                            <p>Following {userData.following.length} users</p>
                          ) : (
                            <p>You're not following anyone yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Summary */}
                  <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h4 className="font-medium mb-3">Recent Activity</h4>
                    <div className="space-y-2 text-sm text-white/80">
                      {userData?.activityLog && userData.activityLog.length > 0 ? (
                        userData.activityLog.slice(-3).reverse().map((activity, index) => (
                          <p key={index}>• {activity.action}</p>
                        ))
                      ) : (
                        <>
                          <p>• Account created</p>
                          <p>• Profile viewed</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors text-sm">
                        View Learning Progress
                      </button>
                      <button className="w-full text-left p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors text-sm">
                        Update Risk Assessment
                      </button>
                      <button className="w-full text-left p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors text-sm">
                        Privacy Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;