import "./App.css";
import FirstForm from "./forms/firstForm/firstForm.tsx";
import AuthorizationForm from "./forms/authorizationForm/authorizationForm.tsx";
import RegistrationForm from "./forms/registrationForm/registrationForm.tsx";
import ConnectionForm from "./forms/connectionForm/connectionForm.tsx";
import RoomCustomizationForm from "./forms/roomCustomizationForm/roomCustomizationForm.tsx";
import SessionForm from "./forms/sessionForm/sessionForm.tsx"
import DevInformationForm from "./forms/systemInformationForm/systemInformationForm.tsx";
import { Route, Routes } from "react-router-dom";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthorizationForm />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/main" element={<FirstForm />} />
      <Route path="/connection" element={<ConnectionForm />} />
      <Route path="/room-customization" element={<RoomCustomizationForm />} />
      <Route path="/game" element={<SessionForm />} />
      <Route path="/developers-info" element={<DevInformationForm />} />
    </Routes>
  );
}
