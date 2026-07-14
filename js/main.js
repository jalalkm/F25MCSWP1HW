//By jalal_434823 & Hiba_450807 & Hussain_442221 & shaza_454550 

// =============================================
// 1. فلترة الفعاليات   
// =============================================
function filterEvents() {
    const filterValue = document.getElementById('filterCategory')?.value || 'all';
    const cards = document.querySelectorAll('.event-card');
        cards.forEach(card => {
            const badge = card.querySelector('.badge');
    if (!badge) return;
    const category = badge.textContent.trim();
    if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
    }
    });
}

// ربط الفلترة إذا وجد العنصر
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('filterCategory');
    if (filterSelect) {
    filterSelect.addEventListener('change', filterEvents);
    }
});

// =============================================
// 2. التحقق من نموذج "اتصل بنا" مع رسائل Bootstrap Alert
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('contactMessage')?.value.trim();
            const alertContainer = document.getElementById('formAlert');

            // تحقق من الحقول المطلوبة
            if (!name || !email || !message) {
                showAlert('danger', 'الرجاء ملء جميع الحقول المطلوبة.', alertContainer);
                return;
            }
            
            // تحقق من صيغة البريد
            if (!isValidEmail(email)) {
                showAlert('danger', 'يرجى إدخال بريد إلكتروني صحيح.', alertContainer);
                return;
            }
            
            // نجاح
            showAlert('success', '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.', alertContainer);
            contactForm.reset();
        });
    }
});

// دالة مساعدة للتحقق من البريد الإلكتروني
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// دالة عرض التنبيهات (مصححة)
function showAlert(type, message, container) {
    if (!container) {
        console.error('حاوية التنبيه غير موجودة');
        return;
    }
    
    // تحديد كلاس التنبيه
    const alertClasses = type === 'success' ? 'alert-success' : 'alert-danger';
    
    // إنشاء التنبيه
    container.innerHTML = `
        <div class="alert ${alertClasses} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // إخفاء التنبيه تلقائياً بعد 5 ثواني
    setTimeout(() => {
        const alertEl = container.querySelector('.alert');
        if (alertEl) {
            alertEl.remove();
        }
    }, 5000);
}

// =============================================
// 3. Scroll-to-top 
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
        } else {
        scrollBtn.style.display = 'none';
        }
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    }
});

// =============================================
// 4. تفعيل وضع الدارك مود
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    
    // التحقق من التفضيل المخزن
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (toggleDarkMode) toggleDarkMode.checked = true;
    }
    
    // عند تغيير حالة التبديل
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});

// =============================================
// 5. حفظ تفضيلات التصنيف في localStorage 
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('filterCategory');
    if (filterSelect) {
    const saved = localStorage.getItem('preferredCategory');
    if (saved) filterSelect.value = saved;
    filterSelect.addEventListener('change', function() {
        localStorage.setItem('preferredCategory', this.value);
    });
    }
});

// =============================================

// للاستخدام في صفحة التفاصيل
function showCalendarAlert() {
    alert('✅ تم إضافة الفعالية إلى تقويمك!');
}

function showShareAlert() {
    alert('📤 تم نسخ رابط الفعالية! يمكنك مشاركته الآن.');
}

// =============================================
// 6. حفظ تفضيلات التصنيف في localStorage 
// =============================================
       // عند تحميل الصفحة، تحقق من وجود # في الرابط
        window.onload = function() {
            // إذا كان هناك معرف في الرابط (مثل #event-2)
            if (window.location.hash) {
                // إخفاء الرسالة الترحيبية
                const welcome = document.querySelector('.welcome-message');
                if (welcome) {
                    welcome.style.display = 'none';
                }
                
                // جلب معرف الفعالية من الرابط
                const eventId = window.location.hash; // مثلاً "#event-2"
                
                // البحث عن القسم المناسب وإظهاره
                const targetSection = document.querySelector(eventId);
                if (targetSection) {
                    // إخفاء جميع الأقسام أولاً
                    document.querySelectorAll('.event-section').forEach(section => {
                        section.style.display = 'none';
                    });
                    // إظهار القسم المطلوب
                    targetSection.style.display = 'block';
                }
            }
        };

        // في حال تغيير الرابط يدوياً
        window.addEventListener('hashchange', function() {
            // إعادة تحميل الصفحة عند تغيير الـ hash
            // أو يمكن تنفيذ نفس الكود أعلاه
            location.reload();
        });

