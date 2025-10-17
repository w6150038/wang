// 1. 等待 DOM 完全載入
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 網站載入完成！');
    initializeWebsite();
});

// 2. 初始化所有功能
function initializeWebsite() {
    setupSmoothScroll();      // 平滑滾動
    setupScrollAnimations();  // 滾動動畫
    setupNavbarEffect();      // 導航欄效果
    setupButtonHover();       // 按鈕hover效果
    setupProjectButtons();    // 專案按鈕功能
    setupContactForm();       // 聯絡表單（如果有的話）
}

// ==========================================
// 功能 1: 平滑滾動效果
// ==========================================
function setupSmoothScroll() {
    // 選取所有錨點連結（以 # 開頭的連結）
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 防止預設跳轉行為
            
            // 取得目標區塊
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 計算導航欄高度，避免被遮住
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // 平滑滾動到目標位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 手機版：點擊後收起選單
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ==========================================
// 功能 2: 滾動動畫效果
// ==========================================
function setupScrollAnimations() {
    // 設定觀察器選項
    const observerOptions = {
        threshold: 0.1,           // 當元素 10% 進入視窗時觸發
        rootMargin: '0px 0px -50px 0px'  // 提早 50px 觸發
    };
    
    // 建立 Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素進入視窗，加入 visible 類別
                entry.target.classList.add('visible');
                
                // 可選：只觸發一次動畫
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 觀察所有需要動畫的元素
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ==========================================
// 功能 3: 導航欄滾動效果
// ==========================================
function setupNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滾動超過 50px
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        // 高亮當前區段的導航連結
        highlightActiveNavLink();
        
        lastScrollTop = currentScroll;
    });
}

// ==========================================
// 功能 4: 高亮當前區段
// ==========================================
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // 移除所有 active 類別
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // 如果連結對應當前區段，加入 active
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// 功能 5: 按鈕 Hover 效果增強
// ==========================================
function setupButtonHover() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // 滑鼠移入
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        // 滑鼠移出
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // 點擊效果
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// ==========================================
// 功能 6: 專案按鈕互動
// ==========================================
// ==========================================
// 專案資料庫
// ==========================================
const projectsData = {
    '專案': {
        description: '專案說明',
        tech: '使用技術',
        features: [
            '特色',
            '特色',
            '特色',
            '特色'
        ],
        link: '',
        github: 'https://github.com/username/'
    },
    '餐廳菜單': {
        description: '使用 Grid 佈局、卡片式設計建立的餐廳菜單，並且加入標籤、評分系統、購物車、計數器功能，完成響應式排版。',
        tech: 'HTML5, CSS3, Bootstrap 5, JavaScript',
        features: [
            'Grid 佈局',
            '卡片式設計',
            'Hover 互動效果',
            '標籤和評分系統'
        ],
        link: 'https://w6150038.github.io/wang/profiles/menu/menu.html',
        github: 'https://github.com/w6150038/wang/tree/main/profiles/menu'
    },
    '個人名片': {
        description: '使用 HTML、CSS 和 Bootstrap 建立的個人名片，支援各種裝置瀏覽。採用 Mobile First 設計理念，確保在各種螢幕尺寸都有最佳體驗。',
        tech: 'HTML5, CSS3, Bootstrap 5',
        features: [
            '卡片式設計',
            '大頭貼設計',
            '配色協調',
            '漸層背景',
        ],
        link: 'https://w6150038.github.io/wang/profiles/card/card.html',
        github: 'https://github.com/w6150038/wang/tree/main/profiles/card'
    }
};

// ==========================================
// 專案按鈕互動（最終版本 - 確保關閉按鈕顯示）
// ==========================================
function setupProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-card .btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            const project = projectsData[projectTitle];
            
            if (!project) {
                Swal.fire({
                    title: '錯誤',
                    text: `找不到「${projectTitle}」的資料`,
                    icon: 'error',
                    confirmButtonText: '確定',
                    confirmButtonColor: '#2563eb'
                });
                return;
            }
            
            const featuresList = project.features
                .map(feature => `<li><i class="bi bi-check-circle-fill" style="color: #06d6a0; margin-right: 8px;"></i>${feature}</li>`)
                .join('');
            
            Swal.fire({
                title: `<strong style="color: #2563eb;">${projectTitle}</strong>`,
                html: `
                    <div style="text-align: left; padding: 10px;">
                        <div style="margin-bottom: 20px;">
                            <h5 style="color: #2563eb; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <i class="bi bi-info-circle-fill"></i> 專案說明
                            </h5>
                            <p style="color: #64748b; line-height: 1.8; font-size: 0.95rem;">
                                ${project.description}
                            </p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h5 style="color: #2563eb; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <i class="bi bi-tools"></i> 使用技術
                            </h5>
                            <p style="color: #64748b; background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 0.9rem;">
                                ${project.tech}
                            </p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h5 style="color: #2563eb; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <i class="bi bi-star-fill"></i> 主要特色
                            </h5>
                            <ul style="color: #64748b; padding-left: 20px; list-style: none; line-height: 2;">
                                ${featuresList}
                            </ul>
                        </div>
                        
                        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 25px; flex-wrap: wrap;">
                            <a href="${project.link}" target="_blank" 
                               class="btn btn-primary" 
                               style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
                                <i class="bi bi-box-arrow-up-right"></i> 前往網頁
                            </a>
                            <a href="${project.github}" target="_blank" 
                               class="btn btn-dark" 
                               style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
                                <i class="bi bi-github"></i> GitHub 原始碼
                            </a>
                        </div>
                    </div>
                `,
                width: '650px',
                padding: '30px',
                
                // 確保關閉按鈕顯示
                showCloseButton: true,
                closeButtonHtml: '<span style="font-size: 2em;">&times;</span>',
                
                showConfirmButton: false,
                
                // 允許外部點擊和 ESC 鍵關閉
                allowOutsideClick: true,
                allowEscapeKey: true,
                
                customClass: {
                    popup: 'project-popup-custom',
                    closeButton: 'project-close-btn-custom'
                }
            });
        });
    });
}

// ==========================================
// CSS 動畫定義（如果需要）
// ==========================================
// 這段可以加到 style.css 中，或保留在 JS 中
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* 確保 SweetAlert2 關閉按鈕可見且可點擊 */
    .swal2-close {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        z-index: 10000 !important;
        font-size: 2em !important;
        cursor: pointer !important;
        color: #64748b !important;
        transition: color 0.3s ease !important;
    }
    
    .swal2-close:hover {
        color: #f87171 !important;
    }
    
    /* 確保彈窗容器在最上層 */
    .swal2-container {
        z-index: 9999 !important;
    }
    
    /* 遮罩層設定 */
    .swal2-backdrop-show {
        background: rgba(0, 0, 0, 0.5) !important;
    }
    
    /* 彈窗本體 */
    .project-popup {
        border-radius: 15px !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// 功能 7: 聯絡資訊點擊複製
// ==========================================
function setupContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const textElement = item.querySelector('p');
        if (textElement) {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', function() {
                const text = textElement.textContent;
                
                // 複製到剪貼簿
                navigator.clipboard.writeText(text).then(() => {
                    // 顯示成功訊息
                    Swal.fire({
                        title: '已複製！',
                        text: `${text} 已複製到剪貼簿`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true,
                        position: 'top-end'
                    });
                }).catch(err => {
                    console.error('複製失敗:', err);
                });
            });
        }
    });
}

// ==========================================
// 功能 8: 打字機效果（可選功能）
// ==========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 使用範例（在 DOMContentLoaded 中調用）
// const heroTitle = document.querySelector('.hero-title span');
// if (heroTitle) {
//     typeWriter(heroTitle, '前端開發者', 150);
// }

// ==========================================
// 功能 9: 回到頂部按鈕（額外功能）
// ==========================================
function createBackToTopButton() {
    // 建立按鈕
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // 顯示/隱藏按鈕
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // 點擊回到頂部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover 效果
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
    });
}

// 啟用回到頂部按鈕
    createBackToTopButton();

// ==========================================
// 除錯用：監聽所有錯誤
// ==========================================
window.addEventListener('error', function(e) {
    console.error('❌ 發生錯誤:', e.message);
});

// 開發模式：顯示目前滾動位置（除錯用）
// window.addEventListener('scroll', function() {
//     console.log('滾動位置:', window.pageYOffset);
// });