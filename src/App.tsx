import React, { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import { Pricing } from "./components/Pricing";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  // Load state from local storage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("codemaster_email");
    const storedPremium = localStorage.getItem("codemaster_premium");

    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    if (storedPremium === "true") {
      setIsPremium(true);
    }
  }, []);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    localStorage.setItem("codemaster_email", email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setIsPremium(false);
    localStorage.removeItem("codemaster_email");
    localStorage.removeItem("codemaster_premium");
  };

  const handleSimulatePayment = () => {
    setIsPremium(true);
    localStorage.setItem("codemaster_premium", "true");
  };

  if (!userEmail) {
    return <Auth onLogin={handleLogin} />;
  }

  if (!isPremium) {
    return (
      <Pricing email={userEmail} onSimulatePayment={handleSimulatePayment} />
    );
  }

  return <Dashboard email={userEmail} onLogout={handleLogout} />;
}
