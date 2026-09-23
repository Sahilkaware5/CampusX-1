/* CampusCore Shared Dashboard Infrastructure — UI only.
 * DEMO_MODE data is presentation-only. Authentication/authorization MUST be server-side.
 */
(() => {
  "use strict";

  const DEMO_MODE = true;
  const STORAGE_KEY = "campuscore-dashboard-sidebar-collapsed";

  const roles = {
    STUDENT_ADMIN: { name: "Student Administration", shortName: "Student Admin", icon: "student", path: "student/dashboard.html", accent: "blue", search: "Search students, classes, reports..." },
    FACULTY_ADMIN: { name: "Faculty Administration", shortName: "Faculty Admin", icon: "faculty", path: "faculty/dashboard.html", accent: "indigo", search: "Search faculty, subjects, reports..." },
    CR_ADMIN: { name: "Class Representative", shortName: "CR", icon: "users", path: "cr/dashboard.html", accent: "teal", search: "Search students, updates, requests..." },
    COUNCIL_ADMIN: { name: "Student Council", shortName: "Council", icon: "council", path: "council/dashboard.html", accent: "violet", search: "Search events, initiatives, reports..." },
    CRC_ADMIN: { name: "Class/College Representative Coordinator", shortName: "CRC", icon: "coordination", path: "crc/dashboard.html", accent: "slate", search: "Search representatives, issues, reports..." }
  };

  const nav = {
    STUDENT_ADMIN: [
      ["Dashboard", "dashboard", "grid", "dashboard.html"], ["Students", "students", "student", "#"], ["Classes & Divisions", "classes", "classes", "#"], ["Attendance", "attendance", "calendar", "#"], ["Academics", "academics", "book", "#"], ["Notices", "notices", "notice", "#"], ["Events", "events", "calendar", "#"], ["Complaints & Requests", "requests", "message", "#"], ["Documents", "documents", "document", "#"], ["Reports", "reports", "chart", "#"], ["Notifications", "notifications", "bell", "#"], ["Profile", "profile", "profile", "#"], ["Settings", "settings", "settings", "#"]
    ],
    FACULTY_ADMIN: [
      ["Dashboard", "dashboard", "grid", "dashboard.html"], ["Faculty", "faculty", "faculty", "#"], ["Subjects", "subjects", "book", "#"], ["Classes & Lectures", "classes", "classes", "#"], ["Attendance", "attendance", "calendar", "#"], ["Timetable", "timetable", "clock", "#"], ["Notes & Resources", "resources", "document", "#"], ["Announcements", "announcements", "notice", "#"], ["Student Academic Information", "students", "student", "#"], ["Reports", "reports", "chart", "#"], ["Notifications", "notifications", "bell", "#"], ["Profile", "profile", "profile", "#"], ["Settings", "settings", "settings", "#"]
    ],
    CR_ADMIN: [
      ["Dashboard", "dashboard", "grid", "dashboard.html"], ["My Class", "class", "classes", "#"], ["Students", "students", "student", "#"], ["Announcements", "announcements", "notice", "#"], ["Attendance Information", "attendance", "calendar", "#"], ["Assignments & Academic Updates", "assignments", "book", "#"], ["Faculty Communication", "communication", "message", "#"], ["Events", "events", "calendar", "#"], ["Complaints & Requests", "requests", "message", "#"], ["Feedback", "feedback", "feedback", "#"], ["Reports", "reports", "chart", "#"], ["Notifications", "notifications", "bell", "#"], ["Profile", "profile", "profile", "#"]
    ],
    COUNCIL_ADMIN: [
      ["Dashboard", "dashboard", "grid", "dashboard.html"], ["Council Members", "members", "users", "#"], ["Activities", "activities", "activity", "#"], ["Events", "events", "calendar", "#"], ["Registrations", "registrations", "clipboard", "#"], ["Announcements", "announcements", "notice", "#"], ["Initiatives", "initiatives", "spark", "#"], ["Feedback", "feedback", "feedback", "#"], ["Complaints", "complaints", "message", "#"], ["Reports", "reports", "chart", "#"], ["Notifications", "notifications", "bell", "#"], ["Profile", "profile", "profile", "#"]
    ],
    CRC_ADMIN: [
      ["Dashboard", "dashboard", "grid", "dashboard.html"], ["Representatives", "representatives", "users", "#"], ["Faculty Monitoring", "faculty-monitoring", "faculty", "#"], ["Student Issues", "student-issues", "message", "#"], ["Complaints", "complaints", "message", "#"], ["Requests", "requests", "clipboard", "#"], ["Academic Activities", "academics", "book", "#"], ["Coordination", "coordination", "coordination", "#"], ["Announcements", "announcements", "notice", "#"], ["Reports", "reports", "chart", "#"], ["Analytics", "analytics", "chart", "#"], ["Notifications", "notifications", "bell", "#"], ["Profile", "profile", "profile", "#"]
    ]
  };

  const icons = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    student: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.7-3.2 2.8-5 6.5-5s5.8 1.8 6.5 5M4 11h16M7 11V8.8L12 6l5 2.8V11"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.8 20c.6-3.2 2.5-5 5.2-5s4.6 1.8 5.2 5M14 15.5c2.8-.1 4.7 1.3 5.4 4.5"/></svg>',
    faculty: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M6 17V8l6-3 6 3v9M9 17v-4h6v4M3 9l9-5 9 5"/></svg>',
    classes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM8 9h8M8 13h8M8 17h4"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5zM5 5.5v16M9 7h7M9 11h7"/></svg>',
    notice: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15V9a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/></svg>',
    message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 3V7a2 2 0 0 1 2-2z"/></svg>',
    document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6"/></svg>',
    chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h16M8 16v-5M12 16V7M16 16v-8M20 16v-4"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M5 21c.6-4 2.9-6 7-6s6.4 2 7 6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/><path d="m19.4 15 .1.1-1.7 2.9-1.1-.6a7.7 7.7 0 0 1-2.2 1.3V20h-3.4v-1.3a7.7 7.7 0 0 1-2.2-1.3l-1.1.6-1.7-2.9.1-.1a7.7 7.7 0 0 1-1-2.4H4.1V9.2h1.2a7.7 7.7 0 0 1 1-2.4l-.1-.1 1.7-2.9 1.1.6a7.7 7.7 0 0 1 2.2-1.3V2h3.4v1.1a7.7 7.7 0 0 1 2.2 1.3l1.1-.6 1.7 2.9-.1.1a7.7 7.7 0 0 1 1 2.4h1.2v3.4h-1.2a7.7 7.7 0 0 1-1 2.4z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4"/></svg>',
    activity: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
    feedback: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 2.1 4.3 4.9.7-3.5 3.4.8 4.8-4.3-2.2-4.3 2.2.8-4.8L5 9l4.9-.7z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/></svg>',
    coordination: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M12 7v5M12 12 6 16M12 12l6 4"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
    logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 7"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 10v6M12 7h.01"/></svg>',
    warning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 9 16H3z"/><path d="M12 9v5M12 17h.01"/></svg>',
    error: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m9 9 6 6M15 9l-6 6"/></svg>'
  };

  const page = document.body.dataset.dashboardPage || "dashboard";
  const roleKey = document.body.dataset.role || "STUDENT_ADMIN";
  const role = roles[roleKey] || roles.STUDENT_ADMIN;

  function icon(name) { return icons[name] || icons.grid; }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }

  function renderShell() {
    document.title = `${role.name} | CampusCore`;
    const root = document.querySelector("#dashboard-app");
    if (!root) return;
    root.innerHTML = `
      <div class="dashboard-shell" data-accent="${role.accent}">
        <div class="dashboard-overlay" data-dashboard-overlay></div>
        <aside class="dashboard-sidebar" id="dashboard-sidebar" aria-label="${escapeHtml(role.name)} navigation">
          <div class="sidebar-head">
            <a class="dashboard-brand" href="../index.html" aria-label="CampusCore home">
              <span class="dashboard-brand-mark">C</span>
              <span class="dashboard-brand-copy"><strong>Campus<span>Core</span></strong><small>College Management</small></span>
            </a>
            <button class="icon-button sidebar-close" type="button" data-close-sidebar aria-label="Close navigation">${icon("close")}</button>
          </div>
          <div class="portal-identity">
            <span class="portal-icon">${icon(role.icon)}</span>
            <span><strong>${escapeHtml(role.shortName)}</strong><small>${escapeHtml(role.name)}</small></span>
          </div>
          <nav class="dashboard-nav" aria-label="Portal sections">
            <p class="nav-label">Workspace</p>
            ${nav[roleKey].map(item => `<a class="dashboard-nav-link${item[1] === page ? " active" : ""}" href="${item[3]}" data-nav-key="${item[1]}"${item[3] === "#" ? ' data-placeholder-link="true"' : ""}>
              <span class="nav-icon">${icon(item[2])}</span><span class="nav-text">${escapeHtml(item[0])}</span>${item[1] === "notifications" ? '<span class="nav-count">3</span>' : ""}
            </a>`).join("")}
          </nav>
          <div class="sidebar-footer">
            <div class="demo-pill"><span></span> DEMO UI MODE</div>
            <a class="dashboard-nav-link logout-link" href="../login.html" data-logout="true"><span class="nav-icon">${icon("logout")}</span><span class="nav-text">Logout</span></a>
          </div>
        </aside>
        <div class="dashboard-main">
          <header class="dashboard-topbar">
            <div class="topbar-left">
              <button class="icon-button mobile-menu-button" type="button" data-open-sidebar aria-label="Open navigation">${icon("menu")}</button>
              <div class="breadcrumbs" aria-label="Breadcrumb"><a href="dashboard.html">Dashboard</a><span>/</span><strong>${escapeHtml(pageLabel())}</strong></div>
            </div>
            <div class="topbar-actions">
              <div class="dashboard-search" data-search-box>
                <span class="search-icon">${icon("search")}</span>
                <input type="search" placeholder="${escapeHtml(role.search)}" aria-label="Dashboard search" data-dashboard-search>
                <button class="search-close icon-button" type="button" data-search-close aria-label="Close search">${icon("close")}</button>
              </div>
              <button class="icon-button mobile-search-button" type="button" data-search-toggle aria-label="Open search">${icon("search")}</button>
              <div class="dropdown-wrap">
                <button class="icon-button notification-trigger" type="button" data-dropdown="notifications" aria-expanded="false" aria-controls="notification-menu" aria-label="Notifications, 3 unread">${icon("bell")}<span class="notification-dot">3</span></button>
                ${notificationMenu()}
              </div>
              <div class="dropdown-wrap profile-wrap">
                <button class="profile-trigger" type="button" data-dropdown="profile" aria-expanded="false" aria-controls="profile-menu">
                  <span class="avatar">SK</span><span class="profile-trigger-copy"><strong>Sahil Kaware</strong><small>${escapeHtml(role.shortName)}</small></span>${icon("chevron")}
                </button>
                ${profileMenu()}
              </div>
            </div>
          </header>
          <main class="dashboard-content" id="main-content" tabindex="-1">
            ${dashboardContent()}
          </main>
        </div>
      </div>
      <div id="dashboard-toasts" class="dashboard-toasts" aria-live="polite" aria-atomic="true"></div>
      <div id="dashboard-modal-root"></div>`;
    bindShell();
  }

  function pageLabel() {
    const found = (nav[roleKey] || []).find(item => item[1] === page);
    return found ? found[0] : "Dashboard";
  }

  function notificationMenu() {
    return `<div class="dropdown-menu notification-menu" id="notification-menu" data-menu="notifications" hidden>
      <div class="dropdown-heading"><div><strong>Notifications</strong><small>Demo notifications</small></div><span class="unread-count">3 unread</span></div>
      <div class="notification-list">
        ${[["New announcement posted","10 minutes ago","notice","unread"],["Faculty meeting scheduled","1 hour ago","calendar","unread"],["New student request","2 hours ago","message","unread"],["Weekly report is ready","Yesterday","chart",""]].map(n => `<button class="notification-item ${n[3]}" type="button"><span class="notification-item-icon">${icon(n[2])}</span><span><strong>${n[0]}</strong><small>${n[1]}</small></span></button>`).join("")}
      </div><button class="dropdown-footer" type="button" data-placeholder-link="true">View all notifications ${icon("chevron")}</button>
    </div>`;
  }

  function profileMenu() {
    return `<div class="dropdown-menu profile-menu" id="profile-menu" data-menu="profile" hidden>
      <div class="profile-menu-head"><span class="avatar avatar-lg">SK</span><span><strong>Sahil Kaware</strong><small>${escapeHtml(role.name)}</small></span></div>
      <div class="dropdown-divider"></div>
      <button type="button" class="profile-menu-link" data-placeholder-link="true">${icon("profile")} My Profile</button>
      <button type="button" class="profile-menu-link" data-placeholder-link="true">${icon("settings")} Account Settings</button>
      <button type="button" class="profile-menu-link" data-placeholder-link="true">${icon("info")} Help &amp; Support</button>
      <div class="dropdown-divider"></div>
      <a class="profile-menu-link danger" href="../login.html">${icon("logout")} Logout</a>
    </div>`;
  }

  const demo = {
    stats: [
      ["Total Records", "2,450", "+8.2%", "Positive trend", "positive", "student"],
      ["Pending Requests", "28", "6", "Needs attention", "warning", "message"],
      ["Active Notices", "14", "3 new", "This week", "neutral", "notice"],
      ["Open Issues", "7", "2 critical", "Requires review", "critical", "warning"]
    ],
    activities: [["New announcement published", "Today, 10:30 AM", "notice"],["Attendance updated for MCA-A", "Today, 09:45 AM", "calendar"],["Student request submitted", "Yesterday, 04:20 PM", "message"],["Monthly report prepared", "Yesterday, 01:10 PM", "chart"]],
    notices: [["Faculty meeting scheduled for Friday.", "warning", "Today"],["Examination timetable has been updated.", "info", "Yesterday"],["Registration deadline extended.", "success", "2 days ago"]]
  };

  function dashboardContent() {
    const description = {
      STUDENT_ADMIN: "Monitor student services, academic records and administrative activity from one workspace.",
      FACULTY_ADMIN: "Coordinate faculty, subjects, classes and academic operations from one workspace.",
      CR_ADMIN: "Coordinate your class, communication, student updates and representative responsibilities.",
      COUNCIL_ADMIN: "Plan council activities, events, initiatives and student engagement workflows.",
      CRC_ADMIN: "Coordinate representatives, monitor issues and oversee cross-campus communication."
    }[roleKey];
    return `<div class="page-heading">
      <div><span class="eyebrow">${escapeHtml(role.shortName)} · DEMO WORKSPACE</span><h1>${escapeHtml(role.name)}</h1><p>${escapeHtml(description)}</p></div>
      <div class="page-actions"><button class="btn btn-secondary" type="button" data-placeholder-link="true">View Guide</button><button class="btn btn-primary" type="button" data-toast="Quick action is available in a future module.">${icon("plus")} Quick Action</button></div>
    </div>
    <div class="dashboard-notice"><span>${icon("info")}</span><div><strong>Shared dashboard foundation</strong><p>This is presentation-only demo content. Real data, authentication and permissions will be connected in later phases.</p></div><button class="icon-button" type="button" aria-label="Dismiss demo notice" data-dismiss-notice>${icon("close")}</button></div>
    <section class="stat-grid" aria-label="Overview statistics">${demo.stats.map(s => statCard(s)).join("")}</section>
    <section class="quick-actions card">
      <div class="section-head"><div><h2>Quick Actions</h2><p>Common workspace shortcuts.</p></div></div>
      <div class="quick-action-grid">${[["Add Record","Create a new entry","plus"],["Create Notice","Prepare an announcement","notice"],["View Attendance","Open attendance overview","calendar"],["Generate Report","Prepare a report","chart"]].map(a => `<button class="quick-action" type="button" data-toast="${a[0]} is a placeholder for a future module."><span>${icon(a[2])}</span><span><strong>${a[0]}</strong><small>${a[1]}</small></span>${icon("chevron")}</button>`).join("")}</div>
    </section>
    <section class="dashboard-grid dashboard-grid-two">
      <article class="card chart-card"><div class="section-head"><div><h2>Overview</h2><p>Chart container ready for future API data.</p></div><button class="icon-button" type="button" aria-label="Chart options">${icon("more")}</button></div><div class="chart-placeholder" role="img" aria-label="Analytics chart placeholder"><div class="chart-grid-lines"></div><div class="chart-line"><span style="height:32%"></span><span style="height:48%"></span><span style="height:40%"></span><span style="height:66%"></span><span style="height:55%"></span><span style="height:78%"></span><span style="height:72%"></span></div><div class="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><span class="placeholder-caption">No live analytics connected</span></div></article>
      <article class="card"><div class="section-head"><div><h2>Recent Activity</h2><p>Demo activity feed.</p></div><button class="text-button" type="button" data-placeholder-link="true">View all</button></div><div class="activity-feed">${demo.activities.map(a => `<div class="activity-item"><span class="activity-icon">${icon(a[2])}</span><div><strong>${a[0]}</strong><small>${a[1]}</small></div></div>`).join("")}</div></article>
    </section>
    <section class="dashboard-grid dashboard-grid-two">
      <article class="card notice-card"><div class="section-head"><div><h2>Important Notices</h2><p>Demo alerts for the dashboard foundation.</p></div></div><div class="notice-list">${demo.notices.map(n => `<div class="notice-item notice-${n[1]}"><span>${icon(n[1])}</span><div><strong>${n[0]}</strong><small>${n[2]}</small></div></div>`).join("")}</div></article>
      <article class="card"><div class="section-head"><div><h2>Recent Records</h2><p>Reusable responsive data table.</p></div><button class="text-button" type="button" data-placeholder-link="true">View all</button></div>${tableDemo()}</article>
    </section>
    <section class="state-grid">
      <article class="card compact-state"><span class="state-icon">${icon("document")}</span><div><h3>Empty State</h3><p>Reusable no-data presentation for future modules.</p></div><button class="text-button" type="button" data-toast="No records are available in demo mode.">Preview</button></article>
      <article class="card compact-state loading-preview"><span class="state-icon">${icon("activity")}</span><div><h3>Loading State</h3><p>Skeleton-ready container for asynchronous data.</p></div><span class="skeleton-mini" aria-label="Loading preview"><i></i><i></i><i></i></span></article>
      <article class="card compact-state"><span class="state-icon state-error">${icon("error")}</span><div><h3>Error State</h3><p>Retry-ready presentation for future API failures.</p></div><button class="text-button" type="button" data-toast="Retry action is ready for future API integration.">Try again</button></article>
    </section>`;
  }

  function statCard(s) {
    return `<article class="stat-card stat-${s[4]}"><div class="stat-card-top"><span class="stat-icon">${icon(s[5])}</span><span class="stat-kicker">${s[3]}</span></div><div class="stat-value">${s[1]}</div><div class="stat-bottom"><strong>${s[0]}</strong><span>${s[2]}</span></div></article>`;
  }

  function tableDemo() {
    const rows = [["Rahul Sharma","1023","MCA-A","Active"],["Priya Patil","1024","MCA-A","Active"],["Amit Joshi","1025","MCA-B","Pending"]];
    return `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Roll No.</th><th>Class</th><th>Status</th><th class="align-right">Action</th></tr></thead><tbody>${rows.map(r => `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td><span class="badge badge-${r[3].toLowerCase()}"><span></span>${r[3]}</span></td><td class="align-right"><button class="table-action" type="button" data-toast="Record actions will be implemented in a later module.">View</button></td></tr>`).join("")}</tbody></table></div>`;
  }

  function bindShell() {
    const shell = document.querySelector(".dashboard-shell");
    const sidebar = document.querySelector("#dashboard-sidebar");
    const overlay = document.querySelector("[data-dashboard-overlay]");
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") shell.classList.add("sidebar-collapsed");

    document.querySelector("[data-open-sidebar]")?.addEventListener("click", () => openMobileSidebar());
    document.querySelector("[data-close-sidebar]")?.addEventListener("click", closeMobileSidebar);
    overlay?.addEventListener("click", closeMobileSidebar);
    document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAllDropdowns(); closeMobileSidebar(); closeModal(); } });

    document.querySelectorAll("[data-placeholder-link]").forEach(el => el.addEventListener("click", e => {
      if (el.tagName === "A") e.preventDefault();
      showToast("This is a UI placeholder. The module will be connected in a later phase.", "info");
    }));
    document.querySelectorAll("[data-toast]").forEach(el => el.addEventListener("click", () => showToast(el.dataset.toast, "success")));
    document.querySelector("[data-dismiss-notice]")?.addEventListener("click", e => e.currentTarget.closest(".dashboard-notice")?.remove());

    document.querySelectorAll("[data-dropdown]").forEach(trigger => trigger.addEventListener("click", e => {
      e.stopPropagation(); const name = trigger.dataset.dropdown; const menu = document.querySelector(`[data-menu="${name}"]`); const open = !menu.hidden; closeAllDropdowns(); if (!open) { menu.hidden = false; trigger.setAttribute("aria-expanded", "true"); }
    }));
    document.addEventListener("click", closeAllDropdowns);

    const searchBox = document.querySelector("[data-search-box]");
    document.querySelector("[data-search-toggle]")?.addEventListener("click", () => { searchBox.classList.add("mobile-search-open"); searchBox.querySelector("input")?.focus(); });
    document.querySelector("[data-search-close]")?.addEventListener("click", () => searchBox.classList.remove("mobile-search-open"));
    document.querySelector("[data-dashboard-search]")?.addEventListener("input", e => filterTable(e.target.value));

    window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMobileSidebar(); });
    document.querySelector(".sidebar-head")?.addEventListener("dblclick", () => toggleSidebar(shell));
    let collapseButton = document.createElement("button"); collapseButton.className = "sidebar-collapse-button"; collapseButton.type = "button"; collapseButton.setAttribute("aria-label", "Collapse sidebar"); collapseButton.innerHTML = icon("chevron"); collapseButton.addEventListener("click", () => toggleSidebar(shell)); sidebar.appendChild(collapseButton);

    document.querySelectorAll("[data-logout]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); openModal({title:"Leave dashboard?", text:"This demo action does not end a real session. Backend logout will be implemented later.", confirm:"Continue to Login", onConfirm:() => { window.location.href = "../login.html"; }}); }));
  }

  function toggleSidebar(shell) { shell.classList.toggle("sidebar-collapsed"); localStorage.setItem(STORAGE_KEY, shell.classList.contains("sidebar-collapsed") ? "true" : "false"); }
  function openMobileSidebar() { document.querySelector(".dashboard-shell")?.classList.add("mobile-sidebar-open"); document.body.classList.add("dashboard-menu-open"); document.querySelector("[data-close-sidebar]")?.focus(); }
  function closeMobileSidebar() { document.querySelector(".dashboard-shell")?.classList.remove("mobile-sidebar-open"); document.body.classList.remove("dashboard-menu-open"); }
  function closeAllDropdowns() { document.querySelectorAll("[data-menu]").forEach(m => { m.hidden = true; }); document.querySelectorAll("[data-dropdown]").forEach(t => t.setAttribute("aria-expanded","false")); }
  function filterTable(term) { const q = term.trim().toLowerCase(); document.querySelectorAll(".table-wrap tbody tr").forEach(row => row.hidden = q && !row.textContent.toLowerCase().includes(q)); }

  function showToast(message, type = "info") {
    const root = document.querySelector("#dashboard-toasts"); if (!root) return;
    const toast = document.createElement("div"); toast.className = `cms-toast cms-toast-${type}`; toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.innerHTML = `<span class="toast-symbol">${icon(type === "success" ? "check" : type === "warning" ? "warning" : type === "error" ? "error" : "info")}</span><span>${escapeHtml(message)}</span><button type="button" class="toast-close" aria-label="Close notification">${icon("close")}</button>`;
    root.appendChild(toast); requestAnimationFrame(() => toast.classList.add("show"));
    const remove = () => { toast.classList.remove("show"); setTimeout(() => toast.remove(), 180); }; toast.querySelector(".toast-close").addEventListener("click", remove); setTimeout(remove, 3600);
  }

  let modalPreviousFocus = null;
  function openModal({title, text, confirm = "Confirm", onConfirm = () => {}}) {
    const root = document.querySelector("#dashboard-modal-root"); if (!root) return; modalPreviousFocus = document.activeElement;
    root.innerHTML = `<div class="modal-backdrop" data-modal-backdrop><section class="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" type="button" aria-label="Close dialog" data-modal-close>${icon("close")}</button><div class="modal-icon">${icon("warning")}</div><h2 id="modal-title">${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p><div class="modal-actions"><button class="btn btn-secondary" type="button" data-modal-close>Cancel</button><button class="btn btn-primary" type="button" data-modal-confirm>${escapeHtml(confirm)}</button></div></section></div>`;
    root.querySelectorAll("[data-modal-close]").forEach(b => b.addEventListener("click", closeModal)); root.querySelector("[data-modal-backdrop]").addEventListener("click", e => { if (e.target === e.currentTarget) closeModal(); }); root.querySelector("[data-modal-confirm]").addEventListener("click", () => { onConfirm(); closeModal(); }); root.querySelector("[data-modal-confirm]").focus();
  }
  function closeModal() { const root = document.querySelector("#dashboard-modal-root"); if (root?.firstElementChild) root.innerHTML = ""; if (modalPreviousFocus && typeof modalPreviousFocus.focus === "function") modalPreviousFocus.focus(); modalPreviousFocus = null; }

  window.CampusCoreDashboard = { DEMO_MODE, roles, dashboardNavigation: nav, icons, showToast, openModal, closeModal };
  renderShell();
})();
