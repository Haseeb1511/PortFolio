# 📝 How to Add a New Page

This document explains how to add a new page to your React project using the existing structure.

---

## 1️⃣ Create Page Component

* **File:** `src/pages/NewPage.jsx`
* **Action:** Create a React component for your page.
* **Tip:** Use your standard layout with a container and section.

---

## 2️⃣ Create CSS for Page

* **File:** `src/pages/NewPage.css`
* **Action:** Style your page consistently with existing pages (About, Experience, etc.).
* **Tip:** Use `.section`, `.section-title`, `.card`, and CSS variables for colors.

---

## 3️⃣ Add Route in App.jsx

* **File:** `src/App.jsx`
* **Single-line code:**

```jsx
<Route path="newpage" element={<NewPage />} />
```

* **Tip:** Place this inside your `<Route path="/" element={<Layout />}>` block.

---

## 4️⃣ Add Navbar Link

* **File:** `src/components/Navbar.jsx`
* **Single-line code:**

```jsx
<NavLink to="/newpage" className="nav-link">New Page</NavLink>
```

* **Tip:** Add it inside your `<ul className="nav-list">`.

---

## 5️⃣ Add Future Content

* Add any JSX inside `NewPage.jsx`.
* Add new CSS rules in `NewPage.css`.
* UI will automatically update with routing and navbar link.

---

