import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Props {
    children: ReactNode;
}

export default function MainLayout({ children }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="flex items-center justify-between px-6 py-4 md:px-12">
                <div className="flex items-center gap-2">
                    <img src="/favicon.ico" alt="Logo" className="h-8 w-auto rounded-md" />
                    <span className="text-lg font-bold">Aula QR</span>
                </div>

                <nav className="hidden gap-6 text-sm md:flex">
                    <Link href={route('home')} className="hover:underline underline-offset-4">Home</Link>
                    <Link href={route('about')} className="hover:underline underline-offset-4">Acerca de</Link>
                    <Link href={route('features')} className="hover:underline underline-offset-4">Caracteristicas</Link>
                    <Link href={route('plans')} className="hover:underline underline-offset-4">Planes</Link>
                    <Link href={route('contact')} className="hover:underline underline-offset-4">Contacto</Link>
                </nav>

                <div className="flex gap-3">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal hover:border-muted"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal hover:border-muted"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
