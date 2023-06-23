declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export function initializeAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', 'UA-64893820-4', {
        cookie_domain: 'google-analytics.com'
    })
    window.gtag('config', 'G-9MZWEG1LMK', {
        cookie_domain: 'google-analytics.com'
    })
}

export function trackEvent(category: string, action: string, label: string, value?: number) {
    console.log('FIK');

    window.gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
    })

    window.gtag("event", "Pageview", {
        pageTitle: 'GOOK',
        date: new Date()
    })
}