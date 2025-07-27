"use client";
import { useState, useEffect } from 'react';

export const usePlatform = () => {
    const [platform, setPlatform] = useState({
        os: 'unknown',
        browser: 'unknown',
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isWindows: false,
        isMac: false,
        isLinux: false,
        isIOS: false,
        isAndroid: false,
        userAgent: '',
        platformString: '',
        screenWidth: 0,
        screenHeight: 0,
        isInitialized: false,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const userAgent = window.navigator.userAgent;
        const platformString = window.navigator.platform;

        // Detect OS
        let os = 'unknown';
        let isWindows = false;
        let isMac = false;
        let isLinux = false;
        let isIOS = false;
        let isAndroid = false;

        if (userAgent.includes('Windows NT')) {
            os = 'Windows';
            isWindows = true;
        } else if (userAgent.includes('Mac OS X')) {
            os = 'macOS';
            isMac = true;
        } else if (userAgent.includes('Linux')) {
            os = 'Linux';
            isLinux = true;
        } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            os = 'iOS';
            isIOS = true;
        } else if (userAgent.includes('Android')) {
            os = 'Android';
            isAndroid = true;
        }

        // Detect browser
        let browser = 'unknown';
        if (userAgent.includes('Chrome')) {
            browser = 'Chrome';
        } else if (userAgent.includes('Firefox')) {
            browser = 'Firefox';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser = 'Safari';
        } else if (userAgent.includes('Edge')) {
            browser = 'Edge';
        } else if (userAgent.includes('Opera')) {
            browser = 'Opera';
        } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
            browser = 'Internet Explorer';
        }

        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)(?!.*\bPhone\b)/i.test(userAgent) || 
                        (isMobile && window.innerWidth >= 768);
        const isDesktop = !isMobile;

        setPlatform({
            os,
            browser,
            isMobile,
            isTablet,
            isDesktop,
            isWindows,
            isMac,
            isLinux,
            isIOS,
            isAndroid,
            userAgent,
            platformString,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            isInitialized: true,
        });
    }, []);

    return platform;
};