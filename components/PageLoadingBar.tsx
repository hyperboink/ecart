'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Optional config
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export default function TopLoadingBar() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 200);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}