import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  curUser,
  token,
  children,
  requireAdmin = false,
}) {
  const location = useLocation();

  // If no token, user is not authenticated -> redirect to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If token exists but curUser is still loading (null), render nothing to avoid redirect loop
  if (token && !curUser) {
    return null;
  }

  if (requireAdmin && !curUser?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
