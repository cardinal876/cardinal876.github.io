function setupSandwichMenu(){
/** sandwich menu **/
              const menuButton = document.getElementById("menuToggle");
    const menuDropdown = document.getElementById("menuDropdown");

    menuButton.addEventListener("click", () => {
      menuDropdown.style.display = 
        menuDropdown.style.display === "flex" ? "none" : "flex";
    });

    // Optional: close menu if clicking outside
    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.style.display = "none";
      }
    });
              
              
      }