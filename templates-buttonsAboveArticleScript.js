  
  
  function setupButtonsAboveArticle(){
  
  
    /** buttons above article **/
const buttons = document.querySelectorAll(".menu-btn-article");
let openMenu = null;

buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    const menu = document.getElementById("dropdown-" + btn.dataset.menu);
    const rect = btn.getBoundingClientRect();

    // Close previously open dropdown
    if (openMenu && openMenu !== menu) openMenu.style.display = "none";

    // Toggle dropdown
    if (menu.style.display === "block") {
      menu.style.display = "none";
      openMenu = null;
      return;
    }

    menu.style.display = "block";
    menu.style.top = rect.bottom + "px";

    const menuWidth = menu.offsetWidth;
    const viewportWidth = window.innerWidth;

    let leftPos = rect.left;
    if (rect.left + menuWidth > viewportWidth) leftPos = viewportWidth - menuWidth;
    if (leftPos < 0) leftPos = 0;
    menu.style.left = leftPos + "px";

    // Skip selection/clear logic for Share menu

        if (btn.dataset.menu !== "1" && btn.dataset.menu !== "2") {
      // Add "Clear" option if already selected
      if (btn.dataset.selected === "true") {
        if (!menu.querySelector(".clear-option")) {
          const clearDiv = document.createElement("div");
          clearDiv.textContent = "Clear";
          clearDiv.classList.add("clear-option");
          clearDiv.style.color = ""; // gray
          menu.prepend(clearDiv);

          clearDiv.addEventListener("click", () => {
            btn.style.color = "lightgray";
            btn.dataset.selected = "false";
            clearDiv.remove();
            menu.style.display = "none";
            
          if (  btn.dataset.menu === "3"){
              const oneRem = parseFloat(getComputedStyle(document.documentElement).fontSize);
              
              document.querySelector(".article").style.fontSize =
            oneRem +"px"
        
          }
          
          if (btn.dataset.menu === "4") { // Font menu
    const article = document.querySelector(".article");

    // Reset to default font
    article.style.fontFamily = ""; // empty string removes inline style
}
      if (btn.dataset.menu === "5") { // Font menu
    const article = document.querySelector(".article");

    // Reset to default font
    article.style.lineHeight = ""; // empty string removes inline style
}

            
          });
        }
      }

      // Attach click handler to options
      menu.querySelectorAll("div").forEach(option => {
        if (!option.classList.contains("clear-option")) {
     /*     option.onclick = () => {
            btn.style.color = "black";
            btn.dataset.selected = "true";
            menu.style.display = "none";
          };
    */      
          
          option.onclick = () => {
    btn.style.color = "black";
    btn.dataset.selected = "true";
    menu.style.display = "none";

    // --- FONT SIZE LOGIC FOR "Size" (menu 3) ---
    if (btn.dataset.menu === "3") {
        const article = document.querySelector(".article"); // whatever contains your text
        
        const oneRem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        

        if (option.textContent.trim() === "Small") {
            article.style.fontSize =
            oneRem -2 +"px"
        
        } else if (option.textContent.trim() === "Medium") {
           article.style.fontSize = "16px";
        } else if (option.textContent.trim() === "Large") {
            article.style.fontSize = oneRem + 2 + "px"
        }
    }
    
    
    // --- FONT FAMILY LOGIC for "Font" (menu 4) ---

if (btn.dataset.menu === "4") {
    const article = document.querySelector(".article");
    const fontName = option.dataset.font; // use data-font attribute
    article.style.fontFamily = `'${fontName}', ${fontName.includes('Sans') ? 'sans-serif' : 'serif'}`;
}

if (btn.dataset.menu === "5") {
        
    const article = document.querySelector(".article");

    let multiplier = option.dataset.height; // use data-font attribute
    multiplier = parseFloat(multiplier);
    


    
   article.style.lineHeight = multiplier;
   
   
   
   
   
}




};

          
          
        }
      });
    } else {
      // For Share, clicking an option just closes the menu
      menu.querySelectorAll("div").forEach(option => {
        option.onclick = () => {
          menu.style.display = "none";
        };
      });
    }

    openMenu = menu;
  });
});

// Close dropdown on click outside
/*document.addEventListener("click", e => {
  if (!e.target.closest(".menu-btn") && !e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
    openMenu = null;
  }
});
*/
document.addEventListener("click", e => {
  const anyOpenDropdown = [...document.querySelectorAll(".dropdown")]
    .some(d => d.style.display === "block");

  if (anyOpenDropdown && !e.target.closest(".menu-btn") && !e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.style.display = "none");
    openMenu = null;

    // Prevent the click **only if we actually closed a menu**
    e.stopPropagation();
    e.preventDefault();
  }
}, true); // capture phase ensures we intercept first






const shareButton = document.getElementById("facebook-button");
  const url = encodeURIComponent(window.location.href); // encode for URL safety
  shareButton.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  
  

  const linkedInButton = document.getElementById("linkedin-button");
  
  linkedInButton.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  
  
  

  const xButton = document.getElementById("x-button");

  // Grab OG title and description
  const ogTitle = document.querySelector('meta[property="og:title"]')?.content || "";
  const ogDesc  = document.querySelector('meta[property="og:description"]')?.content || "";

  // Compose tweet text
  const tweetText = encodeURIComponent(`${ogTitle} - ${ogDesc}`);
  

  xButton.href = `https://twitter.com/intent/tweet?url=${url}&text=${tweetText}`;
  
  
  
  const lastName =   "Copeman";
const firstName= "Sydney Monckton";
const articleYear = "1911";



const title =document.getElementById("title-tag").textContent;

  const url2 = window.location.href; // encode for URL safety

document.getElementById("citation-div").textContent =lastName + ", " + firstName + ". (" + articleYear + "). " + title + ". Rays Book Encyclopedia. " + url2 + "." ;


/*
${lastName}, First Initial(s). (Year). Title of article. Title of Encyclopedia. URL */

}