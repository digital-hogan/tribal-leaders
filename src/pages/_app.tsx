import { type AppType } from "next/app";
import Layout from "~/components/layout";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { api } from "~/utils/api";

import "~/styles/globals.css";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

const MyApp: AppType = ({ Component, pageProps }) => {
const router = useRouter()

	useEffect(() => {
		// Track page views
		const handleRouteChange = () => posthog?.capture('$pageview')
		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
		  router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [])

  return (
		<PostHogProvider client={posthog}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</PostHogProvider>
	)
};

export default api.withTRPC(MyApp);
