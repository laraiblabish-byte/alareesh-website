import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentAdminProfile } from '../../lib/supabase';
import { ShieldCheck } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function verify() {
      try {
        const admin = await getCurrentAdminProfile();
        if (isMounted) {
          setProfile(admin);
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        if (isMounted) {
          setProfile(null);
          setLoading(false);
        }
      }
    }
    verify();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ea1d25] to-red-500 flex items-center justify-center text-white shadow-xl animate-pulse mb-4">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div className="text-slate-900 font-bold text-sm tracking-wide">
          Verifying Admin Credentials...
        </div>
        <p className="text-xs text-slate-500 mt-1">Checking Supabase session and permissions</p>
      </div>
    );
  }

  if (!profile || !profile.is_active) {
    return <Navigate to="/admin/login" replace />;
  }

  return typeof children === 'function' ? children({ profile }) : children;
}
