import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Delivery Management System. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
