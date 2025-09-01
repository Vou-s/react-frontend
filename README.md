# 1. Buat component baru
echo. > src/components/dashboard/NewComponent.jsx

# Atau dengan PowerShell:
New-Item -Path "src/components/dashboard/NewComponent.jsx" -ItemType File

# Buat folder komponen dan halaman
New-Item -ItemType Directory -Path "src\components" -Force
New-Item -ItemType Directory -Path "src\pages" -Force

@(
"src\components\Sidebar.tsx",
"src\components\Navbar.tsx",
"src\components\StatCard.tsx",
"src\components\ChartPie.tsx",
"src\components\MapView.tsx",
"src\components\Layout.tsx",
"src\pages\Dashboard.tsx"
"src\auth\landing.tsx"
) 

# 2. Implement component
# 3. Export component
# 4. Import di parent component
# 5. Test component

# 6. Check imports
npm run build
firebase deploy --only hosting
