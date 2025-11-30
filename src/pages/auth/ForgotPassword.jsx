import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/forms/InputField";
import Button from "../../components/ui/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Utiliser authService quand l'API sera prête
    setMessage("Un email de réinitialisation a été envoyé à votre adresse.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200/90">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Mot de passe oublié
        </h2>
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-full">
            Envoyer
          </Button>
          <div className="text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
