import Script from "next/script";

export const GoogleAnalyticsTracking = () => {
    return (
        <>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <meta name="google-site-verification" content="UPy462P0DpuVDRDP4ssOZrxL4V6swsQ63HLf-xKXnyM" />
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