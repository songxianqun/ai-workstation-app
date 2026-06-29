import { Routes, Route, Navigate } from 'react-router-dom'
import MobileFrame from './components/MobileFrame'
import Login from './pages/Login'
import BusinessTeamWorkbench from './pages/BusinessTeamWorkbench'
import SupportCenterWorkbench from './pages/SupportCenterWorkbench'
import Conversation from './pages/Conversation'
import NewConversation from './pages/NewConversation'
import TodayTasks from './pages/TodayTasks'
import TravelAnalysis from './pages/TravelAnalysis'
import ExceptionAlerts from './pages/ExceptionAlerts'
import TaskDetail from './pages/TaskDetail'
import Settings from './pages/Settings'
import AgentRedirect from './pages/AgentRedirect'

export default function App() {
  return (
    <MobileFrame>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team" element={<BusinessTeamWorkbench />} />
        <Route path="/support" element={<SupportCenterWorkbench />} />
        <Route path="/chat/:assistantId" element={<Conversation />} />
        <Route path="/new-chat" element={<NewConversation />} />
        <Route path="/team/tasks" element={<TodayTasks />} />
        <Route path="/support/tasks" element={<TodayTasks />} />
        <Route path="/team/travel" element={<TravelAnalysis />} />
        <Route path="/team/alerts" element={<ExceptionAlerts />} />
        <Route path="/support/alerts" element={<ExceptionAlerts />} />
        <Route path="/task/:taskId" element={<TaskDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/agent/:agentId" element={<AgentRedirect />} />
      </Routes>
    </MobileFrame>
  )
}
