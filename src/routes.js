import { ChatPage } from "./views/ChatPage";
import { HomePage } from "./views/HomePage";
import Login from "./views/Login";
import Register from "./views/Register";

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: '/chat',
        component: <ChatPage />,
        label: 'Chat',
    },
    {
        path: '/login',
        component: <Login />,
        label: 'Login',
    },
    {
        path: '/register',
        component: <Register />,
        label: 'Register',
    },


]

export default routes