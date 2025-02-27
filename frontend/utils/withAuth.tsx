// /utils/withAuth.tsx
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext'; // Import your custom hook
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    if (user) {
      return <WrappedComponent {...props} />;
    }

    return (
        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', height: '100vh'}}>
            <h2>Loading...</h2>
        </div>
    );
  };

  return WithAuth;
};

export default withAuth;
