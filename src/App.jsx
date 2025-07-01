import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Splash from './pages/Splash'
import SignIn from './pages/SignIn'
import SignUp from './pages/SIgnUp'
import NoActiveElection from './pages/NoActiveElection'
import ActiveElection from './pages/ActiveElection'
import CheckYourMail from './pages/CheckYourMail'
import ForgottenPassword from './pages/ForgottenPassword'
import CreateNewPassword from './pages/CreateNewPassword'
import NewPasswordCreated from './pages/NewPasswordCreated'
import VerifyAccount from './pages/VerifyAccount'
import Verified from './pages/Verified'
import ElectionPage from './pages/ElectionPage'
import Vote from './pages/Vote'
import VoteSuccess from './pages/VoteSuccess'
import VoteSummary from './pages/VoteSummary'
import LiveResult from './pages/LiveResult'
import ElectionResults from './pages/ElectionResults'
import ElectionEnd from './pages/ElectionEnd'
import Election from './pages/Election'
import VerifyEmail from './pages/VerifyEmail'
import ResendVerificationMail from './pages/ResendVerificationMail'
import { useAuth } from './hooks/useAuth'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminRegister from './admin/AdminRegister'
import AdminElectionPage from './admin/AdminElectionPage'
import AdminActiveElection from './admin/AdminActiveElection'
import AdminResultSummary from './admin/AdminResultSummary'
import AdminElectionHistory from './admin/AdminElectionHistory'
import AdminCreateElection from './admin/AdminCreateElection'

const AdminRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user || !user.user.isAdmin) {
    return <div className='text-center mt-10'>Access Denied: Admins only</div>
  }
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path='/admin/register' element={<AdminRegister />} />
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } >
        <Route index path="*" element={<AdminElectionPage />} />
        <Route path='/admin/dashboard/:electionId' element={<AdminActiveElection />} />
        <Route path='/admin/dashboard/summary/:electionId' element={<AdminResultSummary />} />
        <Route path='/admin/dashboard/history' element={<AdminElectionHistory />} />
        <Route path='/admin/dashboard/create' element={<AdminCreateElection />} />
      </Route>
      {/* Public routes */}
      <Route path='/' element={<Splash />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/check-your-mail' element={<CheckYourMail />} />
      <Route path='/forgot-password' element={<ForgottenPassword />} />
      <Route path='/create-new-password' element={<CreateNewPassword />} />
      <Route path='/new-password-created' element={<NewPasswordCreated />} />
      <Route path='/verify-account' element={<VerifyAccount />} />
      <Route path='/verified' element={<Verified />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route path='/resend-verification-mail' element={<ResendVerificationMail />} />

      {/* Protected routes */}
      <Route path='/no-active-election' element={
        <ProtectedRoute>
          <NoActiveElection />
        </ProtectedRoute>
      } />
      <Route path='/active-election' element={
        <ProtectedRoute>
          <ActiveElection />
        </ProtectedRoute>
      } />
      <Route path='/election' element={
        <ProtectedRoute>
          <Election />
        </ProtectedRoute>
      } />
      <Route path='/election/:electionId' element={
        <ProtectedRoute>
          <ElectionPage />
        </ProtectedRoute>
      } />
      <Route path='/vote/:postId' element={
        <ProtectedRoute>
          <Vote />
        </ProtectedRoute>
      } />
      <Route path='/vote-success' element={
        <ProtectedRoute>
          <VoteSuccess />
        </ProtectedRoute>
      } />
      <Route path='/vote-summary/:electionId' element={
        <ProtectedRoute>
          <VoteSummary />
        </ProtectedRoute>
      } />
      <Route path='/live-result/:electionId' element={
        <ProtectedRoute>
          <LiveResult />
        </ProtectedRoute>
      } />
      <Route path='/election-results/:electionId' element={
        <ProtectedRoute>
          <ElectionResults />
        </ProtectedRoute>
      } />
      <Route path='/election-end' element={
        <ProtectedRoute>
          <ElectionEnd />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
