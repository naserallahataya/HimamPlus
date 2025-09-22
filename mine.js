// Initialize data in localStorage if not exists
function initializeData() {
    if (!localStorage.getItem('companies')) {
        localStorage.setItem('companies', JSON.stringify([
            {
                id: 1,
                name: 'شركة التقنية المتطورة',
                field: 'تكنولوجيا المعلومات',
                description: 'رائدة في حلول البرمجيات المخصصة',
                contact: 'info@tech.com',
                logo: 'company1-logo.png'
            },
            {
                id: 2,
                name: 'الطاقة الخضراء',
                field: 'الطاقة المتجددة',
                description: 'متخصصون في حلول الطاقة المستدامة',
                contact: 'contact@greenenergy.com',
                logo: 'company2-logo.png'
            }
        ]));
    }

    if (!localStorage.getItem('jobs')) {
        localStorage.setItem('jobs', JSON.stringify([
            {
                id: 1,
                title: 'مطور ويب',
                company: 'شركة التقنية المتطورة',
                location: 'الرياض',
                type: 'دوام كامل',
                description: 'نبحث عن مطور ويب مبدع للانضمام إلى فريقنا'
            },
            {
                id: 2,
                title: 'مصمم جرافيك',
                company: 'الطاقة الخضراء',
                location: 'جدة',
                type: 'دوام جزئي',
                description: 'نبحث عن مصمم جرافيك مبدع لتصميم المواد التسويقية'
            }
        ]));
    }
}

// Show specific page and hide others
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    document.getElementById(pageId).style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load data for the page
    loadPageData(pageId);
}

// Load data for the current page
function loadPageData(pageId) {
    switch(pageId) {
        case 'companies':
            loadCompanies();
            break;
        case 'students':
            loadStudents();
            break;
        case 'special-students':
            loadSpecialStudents();
            break;
        case 'jobs':
            loadJobs();
            break;
    }
}

// Load companies
function loadCompanies() {
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const container = document.getElementById('companiesList');
    container.innerHTML = '';
    
    companies.forEach(company => {
        container.innerHTML += `
            <div class="card" onclick="showDetails('company', ${company.id})">
                <div class="card-header">
                    <div class="card-icon">🏢</div>
                    <div>
                        <h3>${company.name}</h3>
                        <span class="tag">${company.field}</span>
                    </div>
                </div>
                <p>${company.description}</p>
                <div class="card-footer">
                    <span>${company.contact}</span>
                    <button class="btn" onclick="event.stopPropagation(); deleteItem('company', ${company.id})">حذف</button>
                </div>
            </div>
        `;
    });
}

// Load jobs
function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const container = document.getElementById('jobsList');
    container.innerHTML = '';
    
    jobs.forEach(job => {
        container.innerHTML += `
            <div class="card" onclick="showDetails('job', ${job.id})">
                <div class="card-header">
                    <div class="card-icon">💼</div>
                    <div>
                        <h3>${job.title}</h3>
                        <span class="tag">${job.company}</span>
                    </div>
                </div>
                <p>${job.description}</p>
                <div class="card-footer">
                    <span>${job.location} • ${job.type}</span>
                    <button class="btn" onclick="event.stopPropagation(); deleteItem('job', ${job.id})">حذف</button>
                </div>
            </div>
        `;
    });
}

// Show add form
function showAddForm(type) {
    let formHTML = '';
    const formId = `add${type.charAt(0).toUpperCase() + type.slice(1)}Form`;
    
    switch(type) {
        case 'company':
            formHTML = `
                <h3>إضافة شركة جديدة</h3>
                <form id="${formId}" onsubmit="saveItem('company'); return false;">
                    <div class="form-group">
                        <label>اسم الشركة</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>مجال العمل</label>
                        <input type="text" name="field" required>
                    </div>
                    <div class="form-group">
                        <label>الوصف</label>
                        <textarea name="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>معلومات الاتصال</label>
                        <input type="text" name="contact" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                        <button type="submit" class="btn btn-primary">حفظ</button>
                    </div>
                </form>
            `;
            break;
        case 'job':
            formHTML = `
                <h3>إضافة وظيفة جديدة</h3>
                <form id="${formId}" onsubmit="saveItem('job'); return false;">
                    <div class="form-group">
                        <label>المسمى الوظيفي</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group">
                        <label>الشركة</label>
                        <input type="text" name="company" required>
                    </div>
                    <div class="form-group">
                        <label>الموقع</label>
                        <input type="text" name="location" required>
                    </div>
                    <div class="form-group">
                        <label>نوع الوظيفة</label>
                        <select name="type" required>
                            <option value="دوام كامل">دوام كامل</option>
                            <option value="دوام جزئي">دوام جزئي</option>
                            <option value="عن بعد">عن بعد</option>
                            <option value="تدريب">تدريب</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>الوصف</label>
                        <textarea name="description" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                        <button type="submit" class="btn btn-primary">حفظ</button>
                    </div>
                </form>
            `;
            break;
        // Add cases for student and special-student forms
    }
    
    document.getElementById('formContainer').innerHTML = formHTML;
    document.getElementById('formModal').style.display = 'block';
}

// Save item to localStorage
function saveItem(type) {
    const form = document.querySelector('#formContainer form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    let items = JSON.parse(localStorage.getItem(type + 's') || '[]');
    data.id = Date.now(); // Generate unique ID
    items.push(data);
    localStorage.setItem(type + 's', JSON.stringify(items));
    
    closeModal();
    loadPageData(type + 's');
    alert('تم الحفظ بنجاح');
}

// Delete item
function deleteItem(type, id) {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
        let items = JSON.parse(localStorage.getItem(type + 's') || '[]');
        items = items.filter(item => item.id !== id);
        localStorage.setItem(type + 's', JSON.stringify(items));
        loadPageData(type + 's');
    }
}

// Show item details
function showDetails(type, id) {
    // Implement details view
    alert('عرض التفاصيل: ' + type + ' #' + id);
}

// Close modal
function closeModal() {
    document.getElementById('formModal').style.display = 'none';
}

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// Handle contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    
    // Basic form validation
    if (!formValues.name || !formValues.email || !formValues.subject || !formValues.message) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
        alert('الرجاء إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formValues);
    
    // Show success message
    alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
    
    // Reset form
    form.reset();
}

// Open map in new tab
function openMap() {
    // Replace with your actual location coordinates
    const latitude = 24.7136;
    const longitude = 46.6753;
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    showPage('home');
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('formModal');
        if (event.target == modal) {
            closeModal();
        }
    };
    
    // Initialize contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
});
// Add this script before the closing </body> tag
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('roleSearch');
    const teamCards = document.querySelectorAll('.team-card');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        teamCards.forEach(card => {
            const role = card.querySelector('.member-role').textContent.toLowerCase();
            if (role.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});