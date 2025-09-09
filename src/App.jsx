import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Patients from "./pages/Patients";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import PatientDetails from "./pages/PatientDetails";
import AddDoctor from "./pages/AddDoctor";
import EditDoctor from "./pages/EditDoctor";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // التحقق من وجود token في localStorage (بدون اتصال بالخلفية)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // تحويل القيمة إلى boolean
    setLoading(false);
  }, []);

  // دالة لتسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          // Routes للمستخدمين المسجلين
          <Route path="/*" element={
            <div style={{ display: "flex" }}>
              <Sidebar onLogout={handleLogout} />
              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path='/overview' element={<Overview />} />
                  <Route path='/doctors' element={<Doctors />} />
                  <Route path='/doctors/:id' element={<DoctorDetails />} />
                  <Route path='/patients' element={<Patients />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/settings/add-doctor' element={<AddDoctor />} />
                  <Route path='/settings/edit-doctor/:id' element={<EditDoctor />} />
                  <Route path='/help' element={<HelpCenter />} />
                  <Route path='/patients/:id' element={<PatientDetails />} />
                  <Route path='/' element={<Navigate to="/overview" replace />} />
                  <Route path='*' element={<Navigate to="/overview" replace />} />
                </Routes>
              </div>
            </div>
          } />
        ) : (
          // Routes للزوار غير المسجلين
          <>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;