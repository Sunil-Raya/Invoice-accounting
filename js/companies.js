// Mock data - Replace with API call later
const mockCompanies = [
    {
        id: 1,
        name: "Acme Corporation",
        totalDue: 15000,
        paid: 5000,
        email: "contact@acme.com",
        phone: "+1-555-0101",
        address: "123 Business Ave, New York, NY"
    },
    {
        id: 2,
        name: "Tech Industries",
        totalDue: 25000,
        paid: 20000,
        email: "info@techindustries.com",
        phone: "+1-555-0102",
        address: "456 Innovation St, San Francisco, CA"
    },
    {
        id: 3,
        name: "Global Solutions",
        totalDue: 8000,
        paid: 0,
        email: "sales@globalsolutions.com",
        phone: "+1-555-0103",
        address: "789 Market Ln, Chicago, IL"
    }
];

let allCompanies = [...mockCompanies];
let filteredCompanies = [...mockCompanies];

function initCompanies() {
    const companiesGrid = document.getElementById("companiesGrid");
    const searchInput = document.getElementById("searchInput");
    const addCompanyCard = document.getElementById("addCompanyCard");
    const addCompanyModal = document.getElementById("addCompanyModal");
    const addCompanyForm = document.getElementById("addCompanyForm");
    const closeModal = document.getElementById("closeModal");
    const cancelBtn = document.getElementById("cancelBtn");

    searchInput.addEventListener("input", (e) => handleSearch(e, companiesGrid));
    addCompanyCard.addEventListener("click", () => openModal(addCompanyModal));
    closeModal.addEventListener("click", () => closeCompanyModal(addCompanyModal, addCompanyForm));
    cancelBtn.addEventListener("click", () => closeCompanyModal(addCompanyModal, addCompanyForm));
    addCompanyForm.addEventListener("submit", (e) => handleAddCompany(e, addCompanyModal, addCompanyForm, companiesGrid));

    addCompanyModal.addEventListener("click", (e) => {
        if (e.target === addCompanyModal) closeCompanyModal(addCompanyModal, addCompanyForm);
    });

    initializePage(companiesGrid);
}

function initializePage(companiesGrid) {
    showSkeletons(companiesGrid);
    setTimeout(() => loadCompanies(companiesGrid), 300);
}

function showSkeletons(companiesGrid) {
    companiesGrid.innerHTML = `
        <div class="company-card skeleton"></div>
        <div class="company-card skeleton"></div>
        <div class="company-card skeleton"></div>
    `;
}

function loadCompanies(companiesGrid) {
    filteredCompanies.length === 0 ? showEmptyState(companiesGrid) : renderCompanies(filteredCompanies, companiesGrid);
}

function renderCompanies(companies, companiesGrid) {
    companiesGrid.innerHTML = "";
    if (companies.length === 0) {
        showEmptyState(companiesGrid);
        return;
    }
    companies.forEach((company) => companiesGrid.appendChild(createCompanyCard(company)));
}

function createCompanyCard(company) {
    const card = document.createElement("div");
    card.className = "company-card";
    
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

    card.innerHTML = `
        <div class="company-info">
            <div class="company-header">
                <h3 class="company-name">${company.name}</h3>
            </div>
            <div class="company-details">
                <div class="payment-detail total-due">
                    <span class="payment-label">Total Due:</span>
                    <span class="payment-amount">${formatCurrency(company.totalDue)}</span>
                </div>
                <div class="payment-detail paid">
                    <span class="payment-label">Amount Paid:</span>
                    <span class="payment-amount">${formatCurrency(company.paid)}</span>
                </div>
            </div>
        </div>
    `;

    card.addEventListener("click", () => console.log("Company clicked:", company));
    return card;
}

function showEmptyState(companiesGrid) {
    companiesGrid.innerHTML = `
        <div class="company-card skeleton" style="opacity: 0.5;"></div>
    `;

    const emptyMessage = document.createElement("div");
    emptyMessage.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        padding: 2rem;
        color: #6b7280;
    `;
    emptyMessage.innerHTML = `
        <p style="font-size: 1.1rem; margin: 1rem 0;">No companies found</p>
        <p style="font-size: 0.95rem; color: #9ca3af;">Click the "Add New Company" button to create one</p>
    `;
    companiesGrid.appendChild(emptyMessage);
}

function handleSearch(e, companiesGrid) {
    const searchTerm = e.target.value.toLowerCase().trim();
    filteredCompanies = searchTerm === ""
        ? [...allCompanies]
        : allCompanies.filter((company) =>
            company.name.toLowerCase().includes(searchTerm) ||
            company.email?.toLowerCase().includes(searchTerm) ||
            company.phone?.includes(searchTerm)
        );
    loadCompanies(companiesGrid);
}

function openModal(addCompanyModal) {
    addCompanyModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCompanyModal(addCompanyModal, addCompanyForm) {
    addCompanyModal.classList.remove("active");
    document.body.style.overflow = "auto";
    addCompanyForm.reset();
}

function handleAddCompany(e, addCompanyModal, addCompanyForm, companiesGrid) {
    e.preventDefault();

    const formData = new FormData(addCompanyForm);
    const newCompany = {
        id: allCompanies.length + 1,
        name: formData.get("companyName"),
        email: formData.get("companyEmail"),
        phone: formData.get("companyPhone"),
        address: formData.get("companyAddress"),
        totalDue: 0,
        paid: 0
    };

    console.log("New company to add:", newCompany);
    allCompanies.unshift(newCompany);
    filteredCompanies = [...allCompanies];
    closeCompanyModal(addCompanyModal, addCompanyForm);
    loadCompanies(companiesGrid);
    alert("Company added successfully!");
}
