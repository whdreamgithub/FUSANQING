/**
 * FUSANQING CO., LTD Website Scripts
 * 
 * 包含网站所有交互功能的JavaScript代码
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    initSlider();
    initMobileMenu();
    initFaqToggle();
    initContactForm();
    initScrollEffects();
});

/**
 * 轮播图功能
 */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片并移除所有点的激活状态
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 显示当前幻灯片和点
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        // 更新当前幻灯片索引
        currentSlide = index;
    }
    
    // 显示下一张幻灯片
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slideCount) nextIndex = 0;
        showSlide(nextIndex);
    }
    
    // 显示上一张幻灯片
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = slideCount - 1;
        showSlide(prevIndex);
    }
    
    // 开始自动播放
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // 停止自动播放
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // 按钮事件监听
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlideInterval();
            nextSlide();
            startSlideInterval();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlideInterval();
            prevSlide();
            startSlideInterval();
        });
    }
    
    // 点击小圆点切换幻灯片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideInterval();
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // 鼠标悬停时暂停自动播放
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', stopSlideInterval);
        slide.addEventListener('mouseleave', startSlideInterval);
    });
    
    // 显示第一张幻灯片并开始自动播放
    showSlide(0);
    startSlideInterval();
}

/**
 * 移动端菜单切换功能
 */
function initMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // 创建移动端菜单按钮
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    header.querySelector('.container').appendChild(mobileMenuBtn);
    
    const nav = document.querySelector('nav');
    
    // 创建关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '1rem';
    closeBtn.style.right = '1rem';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.display = 'none';
    nav.appendChild(closeBtn);
    
    // 菜单切换
    function toggleMenu() {
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (nav.classList.contains('active')) {
            closeBtn.style.display = 'block';
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            closeBtn.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    
    // 点击导航链接时关闭菜单
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // 添加媒体查询监听，在切换到桌面视图时重置菜单状态
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    mediaQuery.addEventListener('change', e => {
        if (e.matches && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // 添加菜单打开时的样式
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
        
        @media screen and (max-width: 768px) {
            .close-btn {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * FAQ 切换功能
 */
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            // 切换当前FAQ项的展开/收起状态
            item.classList.toggle('active');
            
            // 更新切换图标
            const toggleIcon = question.querySelector('.toggle-icon i');
            if (toggleIcon) {
                if (item.classList.contains('active')) {
                    toggleIcon.className = 'fas fa-minus';
                } else {
                    toggleIcon.className = 'fas fa-plus';
                }
            }
        });
    });
}

/**
 * 联系表单验证
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单字段
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // 验证必填字段
        if (!name.value.trim()) {
            showError(name, '请输入您的姓名');
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            showError(email, '请输入您的邮箱');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (!subject.value.trim()) {
            showError(subject, '请输入主题');
            isValid = false;
        } else {
            removeError(subject);
        }
        
        if (!message.value.trim()) {
            showError(message, '请输入您的留言内容');
            isValid = false;
        } else {
            removeError(message);
        }
        
        // 如果表单有效，显示成功消息
        if (isValid) {
            // 这里可以添加AJAX提交表单的代码
            // 为了演示，我们只显示成功消息
            
            const formContainer = contactForm.closest('.form-container');
            
            // 创建成功消息
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>消息已发送!</h3>
                <p>谢谢您的留言。我们的团队将尽快与您联系。</p>
                <button class="btn">返回</button>
            `;
            
            // 添加样式
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '2rem';
            
            // 隐藏表单并显示成功消息
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // 添加返回按钮点击事件
            const backBtn = successMessage.querySelector('button');
            backBtn.addEventListener('click', () => {
                // 重置表单
                contactForm.reset();
                
                // 显示表单，移除成功消息
                contactForm.style.display = 'grid';
                formContainer.removeChild(successMessage);
            });
        }
    });
    
    // 显示错误信息
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorMessage.className = 'error-message';
            errorMessage.style.color = '#e74c3c';
            errorMessage.style.fontSize = '0.85rem';
            errorMessage.style.marginTop = '0.25rem';
            formGroup.appendChild(errorMessage);
        }
        
        input.style.borderColor = '#e74c3c';
        errorMessage.textContent = message;
    }
    
    // 移除错误信息
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        input.style.borderColor = '';
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
    }
    
    // 验证邮箱格式
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

/**
 * 滚动效果
 */
function initScrollEffects() {
    // 滚动时显示/隐藏返回顶部按钮
    const scrollThreshold = 300;
    let backToTopBtn;
    
    function createBackToTopButton() {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '2rem';
        backToTopBtn.style.right = '2rem';
        backToTopBtn.style.width = '45px';
        backToTopBtn.style.height = '45px';
        backToTopBtn.style.borderRadius = '50%';
        backToTopBtn.style.backgroundColor = 'var(--primary-color)';
        backToTopBtn.style.color = 'var(--light-text)';
        backToTopBtn.style.border = 'none';
        backToTopBtn.style.boxShadow = 'var(--box-shadow)';
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.style.display = 'none';
        backToTopBtn.style.zIndex = '99';
        backToTopBtn.style.fontSize = '1rem';
        backToTopBtn.style.transition = 'var(--transition)';
        
        document.body.appendChild(backToTopBtn);
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createBackToTopButton();
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80, // 考虑固定导航的高度
                    behavior: 'smooth'
                });
            }
        });
    });
} 