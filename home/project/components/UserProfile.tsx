"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';

export function UserProfile() {
  const [user, setUser] = useState({ username: 'JohnDoe', email: 'john@example.com', bio: 'Hello, I am John!' });
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    // Simulating an API call
    setTimeout(() => {
      setUser({ ...user, bio });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    }, 1000);
  };

  const handleUpdateAvatar = async () => {
    if (!avatarFile) return;
    // Simulating an API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    }, 1000);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Simulating an API call
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Account deleted successfully",
        });
      }, 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
        User Profile
      </h1>
      <div className="mb-6">
        <Image
          src={user.avatar_url || '/default-avatar.png'}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
        <Input
          type="file"
          onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          className="mt-2"
        />
        <Button onClick={handleUpdateAvatar} className="mt-2">
          Update Avatar
        </Button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <Input value={user.username} disabled />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input value={user.email} disabled />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </div>
      <Button onClick={handleUpdateProfile} className="mb-4">
        Update Profile
      </Button>
      <Button onClick={handleDeleteAccount} variant="destructive">
        Delete Account
      </Button>
    </div>
  );
}