import { ChatPage } from "./views/ChatPage";
import { HomePage } from "./views/HomePage";

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

]

export default routes