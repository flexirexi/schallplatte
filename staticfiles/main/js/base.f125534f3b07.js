document.addEventListener("DOMContentLoaded", () => {
    // auto fade-out of message -> because it's cool
    setTimeout(() => {
        const alerts = document.querySelectorAll('.auto-dismiss');
        alerts.forEach((alert) => {
          const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
          bsAlert.close();
        });
      }, 3000); 
});
export function collapseNavBar() {
    if (window.innerWidth <= 768) {
        const navbar = document.getElementById("navbarNav");
        if (!navbar) return;
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbar);
        bsCollapse.hide();
    }
}

