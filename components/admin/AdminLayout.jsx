// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     IconMenu2,
//     IconX,
//     IconUserBolt,
//     IconBrandTabler,
//     IconHome,
//     IconChartBar
// } from '@tabler/icons-react';
// import { useAdminPermissions } from '@/hooks/useAdmin';
//
// // Sidebar Component
// const Sidebar = ({ open, setOpen, activeTab, setActiveTab, onNavigateHome }) => {
//     const handleNavigation = (key) => {
//         setActiveTab(key);
//         if (window.innerWidth < 768) {
//             setOpen(false);
//         }
//     };
//
//     const navigateHome = () => {
//         if (onNavigateHome) {
//             onNavigateHome();
//         }
//     };
//
//     const links = [
//         {
//             label: "Dashboard",
//             key: "dashboard",
//             icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
//         },
//         {
//             label: "Products",
//             key: "products",
//             icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
//         },
//         {
//             label: "Users",
//             key: "users",
//             icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
//         },
//     ];
//
//     return (
//         <>
//             {/* Desktop Sidebar */}
//             <motion.div
//                 className={`hidden md:flex h-full px-4 py-4 flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 border-r border-neutral-200 dark:border-neutral-700`}
//                 animate={{
//                     width: open ? "300px" : "60px",
//                 }}
//                 onMouseEnter={() => setOpen(true)}
//                 onMouseLeave={() => setOpen(false)}
//             >
//                 <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//                     {/* Logo */}
//                     <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 mb-8">
//                         <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//                         <motion.span
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: open ? 1 : 0 }}
//                             className="font-medium text-black dark:text-white whitespace-pre"
//                         >
//                             Admin Panel
//                         </motion.span>
//                     </div>
//
//                     {/* Navigation Links */}
//                     <div className="flex flex-col gap-2">
//                         {links.map((link) => (
//                             <button
//                                 key={link.key}
//                                 onClick={() => handleNavigation(link.key)}
//                                 className={`flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md transition-colors ${
//                                     activeTab === link.key
//                                         ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
//                                         : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
//                                 }`}
//                             >
//                                 {link.icon}
//                                 <motion.span
//                                     animate={{
//                                         display: open ? "inline-block" : "none",
//                                         opacity: open ? 1 : 0,
//                                     }}
//                                     className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block"
//                                 >
//                                     {link.label}
//                                 </motion.span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//
//                 {/* Home Button */}
//                 <button
//                     onClick={navigateHome}
//                     className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
//                 >
//                     <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//                     <motion.span
//                         animate={{
//                             display: open ? "inline-block" : "none",
//                             opacity: open ? 1 : 0,
//                         }}
//                         className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block"
//                     >
//                         Back to Home
//                     </motion.span>
//                 </button>
//             </motion.div>
//
//             {/* Mobile Header */}
//             <div className="h-16 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full border-b border-neutral-200 dark:border-neutral-700">
//                 <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Admin Panel</h1>
//                 <button
//                     onClick={() => setOpen(!open)}
//                     className="text-neutral-800 dark:text-neutral-200"
//                 >
//                     <IconMenu2 />
//                 </button>
//             </div>
//
//             {/* Mobile Sidebar Overlay */}
//             <AnimatePresence>
//                 {open && (
//                     <motion.div
//                         initial={{ x: "-100%", opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         exit={{ x: "-100%", opacity: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between md:hidden"
//                     >
//                         <div>
//                             <button
//                                 className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
//                                 onClick={() => setOpen(false)}
//                             >
//                                 <IconX />
//                             </button>
//
//                             <div className="mt-16 flex flex-col gap-4">
//                                 {links.map((link) => (
//                                     <button
//                                         key={link.key}
//                                         onClick={() => handleNavigation(link.key)}
//                                         className={`flex items-center gap-4 py-3 px-4 rounded-md transition-colors ${
//                                             activeTab === link.key
//                                                 ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
//                                                 : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
//                                         }`}
//                                     >
//                                         {link.icon}
//                                         <span className="text-lg">{link.label}</span>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//
//                         <button
//                             onClick={navigateHome}
//                             className="flex items-center gap-4 py-3 px-4 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
//                         >
//                             <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//                             <span className="text-lg">Back to Home</span>
//                         </button>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };
//
// // Admin Layout Component
// const AdminLayout = ({ children, activeTab, setActiveTab, onNavigateHome }) => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const { canAccessAdmin } = useAdminPermissions();
//
//     if (!canAccessAdmin) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
//                 <div className="text-center">
//                     <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                         Access Denied
//                     </h1>
//                     <p className="text-gray-600 dark:text-gray-400 mb-6">
//                         You need admin privileges to access this page.
//                     </p>
//                     <button
//                         onClick={onNavigateHome}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
//                     >
//                         Go to Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-neutral-800 flex flex-col md:flex-row">
//             <Sidebar
//                 open={sidebarOpen}
//                 setOpen={setSidebarOpen}
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//                 onNavigateHome={onNavigateHome}
//             />
//
//             <main className="flex-1 overflow-hidden">
//                 <div className="h-full p-4 md:p-8 bg-white dark:bg-neutral-900 md:rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 overflow-y-auto">
//                     {children}
//                 </div>
//             </main>
//         </div>
//     );
// };
//
// export default AdminLayout;
import React from 'react';
import {
    LayoutDashboard,
    Package,
    Users,
    Star,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Home
} from 'lucide-react';

const AdminLayout = ({ children, activeTab, setActiveTab, onNavigateHome }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const navigation = [
        {
            name: 'Dashboard',
            key: 'dashboard',
            icon: LayoutDashboard,
            description: 'Overview and analytics'
        },
        {
            name: 'Products',
            key: 'products',
            icon: Package,
            description: 'Manage products and bestsellers'
        },
        {
            name: 'Users',
            key: 'users',
            icon: Users,
            description: 'User management and permissions'
        },
        {
            name: 'Testimonials',
            key: 'testimonials',
            icon: MessageSquare,
            description: 'Manage customer testimonials'
        }
    ];

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        setSidebarOpen(false); // Close mobile sidebar when tab changes
    };

    const renderSidebarContent = () => (
        <div className="flex flex-col h-full lg:pt-34">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
                        <p className="text-sm text-gray-600">Management Dashboard</p>
                    </div>
                </div>

                {/* Mobile close button */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;

                    return (
                        <button
                            key={item.key}
                            onClick={() => handleTabChange(item.key)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${
                                isActive ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            <div className="flex-1">
                                <div className={`font-medium ${
                                    isActive ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                    {item.name}
                                </div>
                                <div className={`text-sm ${
                                    isActive ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                    {item.description}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
                <button
                    onClick={onNavigateHome}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                >
                    <Home className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Back to Store</span>
                </button>

                <button
                    onClick={() => {
                        // Handle logout logic here
                        console.log('Logout clicked');
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-900 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
                    {renderSidebarContent()}
                </div>
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
                        {renderSidebarContent()}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 md:pl-80">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>

                        <div className="flex items-center space-x-2">
                            <h1 className="text-lg font-semibold text-gray-900">
                                {navigation.find(item => item.key === activeTab)?.name || 'Admin Panel'}
                            </h1>
                        </div>

                        <button
                            onClick={onNavigateHome}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Home className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1">
                    <div className="py-6 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;