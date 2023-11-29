import Script from "next/script";

export const GoogleAnalyticsTracking = () => {
    return (
        <>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZW3SBNYYSF" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZW3SBNYYSF');
        `}
            </Script>
        </>
    );
}