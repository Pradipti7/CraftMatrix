import { useState, useEffect, useCallback, useRef } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

export default function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gsiReady, setGsiReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkGsi = setInterval(() => {
      if (window.google?.accounts?.id) {
        setGsiReady(true);
        clearInterval(checkGsi);
      }
    }, 100);
    return () => clearInterval(checkGsi);
  }, []);

  useEffect(() => {
    if (!gsiReady || !window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }, [gsiReady]);

  useEffect(() => {
    if (!gsiReady || !containerRef.current || !window.google?.accounts?.id) return;

    containerRef.current.innerHTML = "";

    window.google.accounts.id.renderButton(containerRef.current, {
      type: "standard",
      size: "large",
      theme: "outline",
      text: "signin_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: 300,
    });
  }, [gsiReady]);

  const handleCredentialResponse = useCallback((response) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = decodeJwtPayload(response.credential);
      setUser({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      });
    } catch (err) {
      setError("Failed to authenticate with Google");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(() => {
    if (!gsiReady || !window.google?.accounts?.id) {
      setError("Google Identity Services not loaded. Please check your internet connection.");
      return;
    }
    setError(null);
    window.google.accounts.id.prompt();
  }, [gsiReady]);

  const signOut = useCallback(() => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    setUser(null);
  }, []);

  return { user, isLoading, error, signIn, signOut, containerRef, gsiReady };
}

function decodeJwtPayload(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}
