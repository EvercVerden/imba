"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';

export function UserProfile() {
  const [user, setUser] = useState({ username: 'JohnDoe', email: 'john@example.com', bio: 'Hello, I am John!', avatar_url: '/default-avatar.png' });
  const [bio, setBio] = useState(user.bio);

  const handleUpdateProfile = () => {
    setUser({ ...user, bio });
    alert('Profile updated successfully');
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
        User Profile
      </h1>
      <div className="mb-6">
        <Image
          src={user.avatar_url}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
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
    </div>
  );
}