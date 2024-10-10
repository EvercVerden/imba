"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = 'http://localhost:8080/api';

export function SignInDialog({ open, onOpenChange }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const url = isSignIn ? `${API_BASE_URL}/users/login` : `${API_BASE_URL}/users/register`;
    const body = isSignIn ? { email, password } : { username, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (isSignIn) {
          // Handle successful login (e.g., store token, update user state)
          console.log('User ID:', data.user_id);
          console.log('Token:', data.token);
          console.log('Session ID:', data.session_id);
        }
        setTimeout(() => onOpenChange(false), 1500);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] w-full bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text mb-2">
            {isSignIn ? "Welcome Back" : "Join JTL Fund"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isSignIn ? "Enter your credentials to access your account" : "Create a new account to join JTL Fund"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                <Input 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username" 
                  className="w-full max-w-[350px] text-black"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full max-w-[350px] text-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="w-full max-w-[350px] text-black"
                required
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
          {message && (
            <div className="text-green-500 text-sm mt-2">
              {message}
            </div>
          )}
          <DialogFooter className="flex flex-col items-center space-y-4 mt-6">
            <Button type="submit" className="w-full max-w-[350px] bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-indigo-600 transition-all py-2">
              {isSignIn ? "Sign In" : "Register"}
            </Button>
            <Button 
              type="button"
              variant="link" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError('');
                setMessage('');
              }}
            >
              {isSignIn ? "Don't have an account? Register" : "Already have an account? Sign In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}