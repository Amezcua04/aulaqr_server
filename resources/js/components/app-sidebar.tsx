import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookA, BookCheck, BookCopy, BookMarked, BookType, CheckCheck, Clock3, FileChartLine, FileUser, LayoutGrid, ListTodo, Logs, MessagesSquare, NotebookPen, ScanQrCode, Shield, ShieldEllipsis, UserRoundCog, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        }
    ];

    const maestroNavItems: NavItem[] = [
        { title: 'Mis Clases', href: '/clases', icon: BookCopy },
        { title: 'Asistencias', href: '/asistencias', icon: CheckCheck },
        { title: 'Tareas', href: '/tareas', icon: NotebookPen },
        { title: 'Revisiones', href: '/revisiones', icon: ListTodo },
    ];

    const coordinadorNavItems: NavItem[] = [
        { title: 'Carreras', href: '/carreras', icon: BookMarked },
        { title: 'Grupos', href: '/grupos', icon: BookA },
        { title: 'Materias', href: '/materias', icon: BookType },
        { title: 'Docentes', href: '/docentes', icon: UserRoundCog },
        { title: 'Estudiantes', href: '/estudiantes', icon: UsersRound },
        { title: 'Asignaciones', href: '/asignaciones', icon: BookCheck },
    ];

    const adminNavItems: NavItem[] = [
        { title: 'Reportes', href: '/reportes', icon: FileChartLine },
        // { title: 'Horarios', href: '/horario', icon: Clock3 },
        // { title: 'Usuarios', href: '/users', icon: ShieldEllipsis },
        // { title: 'Auditoría', href: '/logs', icon: Logs },
    ];

    let roleBaseNavItems = [...mainNavItems];
    if (userRole === 'maestro') {
        roleBaseNavItems = [...maestroNavItems];
    }
    if (userRole === 'coordinador') {
        roleBaseNavItems = [...roleBaseNavItems, ...coordinadorNavItems];
    }
    if (userRole === 'admin') {
        roleBaseNavItems = [...roleBaseNavItems, ...coordinadorNavItems, ...adminNavItems];
    }


    const footerNavItems: NavItem[] = [
        {
            title: 'Soporte',
            href: 'https://wa.me/3114000218',
            icon: MessagesSquare,
        },
        // {
        //     title: 'Repository',
        //     href: 'https://github.com/laravel/react-starter-kit',
        //     icon: Folder,
        // },
        // {
        //     title: 'Documentation',
        //     href: 'https://laravel.com/docs/starter-kits#react',
        //     icon: BookOpen,
        // },
    ];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBaseNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
