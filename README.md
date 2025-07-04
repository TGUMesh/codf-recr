<div align="center">

# 🎓 CIMPulse – Club Information Management Portal

A full-stack web platform designed for **VIT SWC (Student Welfare Committee)** to streamline the creation, management, and oversight of student clubs.  
Built for clean role-based workflows, seamless member control, and an intuitive dashboard experience.

---

## 🧠 Overview

> 🔐 **Role-based access**  
> 🧑💼 **Admins** can create/edit clubs, assign roles, and manage members.  
> 🎓 **Presidents** manage members of their own club.  
> 👨🏫 **Faculty Coordinators** get oversight access.  
> 👥 **Students** can explore clubs and request to join.

This project ensures a centralized, secure, and structured environment for club operations within a university setup.

---

## ⚙️ Tech Stack

<div align="center">

<img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white"/>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

</div>

---

## 🧩 Features

- 📊 **Admin Dashboard** – Club overview, quick actions, and search
- 🏷️ **Club Creation** – Add name, description, category
- 👥 **Member Management** – Add/Remove members, view lists
- 👑 **Role Assignment** – Assign President & Faculty Coordinator (unique per club)
- ✉️ **Join Requests** – Students can request to join clubs, admins approve
- 🔐 **JWT Authentication** – Secure and scalable
- 🎯 **Role-Based Route Protection** – Separate views and permissions

---

## 🔗 Routes Overview

| Role       | Access Routes                                             |
|------------|-----------------------------------------------------------|
| Admin      | `/dashboard`, `/create-club`, `/assign`, `/club/:id`     |
| President  | `/club/:id`, `/club/:id/members`                         |
| Faculty    | `/club/:id` (read-only)                                  |
| Student    | `/clubs`, `/club/:id/request`                            |

---

## 🗂️ Folder Structure

```bash
CIMPulse/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── pages/
│   └── styles/
├── README.md
└── .env
