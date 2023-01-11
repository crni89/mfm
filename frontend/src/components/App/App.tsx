import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppStore from '../../stores/AppStore';
import './App.css';
import AdminLogin from '../Admin/AdminLogin/AdminLogin';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
import AdminObjektiLista from '../Admin/AdminDashboard/AdminObjektiLista';
import AdminGrupeLista from '../Admin/AdminDashboard/AdminGrupeLista';
import AdminAdministratorList from '../Admin/AdminDashboard/AdminAdministratorList';
import AdminAdministratorAdd from '../Admin/AdminDashboard/AdminAdministratorAdd';
import AdminDeteAdd from '../Admin/AdminDashboard/AdminDeteAdd';
import AdminDecaList from '../Admin/AdminDashboard/AdminDecaList';
import AdminDete from '../Admin/AdminDashboard/AdminDete';
import AdminRoditeljiAdd from '../Admin/AdminDashboard/AdminRoditeljiAdd';
import AdminRoditeljiList from '../Admin/AdminDashboard/AdminRoditeljiList';
import AdminUgovoriLista from '../Admin/AdminDashboard/AdminUgovori';
import AdminDeteEdit from '../Admin/AdminDashboard/AdminDeteEdit';
import AdminRoditelj from '../Admin/AdminDashboard/AdminRoditelj';
import AdminRoditeljEdit from '../Admin/AdminDashboard/AdminRoditeljEdit';
import AdminDeteFinansije from '../Admin/AdminDashboard/AdminDeteFinansije';
import Pretraga from '../Admin/AdminDashboard/Pretraga';

function App() {
  return (
    <Provider store={ AppStore }>
      <Container className="mt-4">
        <Routes>
          
          <Route path="/" element={ <AdminLogin /> } />
          <Route path="/admin/dashboard" element={ <AdminDashboard /> } />
          <Route path="/admin/dashboard/obejkat/lista" element={ <AdminObjektiLista /> } />
          <Route path="/admin/dashboard/grupa/lista" element={ <AdminGrupeLista /> } />
          <Route path="/admin/dashboard/ugovor/lista" element={ <AdminUgovoriLista /> } />

          <Route path="/admin/dashboard/dete/dodaj" element={ <AdminDeteAdd /> } />
          <Route path="/admin/dashboard/deca/list" element={ <AdminDecaList /> } />
          <Route path="/admin/dashboard/dete/:id" element={ <AdminDete /> } />
          <Route path="/admin/dashboard/dete/edit/:id" element={ <AdminDeteEdit /> } />
          <Route path="/admin/dashboard/dete/:id/finansije" element={ <AdminDeteFinansije /> } />

          <Route path="/admin/dashboard/roditelj/dodaj" element={ <AdminRoditeljiAdd /> } />
          <Route path="/admin/dashboard/roditelj/list" element={ <AdminRoditeljiList /> } />
          <Route path="/admin/dashboard/roditelj/:id" element={ <AdminRoditelj /> } />
          <Route path="/admin/dashboard/roditelj/edit/:id" element={ <AdminRoditeljEdit /> } />

          <Route path="/admin/dashboard/administrator/list" element={ <AdminAdministratorList /> } />
          <Route path="/admin/dashboard/administrator/add" element={ <AdminAdministratorAdd /> } />
          
        </Routes>
      </Container>
    </Provider>
  
  );
}

export default App;
