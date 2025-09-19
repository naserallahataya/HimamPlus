// Initialize data in localStorage if not exists
function initializeData() {
    // Initialize users array if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Initialize current user session if not exists
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
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

// Show login/register or profile based on authentication status
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // User is logged in
        authButtons.style.display = 'none';
        userProfile.style.display = 'block';
        
        // Update user info in the profile
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const menuAvatar = document.getElementById('menuAvatar');
        const menuUserName = document.getElementById('menuUserName');
        const menuUserEmail = document.getElementById('menuUserEmail');
        const userTypeBadge = document.getElementById('userTypeBadge');
        
        // Set user initials for avatar
        const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        
        // Update UI elements
        userName.textContent = currentUser.name.split(' ')[0]; // Show only first name in the navbar
        userAvatar.textContent = initials;
        menuAvatar.textContent = initials;
        menuUserName.textContent = currentUser.name;
        menuUserEmail.textContent = currentUser.email;
        
        // Format and show user type
        const userTypeMap = {
            'company': 'Company',
            'student': 'Regular Student',
            'special-student': 'Person of Determination'
        };
        userTypeBadge.textContent = userTypeMap[currentUser.type] || currentUser.type;
        
        // Add user type specific styling
        userTypeBadge.className = 'user-type-badge';
        if (currentUser.type === 'company') {
            userTypeBadge.style.background = 'rgba(74, 108, 247, 0.1)';
            userTypeBadge.style.color = '#4a6cf7';
        } else if (currentUser.type === 'special-student') {
            userTypeBadge.style.background = 'rgba(72, 187, 120, 0.1)';
            userTypeBadge.style.color = '#48bb78';
        } else {
            userTypeBadge.style.background = 'rgba(159, 122, 234, 0.1)';
            userTypeBadge.style.color = '#9f7aea';
        }
        
        // Update profile link
        const profileLink = document.getElementById('profileLink');
        profileLink.setAttribute('onclick', `event.preventDefault(); showProfilePage('${currentUser.type}')`);
    } else {
        // User is not logged in
        authButtons.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

// Toggle user menu with animation
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (userMenu.classList.contains('active')) {
        userMenu.style.opacity = '0';
        userMenu.style.transform = 'translateY(-10px)';
        dropdownArrow.style.transform = 'rotate(0deg)';
        
        // Wait for the animation to complete before hiding
        setTimeout(() => {
            userMenu.classList.remove('active');
        }, 200);
    } else {
        userMenu.style.display = 'block';
        // Force reflow to enable transition
        void userMenu.offsetWidth;
        userMenu.classList.add('active');
        userMenu.style.opacity = '1';
        userMenu.style.transform = 'translateY(0)';
        dropdownArrow.style.transform = 'rotate(180deg)';
    }
}

// Close user menu when clicking outside
document.addEventListener('click', function(event) {
    const userProfile = document.getElementById('userProfile');
    const userMenu = document.getElementById('userMenu');
    const isClickInside = userProfile.contains(event.target);
    
    if (!isClickInside && userMenu && userMenu.classList.contains('active')) {
        toggleUserMenu();
    }
});

// Handle user registration
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const userType = document.getElementById('userType').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('User with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // In a real app, hash the password
        type: userType,
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser; // Remove password from session
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    // Close modal and update UI
    closeAuthModal();
    updateAuthUI();
    
    // Redirect to the appropriate page based on user type
    showUserDashboard(userType);
}

// Handle user login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Log the user in
        const { password: _, ...userWithoutPassword } = user; // Remove password from session
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        // Close modal and update UI
        closeAuthModal();
        updateAuthUI();
        
        // Redirect to the appropriate page based on user type
        showUserDashboard(user.type);
    } else {
        alert('Invalid email or password');
    }
}

// Logout user
function logout() {
    console.log('Logging out...');
    // Close the user menu if it's open
    const userMenu = document.getElementById('userMenu');
    if (userMenu && userMenu.classList.contains('active')) {
        toggleUserMenu();
    }
    
    // Clear user data
    localStorage.removeItem('currentUser');
    
    // Update UI to show login/register buttons
    updateAuthUI();
    
    // Redirect to home page
    showPage('home');
    
    // Show a brief message to the user
    setTimeout(() => {
        alert('You have been successfully logged out.');
    }, 100);
    
    // Prevent any default behavior
    return false;
}

// Show user dashboard based on user type
function showUserDashboard(userType) {
    switch(userType) {
        case 'company':
            showPage('companies');
            break;
        case 'student':
            showPage('students');
            break;
        case 'special-student':
            showPage('special-students');
            break;
        default:
            showPage('home');
    }
}

// Show profile page based on user type
function showProfilePage(userType) {
    // In a real app, you would show the user's profile
    // For now, just show a simple alert
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    alert(`Welcome to your profile, ${currentUser.name}!\nAccount Type: ${userType}`);
}

// Show auth modal with login or register form
function showAuthModal(formType) {
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    showAuthForm(formType);
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
}

// Toggle between login and register forms
function showAuthForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Toggle user menu in mobile view
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
    
    const formModal = document.getElementById('formModal');
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateAuthUI();
    showPage('home');
    
    // Close user menu when clicking outside
    document.addEventListener('click', function(event) {
        const userProfile = document.getElementById('userProfile');
        const userMenu = document.getElementById('userMenu');
        const isClickInside = userProfile && userProfile.contains(event.target);
        
        if (!isClickInside && userMenu && userMenu.classList.contains('active')) {
            toggleUserMenu();
        }
    });
    
    // Initialize contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
});
