    

function addFieldsListLinks(){
    
  const fields2 = document.querySelectorAll(".field-link");

  fields2.forEach(field => {
      
    const fieldValue = field.textContent.trim();                // text inside the div
    const base = `searchresults.html`;         // base URL
    const url = `${base}?field=${encodeURIComponent(fieldValue)}`;

    // Replace the div's content with a link
    field.innerHTML = `<a href="${url}" class="field-link-class" >${fieldValue}</a>`;
    
    console.log(url)
    
  });

  
}

function addFieldsPopup(){
     const fieldBtn = document.querySelector('[data-menu="4"]');
  if (fieldBtn) createPopup(fieldBtn, "dropdown-4", "right");

  // ---- New Button (Left Popup) ----
  const moreBtn = document.querySelector(".fields-more");
  if (moreBtn) createPopup(moreBtn, "dropdown-more", "left");

  // ---- Core Popup Creation Function ----
  function createPopup(triggerBtn, popupId, side = "right") {
    const popup = document.createElement("div");
    popup.id = popupId;
    popup.className = "dropdown";
    Object.assign(popup.style, {
      padding: "0.75rem",
      position: "absolute",
      display: "none",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: "2000",
    });

    popup.innerHTML = `
      <input
        type="text"
        placeholder="Type field name..."
        style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:6px;"
      />
      <div class="fieldSuggestions" style="
        border:1px solid #eee;
        border-radius:6px;
        margin-top:0.5rem;
        max-height:120px;
        overflow-y:auto;
        display:none;
      "></div>
      <div style="margin-top:0.75rem;text-align:right;">
        <button class="fieldEnter" style="
          display:none;
          background:#007bff;
          color:white;
          border:none;
          padding:0.4rem 0.8rem;
          border-radius:6px;
          cursor:pointer;
          margin-right:0.5rem;
        ">Enter</button>
        <button class="fieldClear" style="
          display:none;
          background:#eee;
          border:none;
          padding:0.4rem 0.8rem;
          border-radius:6px;
          cursor:pointer;
        ">Clear</button>
      </div>
    `;
    document.body.appendChild(popup);

    const input = popup.querySelector("input");
    const suggestions = popup.querySelector(".fieldSuggestions");

    const fields = typeof departments !== "undefined" ? [...departments] : [];

function positionPopup() {
  const rect = triggerBtn.getBoundingClientRect();
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Desired positions
  let top = rect.top; // same vertical offset
  let left =
    side === "right"
      ? rect.left + scrollX + 50
      : rect.left + scrollX - popup.offsetWidth ;

  // --- Edge detection: horizontal ---
  if (left < 0) left = 0; // don't go past left edge
  if (left + popup.offsetWidth > window.innerWidth + scrollX) {
    left = window.innerWidth + scrollX - popup.offsetWidth; // don't go past right edge
  }

  // --- Edge detection: vertical ---
  if (top < 0) top = 0; // don't go past top
  if (top + popup.offsetHeight > window.innerHeight + scrollY) {
    top = window.innerHeight + scrollY - popup.offsetHeight; // don't go past bottom
  }

  popup.style.top = top + "px";
  popup.style.left = left + "px";
}


    // --- Show suggestions ---
    function showSuggestions(list) {
      suggestions.innerHTML = list
        .map(a => `<a href="searchresults.html?field=${encodeURIComponent(a)}" class="field-link-class"><div style="padding:0.4rem;cursor:pointer;">${a}</div></a>`)
        .join("");
      suggestions.style.display = "block";
  /*    suggestions.querySelectorAll("div").forEach(div => {
        div.addEventListener("click", () => {
          input.value = div.textContent;
          suggestions.style.display = "none";
        });
      }); */
    }

    // --- Button click handler ---
    triggerBtn.addEventListener("click", e => {
      e.stopPropagation();
      const visible = popup.style.display === "block";
      document.querySelectorAll(".dropdown").forEach(d => (d.style.display = "none"));
      if (!visible) {
        popup.style.display = "block";
        positionPopup();
        input.focus();
        showSuggestions(fields);
      } else {
        popup.style.display = "none";
      }
    });

    // --- Input filter ---
    input.addEventListener("input", () => {
      const val = input.value.toLowerCase();
      const matches = fields.filter(a => a.toLowerCase().includes(val)).slice(0, 10);
      showSuggestions(matches.length ? matches : fields.slice(0, 10));
    });

    // --- Close on outside click ---
    document.addEventListener(
      "click",
      e => {
        if (!popup.contains(e.target) && !triggerBtn.contains(e.target)) {
          if (popup.style.display === "block") popup.style.display = "none";
        }
      },
      true
    );

    // --- Update on scroll/resize ---
    window.addEventListener("scroll", () => {
      if (popup.style.display === "block") positionPopup();
    });
    window.addEventListener("resize", () => {
      if (popup.style.display === "block") positionPopup();
    });
  } 
}

   
    