# pacepal-ztpai

## 1. Figma i projekt UI
Link: https://www.figma.com/design/sb6dfk2kI25vUnz2wGfbkU/ZTAPI-Projekt?node-id=0-1&p=f&t=2mu0uKyyyuUvvE8o-0\
Przykladowy widok:
<img width="1114" height="782" alt="image" src="https://github.com/user-attachments/assets/5db5c899-f4aa-4686-8b1a-ba8a652446d7" />


## 2. Wybor technologi

**Backend:**
Projekt zostanie zrealizowany w technologii Node.js z wykorzystaniem frameworka Express.js, który umożliwia szybkie tworzenie aplikacji webowych i REST API.
Wybrałam go ze względu na prostotę konfiguracji, przejrzystość kodu oraz dużą dostępność materiałów i bibliotek.

**Bazy danych:**
Jako bazę danych planuję wykorzystać PostgreSQL. Do komunikacji z bazą danych użyję Sequelize ORM, który ułatwia pracę z danymi w sposób obiektowy i wspiera migracje.

**Frontend:**
Warstwa frontendowa zostanie przygotowana przy użyciu o stardandowe technologie takie jakie HTML, CSS, JS, aby zapewnić aplikacji estetyczny, i responsywny interfejs użytkownika.


# 🏃 PacePal

PacePal to aplikacja webowa wspierająca planowanie i monitorowanie aktywności sportowej.  
Projekt został zrealizowany w ramach przedmiotu **ZTPAI** i składa się z części frontendowej oraz backendowej.

---

## 📖 Opis projektu

Celem projektu **PacePal** jest stworzenie aplikacji umożliwiającej użytkownikom zarządzanie aktywnościami sportowymi, takimi jak planowanie treningów oraz monitorowanie postępów.

Projekt składa się z:
- 🎨 **Frontend** – interfejs użytkownika
- ⚙️ **Backend** – API oraz logika aplikacji

---

## ⚙️ Wymagania

Przed uruchomieniem projektu upewnij się, że masz zainstalowane:

- 🧩 **Git**
- 🟢 **Node.js** (zalecana wersja LTS, np. ≥ 16)
- 📦 **npm** lub **yarn**
- 🐳 **Docker oraz Docker Compose** (opcjonalnie, jeśli projekt z nich korzysta)

---

## 📥 Instalacja

### 1️⃣ Klonowanie repozytorium

```bash
git clone https://github.com/przygodajulia/pacepal-ztpai.git
cd pacepal-ztpai
```

### 2️⃣ Konfiguracja zmiennych środowiskowych

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3️⃣ Instalacja zależności

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

### 🚀 Uruchomienie projektu
🐳 Opcja A — Docker (jeśli skonfigurowany)
Z katalogu głównego projektu uruchom:

```bash
docker-compose up
```
Aplikacja uruchomi backend, frontend oraz bazę danych jednocześnie.

💻 Opcja B — Uruchomienie ręczne
⚙️ Backend

```bash
cd backend
npm start
```

🎨 Frontend

```bash
cd frontend
npm start
```

### 📂 Struktura projektu
pacepal-ztpai/

├── backend/        # API i logika aplikacji

├── frontend/       # interfejs użytkownika

├── docker-compose.yml

└── README.md


### 🛢️ Baza danych, diagram ERD
<img width="1740" height="1312" alt="image" src="https://github.com/user-attachments/assets/e20c77a9-4f8b-4f99-8e83-33b59d5efd41" />

