document.addEventListener("DOMContentLoaded", function () {
  console.log("🟢 Search script loaded.");

  const index = new FlexSearch.Document({
    document: {
      id: "id",
      index: ["title", "content"],
      store: ["id", "title", "content"]
    }
  });

  console.log("🧩 Adding articles:", articles);
  articles.forEach(article => index.add(article));

  const resultsDiv = document.getElementById("results");
  const perPage = 2; // 👈 show 2 results per page
  let currentPage = 1;
  let currentResults = [];

  function renderPage(page) {
    resultsDiv.innerHTML = "";

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageResults = currentResults.slice(start, end);

    pageResults.forEach(article => {
      const div = document.createElement("div");
      const words = article.content.split(/\s+/).slice(0, 30).join(" ");
      const preview = words + (article.content.split(/\s+/).length > 30 ? "…" : "");
      div.innerHTML = `<h3>${article.title}</h3><p>${preview}</p>`;
      resultsDiv.appendChild(div);
    });

    // Pagination controls
    const controls = document.createElement("div");
    controls.style.marginTop = "1em";

    if (page > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.onclick = () => {
        currentPage--;
        renderPage(currentPage);
      };
      controls.appendChild(prevBtn);
    }

    if (end < currentResults.length) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.onclick = () => {
        currentPage++;
        renderPage(currentPage);
      };
      controls.appendChild(nextBtn);
    }

    resultsDiv.appendChild(controls);
  }

  document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const query = document.getElementById("searchInput").value.trim();
    resultsDiv.innerHTML = "";

    if (!query) {
      resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
      return;
    }

    console.log("🔍 Searching for:", query);
    const results = index.search(query, { enrich: true, limit: 100 });
    console.log("📦 Raw FlexSearch results:", results);

    const allDocs = [];

    results.forEach(fieldResult => {
      if (!fieldResult) return;
      if (Array.isArray(fieldResult.result)) {
        fieldResult.result.forEach(r => {
          if (r && r.doc) allDocs.push(r.doc);
        });
      } else if (Array.isArray(fieldResult)) {
        fieldResult.forEach(sub => {
          if (sub && sub.doc) allDocs.push(sub.doc);
          else if (sub && sub.result) {
            sub.result.forEach(r => {
              if (r && r.doc) allDocs.push(r.doc);
            });
          }
        });
      }
    });

    const uniqueResultsMap = new Map();
    allDocs.forEach(a => {
      const idKey = String(a.id);
      if (!uniqueResultsMap.has(idKey)) {
        uniqueResultsMap.set(idKey, a);
      }
    });

    currentResults = Array.from(uniqueResultsMap.values());
    currentPage = 1;

    console.log("✅ Unique results:", currentResults);

    if (currentResults.length === 0) {
      resultsDiv.innerHTML = "<p>No articles found.</p>";
      return;
    }

    renderPage(currentPage);
  });
});
