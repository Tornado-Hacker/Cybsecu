import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Home, User, Briefcase, Award, MessageCircle, FileText, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: User },
    { path: "/skills", label: "Skills", icon: Award },
    { path: "/projects", label: "Projects", icon: Briefcase },
    { path: "/experience", label: "Experience", icon: FileText },
    { path: "/blogs", label: "Blog", icon: MessageCircle },
  ];

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      <Link href="/" className="flex items-center space-x-2 mr-6">
        <Shield className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          CyberSec Pro
        </span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link key={path} href={path}>
            <Button
              variant={location === path ? "default" : "ghost"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}