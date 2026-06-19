let requests = JSON.parse(localStorage.getItem("requests")) || [];

const form = document.getElementById("requestForm");
const requestList = document.getElementById("requestList");
const statusFilter = document.getElementById("statusFilter");

// Submit form
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newRequest = {
        id: Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        type: document.getElementById("type").value,
        priority: document.getElementById("priority").value,
        message: document.getElementById("message").value,
        status: "New",
        createdAt: new Date().toLocaleString()
    };

    requests.push(newRequest);
    saveAndRender();

    form.reset();
});

// Save to localStorage
function saveAndRender() {
    localStorage.setItem("requests", JSON.stringify(requests));
    renderRequests();
}

// Render requests
function renderRequests() {
    const filter = statusFilter.value;
    requestList.innerHTML = "";

    const filtered = requests.filter(req =>
        filter === "All" ? true : req.status === filter
    );

    filtered.forEach(req => {
        const div = document.createElement("div");
        div.classList.add("request-card");

        div.innerHTML = `
      <h3>${req.name} (${req.company})</h3>
      <p><b>Email:</b> ${req.email}</p>
      <p><b>Type:</b> ${req.type}</p>
      <p><b>Priority:</b> ${req.priority}</p>
      <p><b>Message:</b> ${req.message}</p>
      <p><b>Created:</b> ${req.createdAt}</p>

      <div class="status">
        <label>Status:</label>
        <select onchange="updateStatus(${req.id}, this.value)">
          <option ${req.status === "New" ? "selected" : ""}>New</option>
          <option ${req.status === "In Review" ? "selected" : ""}>In Review</option>
          <option ${req.status === "Resolved" ? "selected" : ""}>Resolved</option>
          <option ${req.status === "Rejected" ? "selected" : ""}>Rejected</option>
        </select>
      </div>
    `;

        requestList.appendChild(div);
    });
}

// Update status
function updateStatus(id, newStatus) {
    requests = requests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
    );

    saveAndRender();
}

// Filter change
statusFilter.addEventListener("change", renderRequests);

// Initial load
renderRequests();