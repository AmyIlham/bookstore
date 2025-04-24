let isLogin = true;
function openPopup(type) {
    isLogin = (type === 'login');
    document.getElementById("form-title").textContent = isLogin ? "Login" : "Sign Up";
    document.getElementById("email").style.display = isLogin ? "none" : "block";
    document.getElementById("submit-btn").textContent = isLogin ? "Login" : "Sign Up";
    document.querySelector(".switch-btn").textContent = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
    
    // Update welcome messages
    document.getElementById("welcome-title").textContent = isLogin ? "Welcome back!" : "Welcome to our bookstore";
    document.getElementById("welcome-text").textContent = isLogin ? 
        "We're glad to see you again. Login to access your account." : 
        "Join our community of book lovers and discover amazing stories.";
        
    document.getElementById("popup").classList.add("active");
}
function closePopup() {
    document.getElementById("popup").classList.remove("active");
}
function switchForm() {
    openPopup(isLogin ? 'signup' : 'login');
}
function toggleMenu() {
    const menuList = document.getElementById("list");
    menuList.classList.toggle("active");
    
    // Toggle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const books = document.querySelectorAll('.book');
    const dots = document.querySelectorAll('.book-dot');
    let currentBook = 0;
    let bookInterval;

    function showBook(index) {
        // Remove all classes first
        books.forEach(book => {
            book.classList.remove('active', 'right', 'left', 'visible');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        currentBook = (index + books.length) % books.length;
        const prevBook = ((currentBook - 1) + books.length) % books.length;
        const nextBook = (currentBook + 1) % books.length;

        // Set current book
        books[currentBook].classList.add('visible', 'active');
        dots[currentBook].classList.add('active');

        // Set next book to the right
        books[nextBook].classList.add('visible', 'right');

        // Set previous book to the left
        books[prevBook].classList.add('visible', 'left');
    }

    function nextBook() {
        showBook(currentBook + 1);
    }

    function startBookShow() {
        bookInterval = setInterval(nextBook, 5000);
    }

    function stopBookShow() {
        clearInterval(bookInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopBookShow();
            showBook(index);
            startBookShow();
        });
    });

    const gallery = document.querySelector('.book-gallery');
    gallery.addEventListener('mouseenter', stopBookShow);
    gallery.addEventListener('mouseleave', startBookShow);

    // Initialize with first book
    showBook(0);
    startBookShow();
});