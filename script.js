/**
 * ===============================================================================================
 * PROJECT: MAHMOUD ABOLFADL OFFICIAL PORTFOLIO & SECURITY HUB
 * COMPONENT: CORE JAVASCRIPT ENGINE (The Brain)
 * VERSION: 3.0.1 (Enterprise Security Edition)
 * AUTHOR: MAHMOUD IBRAHIM (The Leader)
 * * DESCRIPTION:
 * هذا الملف هو "العقل المدبر" للموقع. لا يكتفي بإضافة تأثيرات بسيطة، بل يحتوي على
 * خوارزميات كاملة للأمن السيبراني (محاكاة تعليمية)، معالجة نصوص متقدمة،
 * ونظام تفاعل ديناميكي يربط بين التاريخ (الماضي) والتكنولوجيا (المستقبل).
 * * ARCHITECTURE:
 * 1. GLOBAL CONFIG & UTILS (الإعدادات العامة)
 * 2. STATE MANAGEMENT (إدارة حالة الموقع)
 * 3. SECURITY ENGINE (محرك التحليل الأمني - الأضخم والأهم)
 * - Password Entropy Calculator
 * - Phishing Pattern Detector
 * 4. UI CONTROLLER (التحكم في الواجهة)
 * - Typing Effects
 * - Scroll Spies
 * - Modal Systems
 * 5. DATA STORE (قاعدة بيانات محلية للنصائح والاختبارات)
 * 6. INITIALIZATION (الإقلاع)
 * ===============================================================================================
 */

'use strict';

/* ==========================================================================
   1. SYSTEM CONFIGURATION & CONSTANTS
   إعدادات النظام الثابتة
   ========================================================================== */
const APP_CONFIG = {
    name: "AboElfadl_Portfolio",
    version: "3.0.0",
    debugMode: true, // Set to false in production
    animationSpeed: {
        fast: 200,
        normal: 500,
        slow: 1000,
        typing: 100 // ms per character
    },
    selectors: {
        preloader: "#preloader",
        header: "#header",
        mobileMenuBtn: ".mobile-menu-btn",
        mobileNav: ".main-nav",
        typingElement: "#typing-effect",
        forms: {
            contact: "#main-contact-form",
            newsletter: ".newsletter-form"
        },
        securityTools: {
            passwordInput: "#security-password-check", // Will be created dynamically
            urlInput: "#security-url-check"           // Will be created dynamically
        }
    },
    colors: {
        gold: "#cca43b",
        red: "#e63946",
        dark: "#050505",
        success: "#28a745",
        warning: "#ffc107",
        danger: "#dc3545"
    }
};

/**
 * LOGGER UTILITY
 * نظام تسجيل أحداث احترافي (Console Logs)
 * يظهر رسائل ملونة في المتصفح لتتبع الأخطاء أو لمحاكاة نظام الهاكر.
 */
const Logger = {
    log: (msg, type = 'info') => {
        if (!APP_CONFIG.debugMode) return;
        
        const timestamp = new Date().toLocaleTimeString();
        let style = "color: #e0e0e0; background: #333; padding: 2px 5px; border-radius: 3px;";
        let icon = "ℹ️";

        switch(type) {
            case 'success':
                style = "color: #000; background: #28a745; padding: 2px 5px; font-weight: bold;";
                icon = "✅";
                break;
            case 'warning':
                style = "color: #000; background: #ffc107; padding: 2px 5px; font-weight: bold;";
                icon = "⚠️";
                break;
            case 'danger':
                style = "color: #fff; background: #dc3545; padding: 2px 5px; font-weight: bold;";
                icon = "🚨";
                break;
            case 'security':
                style = "color: #000; background: #cca43b; padding: 2px 5px; font-weight: bold; border: 1px solid #fff;";
                icon = "🛡️ SEC-OPS:";
                break;
        }

        console.log(`%c${icon} [${timestamp}] %c${msg}`, "font-size: 10px;", style);
    },

    banner: () => {
        console.clear();
        console.log(
            `%c
            ███╗   ███╗ █████╗ ██╗  ██╗███╗   ███╗ ██████╗ ██╗   ██╗██████╗ 
            ████╗ ████║██╔══██╗██║  ██║████╗ ████║██╔═══██╗██║   ██║██╔══██╗
            ██╔████╔██║███████║███████║██╔████╔██║██║   ██║██║   ██║██║  ██║
            ██║╚██╔╝██║██╔══██║██╔══██║██║╚██╔╝██║██║   ██║██║   ██║██║  ██║
            ██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██████╔╝
            ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ 
            
            >> SYSTEM: ONLINE
            >> USER: GUEST
            >> MISSION: SECURITY AWARENESS & WEB DEV
            >> STATUS: PROTECTED
            `, 
            "color: #cca43b; font-family: monospace; font-weight: bold;"
        );
        console.log("%c⚠️ تحذير: إذا طلب منك أحدهم نسخ كود هنا، فهذه محاولة اختراق (Self-XSS). كن حذراً.", "color: red; font-size: 16px; font-weight: bold;");
    }
};

/* ==========================================================================
   2. DOM MANIPULATION HELPER (JQuery-like)
   دالة مساعدة لاختيار العناصر بسهولة
   ========================================================================== */
const $ = (selector) => {
    const elements = document.querySelectorAll(selector);
    return elements.length === 1 ? elements[0] : elements;
};

// Event Listener Helper
const on = (element, event, handler) => {
    if (element) {
        if (element.length && !element.tagName) {
            element.forEach(el => el.addEventListener(event, handler));
        } else {
            element.addEventListener(event, handler);
        }
    }
};

/* ==========================================================================
   3. SECURITY ENGINE (CORE FEATURE)
   محرك التحليل الأمني - أهم جزء في المشروع بناءً على طلبك
   يحتوي على خوارزميات لفحص كلمات السر وكشف التصيد.
   ========================================================================== */

class SecurityEngine {
    constructor() {
        this.commonPasswords = [
            "123456", "password", "12345678", "qwerty", "12345", "123456789", "football", "iloveyou",
            "admin", "welcome", "google", "secret", "123123", "password123", "master", "000000"
        ]; // عينة صغيرة، في الواقع تكون الآلاف
        
        this.phishingPatterns = [
            /faceb00k/i, /paypal-secure/i, /bank-verify/i, /login-update/i, /account-suspend/i,
            /free-gift/i, /win-prize/i, /\.xyz$/i, /\.tk$/i, /ngrok/i, /bit\.ly/i
        ];

        Logger.log("Security Engine Initialized...", "security");
    }

    /**
     * PASSWORD STRENGTH CHECKER
     * خوارزمية فحص قوة كلمة المرور
     * تطبق المعايير الصارمة التي طلبتها (8 حروف، إنجليزي فقط، تنوع)
     */
    checkPassword(password) {
        let score = 0;
        let feedback = [];
        let isSafe = true;

        // 1. Check Length
        if (password.length < 8) {
            feedback.push("ضعيفة جداً: الطول يجب أن يكون 8 أحرف على الأقل.");
            isSafe = false;
        } else {
            score += 20;
        }

        // 2. Check Charset (English Only) - Strict Rule
        if (/[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            feedback.push("خطير: يرجى استخدام الأحرف الإنجليزية والرموز القياسية فقط.");
            isSafe = false;
            // Penalize heavily
            score = 0;
        }

        // 3. Common Password Check
        if (this.commonPasswords.includes(password.toLowerCase())) {
            feedback.push("كارثة: هذه كلمة مرور شائعة جداً وموجودة في القواميس المسربة!");
            isSafe = false;
            score = 0;
        }

        if (!isSafe && score === 0) return { score, feedback, level: "مخترقة فوراً" };

        // 4. Complexity Checks
        if (/[A-Z]/.test(password)) score += 20; // Uppercase
        else feedback.push("نصيحة: أضف حرفاً كبيراً (A-Z).");

        if (/[0-9]/.test(password)) score += 20; // Numbers
        else feedback.push("نصيحة: أضف أرقاماً.");

        if (/[^A-Za-z0-9]/.test(password)) score += 20; // Symbols
        else feedback.push("نصيحة: أضف رموزاً خاصة (!@#$).");

        if (password.length > 12) score += 20; // Bonus for length

        // Determine Level
        let level = "";
        if (score < 40) level = "ضعيفة";
        else if (score < 80) level = "متوسطة";
        else level = "قوية (محمود يوافق عليها)";

        return { score, feedback, level };
    }

    /**
     * PHISHING URL DETECTOR
     * كاشف روابط التصيد
     * يحلل الرابط بحثاً عن أنماط مشبوهة
     */
    analyzeURL(url) {
        let riskScore = 0;
        let analysis = [];

        try {
            // Basic Formatting
            if (!url.startsWith('http')) {
                url = 'http://' + url; // Assume http for parsing if missing
            }
            const urlObj = new URL(url);
            const domain = urlObj.hostname;

            analysis.push(`النطاق المستخرج: ${domain}`);

            // 1. Protocol Check
            if (urlObj.protocol !== 'https:') {
                riskScore += 30;
                analysis.push("خطر: الموقع لا يستخدم تشفير HTTPS.");
            }

            // 2. Suspicious TLDs
            if (/\.(tk|ml|ga|cf|gq|xyz|top)$/i.test(domain)) {
                riskScore += 40;
                analysis.push("تنبيه: نطاق (Domain) مجاني أو رخيص، غالباً يستخدمه المحتالون.");
            }

            // 3. IP Address Usage
            if (/^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
                riskScore += 50;
                analysis.push("خطر عالٍ: الرابط يستخدم عنوان IP بدلاً من اسم الموقع.");
            }

            // 4. Pattern Matching
            let patternFound = false;
            this.phishingPatterns.forEach(pattern => {
                if (pattern.test(url)) {
                    patternFound = true;
                }
            });
            if (patternFound) {
                riskScore += 100; // Immediate Flag
                analysis.push("تنبيه أمني: الرابط يحتوي على كلمات مشبوهة تشبه العلامات التجارية!");
            }

            // 5. Length Check
            if (url.length > 70) {
                riskScore += 10;
                analysis.push("ملاحظة: الرابط طويل جداً، قد يكون محاولة لإخفاء الوجهة الحقيقية.");
            }

            // Result
            let verdict = "آمن ظاهرياً";
            if (riskScore >= 50) verdict = "مشبوه";
            if (riskScore >= 100) verdict = "خبيث (Phishing)";

            return { riskScore, analysis, verdict };

        } catch (e) {
            return { riskScore: 100, analysis: ["الرابط غير صالح لغوياً (Invalid URL)."], verdict: "خطأ" };
        }
    }
}

// Instantiate Global Security Engine
const SecOps = new SecurityEngine();

/* ==========================================================================
   4. UI CONTROLLER
   التحكم في عناصر الواجهة والتفاعل
   ========================================================================== */

const UI = {
    /**
     * PRELOADER
     * إخفاء شاشة التحميل بعد اكتمال الموارد
     */
    initPreloader: () => {
        const loader = $(APP_CONFIG.selectors.preloader);
        if (loader) {
            window.addEventListener('load', () => {
                // Fake a small delay to show the logo logic
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        Logger.log("UI Loaded Successfully.", "success");
                        // Trigger Intro Animations
                        UI.triggerHeroAnimations();
                    }, 500);
                }, 1500);
            });
        }
    },

    /**
     * NAVIGATION LOGIC
     * القائمة العلوية والموبايل
     */
    initNavigation: () => {
        const header = $(APP_CONFIG.selectors.header);
        const menuBtn = $(APP_CONFIG.selectors.mobileMenuBtn);
        const nav = $(APP_CONFIG.selectors.mobileNav);
        const links = $('.nav-link');

        // Sticky Header Effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
                header.style.background = "rgba(5, 5, 5, 0.95)";
            } else {
                header.classList.remove('scrolled');
                header.style.boxShadow = "none";
                header.style.background = "rgba(5, 5, 5, 0.85)";
            }
        });

        // Mobile Menu Toggle
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
                menuBtn.setAttribute('aria-expanded', !expanded);
                nav.classList.toggle('active');
                
                // Animate Hamburger
                const hamburger = menuBtn.querySelector('.hamburger-inner');
                if (nav.classList.contains('active')) {
                    hamburger.style.background = "transparent";
                    // CSS pseudo-elements handle the X shape via CSS class if added, 
                    // or we can manipulate manually. Let's rely on CSS mostly, but logic here ensures state.
                } else {
                    hamburger.style.background = APP_CONFIG.colors.gold;
                }
            });
        }

        // Close menu when clicking a link
        if (links && links.length > 0) {
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }
    },

    /**
     * TYPING EFFECT
     * تأثير الكتابة التلقائية في الواجهة الرئيسية
     */
    initTypingEffect: () => {
        const element = $(APP_CONFIG.selectors.typingElement);
        if (!element) return;

        const words = [
            "مطور ويب شامل.",
            "مدافع أمني.",
            "باحث تاريخي.",
            "قائد استراتيجي."
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? APP_CONFIG.animationSpeed.typing / 2 : APP_CONFIG.animationSpeed.typing;

            if (!isDeleting && charIndex === currentWord.length) {
                // Finished word, wait before deleting
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    },

    /**
     * SCROLL REVEAL (INTERSECTION OBSERVER)
     * إظهار العناصر عند التمرير
     */
    initScrollReveal: () => {
        const revealElements = document.querySelectorAll('.about-card, .project-card, .security-card, .section-title');
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        };

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver(revealCallback, revealOptions);

        revealElements.forEach(el => {
            // Set initial state via JS to ensure graceful degradation if JS fails
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    },

    triggerHeroAnimations: () => {
        const heroTitle = $('.hero-title');
        const heroDesc = $('.hero-description');
        const heroBtns = $('.hero-actions');
        const heroVis = $('.hero-visual-area');

        const animate = (el, delay) => {
            if(el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
            }
        };
        
        // Ensure they start hidden
        [heroTitle, heroDesc, heroBtns, heroVis].forEach(el => {
            if(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });

        animate(heroTitle, 100);
        animate(heroDesc, 300);
        animate(heroBtns, 500);
        animate(heroVis, 700);
    }
};

/* ==========================================================================
   5. INTERACTIVE TOOLS MANAGER
   إدارة الأدوات التفاعلية (أدوات الأمن والمشاريع)
   ========================================================================== */

const ToolsManager = {
    /**
     * Create Security Tools Modal/Interface dynamically
     * إنشاء واجهة أدوات الفحص ديناميكياً عند الطلب
     */
    injectSecurityTools: () => {
        const container = $('#security-hub .container');
        if (!container) return;

        // Create the tools wrapper
        const toolsDiv = document.createElement('div');
        toolsDiv.id = "active-security-tools";
        toolsDiv.className = "security-tools-wrapper";
        toolsDiv.style.cssText = `
            background: #111;
            border: 1px solid #333;
            border-radius: 16px;
            padding: 24px;
            margin-top: 40px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            opacity: 0;
            transition: opacity 0.5s;
        `;

        // 1. Password Checker Tool HTML
        const passTool = `
            <div class="tool-box">
                <h3 style="color: ${APP_CONFIG.colors.gold}; margin-bottom: 10px;">
                    <span style="font-size:1.2em">🔒</span> فحص كلمة السر
                </h3>
                <p style="font-size: 0.9em; color: #aaa; margin-bottom: 15px;">
                    جرب كتابة كلمة سر لنفحص قوتها محلياً (لا يتم إرسالها لأي سيرفر).
                </p>
                <div class="input-group" style="position: relative;">
                    <input type="text" id="sec-pass-input" placeholder="اكتب كلمة السر هنا..." 
                        style="width: 100%; padding: 10px; background: #222; border: 1px solid #444; color: white; border-radius: 5px;">
                    <div id="pass-strength-bar" style="height: 5px; width: 0%; background: red; margin-top: 5px; transition: width 0.3s, background 0.3s;"></div>
                </div>
                <ul id="pass-feedback" style="margin-top: 10px; font-size: 0.85em; list-style: none; padding: 0;"></ul>
            </div>
        `;

        // 2. URL Checker Tool HTML
        const urlTool = `
            <div class="tool-box">
                <h3 style="color: ${APP_CONFIG.colors.red}; margin-bottom: 10px;">
                    <span style="font-size:1.2em">🎣</span> كاشف الروابط (Phishing)
                </h3>
                <p style="font-size: 0.9em; color: #aaa; margin-bottom: 15px;">
                    الصق أي رابط مشبوه هنا لتحليله.
                </p>
                <div class="input-group">
                    <input type="text" id="sec-url-input" placeholder="example.com/login..." 
                        style="width: 100%; padding: 10px; background: #222; border: 1px solid #444; color: white; border-radius: 5px;">
                    <button id="btn-analyze-url" style="width: 100%; margin-top: 10px; padding: 8px; background: ${APP_CONFIG.colors.red}; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        تحليل الرابط
                    </button>
                </div>
                <div id="url-result" style="margin-top: 15px; font-size: 0.9em;"></div>
            </div>
        `;

        toolsDiv.innerHTML = passTool + urlTool;
        
        // Append to section (Insert before the CTA buttons)
        const ctaSection = document.querySelector('.security-tools-cta');
        container.insertBefore(toolsDiv, ctaSection); // Insert before CTA
        
        // Reveal animation
        setTimeout(() => { toolsDiv.style.opacity = '1'; }, 100);

        // Hide original dummy buttons
        if(ctaSection) ctaSection.style.display = 'none';

        // ACTIVATE LISTENERS FOR THESE NEW TOOLS
        ToolsManager.activatePasswordChecker();
        ToolsManager.activateUrlChecker();
    },

    activatePasswordChecker: () => {
        const input = document.getElementById('sec-pass-input');
        const bar = document.getElementById('pass-strength-bar');
        const feedbackList = document.getElementById('pass-feedback');

        if (!input) return;

        input.addEventListener('keyup', (e) => {
            const val = e.target.value;
            if (val.length === 0) {
                bar.style.width = '0%';
                feedbackList.innerHTML = '';
                return;
            }

            const result = SecOps.checkPassword(val);
            
            // Update UI
            bar.style.width = `${Math.min(result.score, 100)}%`;
            
            if (result.score < 40) bar.style.background = APP_CONFIG.colors.danger;
            else if (result.score < 80) bar.style.background = APP_CONFIG.colors.warning;
            else bar.style.background = APP_CONFIG.colors.success;

            // Render Feedback
            let html = `<li style="color: ${bar.style.background}; font-weight: bold; margin-bottom:5px;">التقييم: ${result.level}</li>`;
            result.feedback.forEach(msg => {
                let color = '#ccc';
                if(msg.includes("كارثة") || msg.includes("خطير")) color = APP_CONFIG.colors.danger;
                if(msg.includes("نصيحة")) color = APP_CONFIG.colors.gold;
                html += `<li style="color: ${color}; margin-bottom: 3px;">• ${msg}</li>`;
            });
            feedbackList.innerHTML = html;
        });
    },

    activateUrlChecker: () => {
        const input = document.getElementById('sec-url-input');
        const btn = document.getElementById('btn-analyze-url');
        const resultDiv = document.getElementById('url-result');

        if (!btn) return;

        btn.addEventListener('click', () => {
            const val = input.value.trim();
            if (!val) return;

            resultDiv.innerHTML = '<span style="color:#aaa;">جاري التحليل...</span>';
            
            // Simulate processing time
            setTimeout(() => {
                const result = SecOps.analyzeURL(val);
                
                let color = APP_CONFIG.colors.success;
                if(result.riskScore >= 50) color = APP_CONFIG.colors.warning;
                if(result.riskScore >= 100) color = APP_CONFIG.colors.danger;

                let html = `
                    <div style="border: 1px solid ${color}; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.3);">
                        <strong style="color: ${color}; display:block; margin-bottom:5px;">النتيجة: ${result.verdict}</strong>
                        <ul style="padding-right: 15px; margin:0; color: #ddd;">
                            ${result.analysis.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
                resultDiv.innerHTML = html;
            }, 800);
        });
    }
};

/* ==========================================================================
   6. EASTER EGGS & FUN FEATURES
   أشياء مخفية تظهر للمستخدم المحترف
   ========================================================================== */

const EasterEggs = {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    input: [],

    init: () => {
        window.addEventListener('keydown', (e) => {
            EasterEggs.input.push(e.key);
            EasterEggs.input.splice(-EasterEggs.konamiCode.length - 1, EasterEggs.input.length - EasterEggs.konamiCode.length);
            
            if (EasterEggs.input.join('') === EasterEggs.konamiCode.join('')) {
                EasterEggs.triggerHackMode();
            }
        });
    },

    triggerHackMode: () => {
        Logger.log("HACK MODE ACTIVATED!", "danger");
        document.body.style.fontFamily = "'Courier New', monospace";
        document.body.style.color = "#0f0";
        document.body.style.background = "#000";
        
        // Change all headings
        document.querySelectorAll('h1, h2, h3').forEach(h => {
            h.style.color = "#0f0";
            h.innerText = h.innerText.split('').map(c => Math.random() > 0.5 ? '1' : '0').join('');
        });

        alert("System Breached... Just Kidding! Welcome to the Matrix, Mahmoud.");
        
        // Reset after 5 seconds
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
};

/* ==========================================================================
   7. FORM VALIDATION & HANDLING
   معالجة نماذج التواصل بدقة
   ========================================================================== */

const FormHandler = {
    init: () => {
        const form = document.querySelector(APP_CONFIG.selectors.forms.contact);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = form.querySelector('[name="name"]').value;
            const email = form.querySelector('[name="email"]').value;
            const message = form.querySelector('[name="message"]').value;
            const btn = form.querySelector('.submit-btn');

            // Simple Validation
            if (name.length < 3) {
                alert("الاسم قصير جداً.");
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                alert("البريد الإلكتروني غير صحيح.");
                return;
            }

            // Simulate Sending
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = 'جاري الإرسال <span class="spinner">...</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = `تم الإرسال بنجاح <span style="font-size:1.2em">✅</span>`;
                btn.style.background = APP_CONFIG.colors.success;
                
                // Show Success Modal (simulated alert for now)
                Logger.log(`New Message from ${name}: ${message.substring(0, 20)}...`, "success");
                
                // Reset form
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                    btn.style.background = APP_CONFIG.colors.gold;
                }, 3000);
            }, 2000);
        });
    }
};

/* ==========================================================================
   8. HISTORY VS TECH SIMULATION
   محاكاة بسيطة لقسم التاريخ والتقنية
   ========================================================================== */
const DuelSimulator = {
    init: () => {
        const section = document.querySelector('#history-tech');
        if(!section) return;

        // Add hover effect to the SVG to simulate "decoding" history
        const svg = section.querySelector('svg');
        if(svg) {
            svg.addEventListener('mouseenter', () => {
                const textElements = svg.querySelectorAll('text');
                textElements.forEach(t => {
                    if(t.innerHTML.includes('0101')) {
                        t.style.fill = APP_CONFIG.colors.gold;
                    }
                });
            });
            svg.addEventListener('mouseleave', () => {
                const textElements = svg.querySelectorAll('text');
                textElements.forEach(t => {
                    if(t.innerHTML.includes('0101')) {
                        t.style.fill = '#333';
                    }
                });
            });
        }
    }
};

/* ==========================================================================
   9. MAIN INITIALIZATION
   نقطة انطلاق التطبيق
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    Logger.banner();
    
    // 1. Initialize UI Core
    UI.initPreloader();
    UI.initNavigation();
    UI.initTypingEffect();
    UI.initScrollReveal();

    // 2. Initialize Features
    FormHandler.init();
    DuelSimulator.init();
    EasterEggs.init();

    // 3. Bind Security Buttons (The ones in HTML that trigger the tools)
    // We replace the alert() in HTML with actual function calls
    const secBtns = document.querySelectorAll('.security-tools-cta button');
    if(secBtns.length > 0) {
        secBtns.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                // Inject the actual tools instead of alerting
                ToolsManager.injectSecurityTools();
                // Scroll to them
                setTimeout(() => {
                    const tools = document.getElementById('active-security-tools');
                    if(tools) tools.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            };
        });
    }

    Logger.log("Mahmoud's Portfolio Loaded & Secured.", "success");
});

/* ==========================================================================
   10. VENTURES MODAL SYSTEM (NEW FEATURE)
   نظام إدارة نوافذ المشاريع التجارية
   ========================================================================== */

const VenturesSystem = {
    // قاعدة بيانات المشاريع (سهلة التعديل)
    data: {
        media: {
            title: "AboElfadl Media",
            desc: "وكالة تسويق رقمي متكاملة وتصميم جرافيك.",
            img: "icon/media.png",
            links: [
                { type: "facebook", url: "https://www.facebook.com/share/1DMbfJqkuC/", icon: "fab fa-facebook-f", label: "Facebook" },
                { type: "instagram", url: "https://www.instagram.com/aboelfadlmedi", icon: "fab fa-instagram", label: "Instagram" },
                { type: "website", url: "https://aboelfadl-media.my.canva.site/", icon: "fas fa-globe", label: "Visit Site" },
                { type: "whatsapp", url: "https://wa.me/201093650351", icon: "fab fa-whatsapp", label: "WhatsApp" }
            ]
        },
        store: {
            title: "AboElfadl Store",
            desc: "متجر التكنولوجيا والإكسسوارات الحديثة.",
            img: "icon/store.png",
            links: [
                { type: "facebook", url: "https://web.facebook.com/AboElfadl.store.Official", icon: "fab fa-facebook-f", label: "Facebook" },
                { type: "instagram", url: "https://www.instagram.com/aboelfadl.store.official", icon: "fab fa-instagram", label: "Instagram" },
                { type: "website", url: "https://cezma.com/store/AboElfadl-Store", icon: "fas fa-shopping-cart", label: "Shop Now" },
                { type: "whatsapp", url: "https://wa.me/201112041298", icon: "fab fa-whatsapp", label: "WhatsApp" }
            ]
        },
        clothing: {
            title: "ملابس أبو الفضل",
            desc: "أزياء رجالية بتصاميم عصرية وخامات مميزة.",
            img: "icon/clothing.png",
            links: [
                { type: "facebook", url: "https://web.facebook.com/aboelfadl.clothing/", icon: "fab fa-facebook-f", label: "Facebook" },
                { type: "instagram", url: "https://www.instagram.com/aboelfadl.clothing/", icon: "fab fa-instagram", label: "Instagram" },
                { type: "website", url: "https://cezma.com/store/aboelfadl.clothing", icon: "fas fa-tshirt", label: "Store" },
                { type: "whatsapp", url: "https://wa.me/201112041298", icon: "fab fa-whatsapp", label: "WhatsApp" }
            ]
        },
        egypt: {
            title: "Accessories Egypt",
            desc: "كل ما يخص إكسسوارات الموبايل والتقنية.",
            img: "icon/Egypt.png",
            links: [
                { type: "facebook", url: "https://web.facebook.com/Accessories.Egypt.official/", icon: "fab fa-facebook-f", label: "Facebook" },
                { type: "instagram", url: "https://www.instagram.com/Accessories.Egypt.official/", icon: "fab fa-instagram", label: "Instagram" },
                { type: "website", url: "https://cezma.com/store/Accessories.Egypt.official", icon: "fas fa-shopping-bag", label: "Store" },
                { type: "whatsapp", url: "https://wa.me/201061809351", icon: "fab fa-whatsapp", label: "WhatsApp" }
            ]
        },
        brando: {
            title: "Brando",
            desc: "براند عصري بلمسة شبابية.",
            img: "icon/Brando.png",
            links: [
                { type: "facebook", url: "https://www.facebook.com/share/17ByAh9Emc/", icon: "fab fa-facebook-f", label: "Facebook" },
                { type: "instagram", url: "https://www.instagram.com/br.ando6296", icon: "fab fa-instagram", label: "Instagram" },
                { type: "tiktok", url: "https://tiktok.com/@br.ando6296", icon: "fab fa-tiktok", label: "TikTok" },
                { type: "website", url: "https://bra-ndo.netlify.app/", icon: "fas fa-globe", label: "Website" },
                { type: "whatsapp", url: "https://wa.me/201205420752", icon: "fab fa-whatsapp", label: "WhatsApp" }
            ]
        }
    },

    // دالة فتح النافذة
    openModal: (key) => {
        const modal = document.getElementById('venture-modal');
        const project = VenturesSystem.data[key];
        
        if (!project || !modal) return;

        // تعبئة البيانات
        document.getElementById('vm-title').innerText = project.title;
        document.getElementById('vm-desc').innerText = project.desc;
        document.getElementById('vm-img').src = project.img;

        // توليد الروابط
        const linksContainer = document.getElementById('vm-links');
        linksContainer.innerHTML = ''; // مسح القديم

        project.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = `modal-link-btn ${link.type}`;
            a.target = "_blank";
            a.innerHTML = `<i class="${link.icon}"></i> ${link.label}`;
            linksContainer.appendChild(a);
        });

        // إظهار النافذة
        modal.classList.add('active');
    },

    // دالة غلق النافذة
    closeModal: () => {
        const modal = document.getElementById('venture-modal');
        if (modal) modal.classList.remove('active');
    }
};

// إغلاق النافذة عند الضغط على زر ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') VenturesSystem.closeModal();
});

const chatToggle = document.getElementById("chatToggle");
const chatFab = document.getElementById("chatFab");

chatToggle.addEventListener("click", () => {
  chatFab.classList.toggle("active");
});

/* END OF SCRIPT
   Designed and Developed by Mahmoud Ibrahim
   (AboElfadl Media)
*/

