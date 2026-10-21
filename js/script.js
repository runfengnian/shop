document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 移动端菜单切换 ---------- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (mobileMenuBtn && navWrapper) {
        mobileMenuBtn.addEventListener('click', function () {
            navWrapper.classList.toggle('active');
            // 图标在叉号和汉堡之间切换
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    /* ---------- 平滑滚动（仅对页内 # 锚点生效） ---------- */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // 点击后自动收起移动端菜单
                if (navWrapper) navWrapper.classList.remove('active');

                // 计算顶部导航高度，避免遮挡标题
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 10,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------- 表单提交处理 ---------- */
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('感谢您的咨询！我们会尽快与您联系。');
            inquiryForm.reset();
        });
    }

    /* ---------- 滚动时加深顶部阴影 ---------- */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
            } else {
                header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }
        });
    }


    /* ---------- 二维码弹窗逻辑 ---------- */
    const qrcodeTrigger = document.querySelector('.qrcode-trigger');
    const qrcodeModal = document.getElementById('qrcodeModal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (qrcodeTrigger && qrcodeModal && closeModalBtn) {
        // 点击图标打开弹窗
        qrcodeTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            qrcodeModal.classList.add('show');
        });

        // 点击 X 关闭弹窗
        closeModalBtn.addEventListener('click', function () {
            qrcodeModal.classList.remove('show');
        });

        // 点击黑色半透明背景也能关闭
        qrcodeModal.addEventListener('click', function (e) {
            if (e.target === qrcodeModal) {
                qrcodeModal.classList.remove('show');
            }
        });
    }

    /* ---------- 产品轮播图逻辑 ---------- */
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carouselTrack && carouselSlides.length > 0) {
        let currentIndex = 0;

        // 1. 根据幻灯片数量自动生成底部圆点
        carouselSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active'); // 默认第一个加粗
            // 点击圆点直接跳转
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(document.querySelectorAll('.carousel-dot'));

        // 2. 核心切换函数
        function goToSlide(index) {
            currentIndex = index;
            // 移动轨道
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            // 更新圆点状态
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        // 3. 下一组按钮
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselSlides.length;
            goToSlide(currentIndex);
        });

        // 4. 上一组按钮
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
            goToSlide(currentIndex);
        });
    }


});