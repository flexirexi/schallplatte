document.addEventListener("DOMContentLoaded", () => {
    
});

export function collapseNavBar() {
    if (window.innerWidth <= 768) {
        const navbar = document.getElementById("navbarNav");
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbar);
        bsCollapse.hide();
    }
}