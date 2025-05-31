import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';

export default function Welcome() {
    return (
        <MainLayout>
            <PageHead title="Bienvenido" />

            <section className="mx-auto max-w-6xl px-6 py-20 text-center md:text-left">
                <div className="max-w-xl md:max-w-2xl">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-primary">
                        Aula QR
                    </h1>
                    <p className="mb-4 text-lg text-muted-foreground md:text-xl">
                        Software para el éxito académico
                    </p>
                    <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                        Optimiza el control de asistencia con tecnología QR, accesible desde cualquier dispositivo.
                        Diseñado para docentes, alumnos y administradores educativos.
                    </p>

                    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                        <a
                            href="/register"
                            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Empezar ahora
                        </a>
                        <a
                            href="#features"
                            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                        >
                            Ver más
                        </a>
                    </div>
                </div>
            </section>

            <section id="features" className="bg-muted/50 dark:bg-muted px-6 py-16">
                <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-3 text-center">
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Escaneo Rápido</h3>
                        <p className="mt-2 text-muted-foreground">Registro inmediato de asistencia con código QR desde celular o tablet.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Reportes Automáticos</h3>
                        <p className="mt-2 text-muted-foreground">Consulta estadísticas de asistencia por grupo, alumno o materia.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Multiplataforma</h3>
                        <p className="mt-2 text-muted-foreground">Compatible con móviles, tablets y PC. Responsive y adaptable al tema claro/oscuro.</p>
                    </div>
                </div>
            </section>

        </MainLayout>
    );
}
