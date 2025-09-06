import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Camera, Mail, Calendar, Users, FileText } from "lucide-react";

/**
 * UserProfile Component
 * Renders the user profile page with editable profile information
 * and a section showing user details and activity.
 */
const UserProfile = () => {
  // Mock user data - in a real app, this would come from your state management or API
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    joinedAt: "2024-01-15",
    following: ["Alice Smith", "Bob Johnson", "Carol Wilson"],
    description: "Passionate about learning financial literacy and building wealth for the future.",
    avatarUrl: "/default_avatar.png"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ ...user });

  const handleInputChange = (field: string, value: string) => {
    setDraft({ ...draft, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDraft({ ...draft, avatarUrl: url });
    }
  };

  const handleSave = () => {
    setUser({ ...draft });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...user });
    setIsEditing(false);
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

              <div className="mt-8 space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative">
                    <img
                      src={draft.avatarUrl || "/default_avatar.png"}
                      alt="Profile picture"
                      className="w-24 h-24 rounded-full object-cover border-4 border-finance-primary/20"
                    />
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
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-6">
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
                          value={draft.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="finance-input mt-1"
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md text-gray-900">
                          {user.firstName}
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
                          value={draft.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="finance-input mt-1"
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md text-gray-900">
                          {user.lastName}
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
                        {user.email}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed. Contact support if you need to update this.
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
                        value={draft.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Tell us about your financial goals and interests..."
                        className="finance-input mt-1 resize-none"
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md text-gray-900 min-h-[100px]">
                        {user.description || "No description added yet."}
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
                        >
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          onClick={handleCancel}
                          variant="outline"
                          className="flex-1"
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
                          {new Date(user.joinedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Following ({user.following.length})</p>
                        <div className="text-white/80 text-sm mt-1">
                          {user.following.length > 0 ? (
                            <ul className="space-y-1">
                              {user.following.slice(0, 3).map((person, index) => (
                                <li key={index}>• {person}</li>
                              ))}
                              {user.following.length > 3 && (
                                <li>• And {user.following.length - 3} more...</li>
                              )}
                            </ul>
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
                      <p>• Completed Risk Assessment</p>
                      <p>• Joined Community Discussion</p>
                      <p>• Updated Investment Goals</p>
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