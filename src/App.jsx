import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Doctors from './pages/Doctors';
import DoctorDetails from "./pages/DoctorDetails"
import Patients from './pages/Patients';
 import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import PatientDetails from './pages/PatientDetails';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{   flex: 1 }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails  />} />
            <Route path="/patients" element={<Patients />} />
             <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
