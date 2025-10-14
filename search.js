document.addEventListener("DOMContentLoaded", function () {

  console.log("🟢 Search script loaded.");

  // Create the search index
  const index = new FlexSearch.Document({
    document: {
      id: "id",
      index: ["title", "content"],
      store: ["id", "title", "content"] // ensure id is stored!
    }
  });

  // Add all articles
  console.log("🧩 Adding articles:", articles);
  articles.forEach(article => index.add(article));

  // Handle form submission
  document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!query) {
      resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
      return;
    }

    console.log("🔍 Searching for:", query);

    // Perform search
    const results = index.search(query, { enrich: true, limit: 100 });
    console.log("📦 Raw FlexSearch results:", JSON.stringify(results, null, 2));

    const allDocs = [];

    // Flatten results
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

    console.log("🪶 Flattened allDocs (before dedupe):", allDocs);
    console.log("🧾 allDocs IDs:", allDocs.map(a => a.id));

    // Normalize ID type and dedupe
    const uniqueResultsMap = new Map();
    allDocs.forEach(a => {
      const idKey = String(a.id); // ensure consistent key
      if (!uniqueResultsMap.has(idKey)) {
        uniqueResultsMap.set(idKey, a);
      }
    });

    const uniqueResults = Array.from(uniqueResultsMap.values());
    console.log("✅ Unique results:", uniqueResults);

    if (uniqueResults.length === 0) {
      resultsDiv.innerHTML = "<p>No articles found.</p>";
      return;
    }

    // Display
    uniqueResults.forEach(article => {
      const div = document.createElement("div");
      const words = article.content.split(/\s+/).slice(0, 30).join(" ");
      const preview = words + (article.content.split(/\s+/).length > 30 ? "…" : "");
      div.innerHTML = `<h3>${article.title}</h3><p>${preview}</p>`;
      resultsDiv.appendChild(div);
    });
  });
});
