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

});