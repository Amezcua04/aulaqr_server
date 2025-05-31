import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';

export default function Features() {
    return (
        <MainLayout>
            <PageHead title="Características" />

            <section className="mx-auto max-w-6xl px-6 py-20 text-center">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-primary">
                    ¿Qué puedes hacer con Aula QR?
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
                    Nuestra plataforma combina tecnología, simplicidad y eficiencia para mejorar la experiencia académica en aulas modernas.
                </p>
            </section>

            <section className="bg-muted/50 dark:bg-muted px-6 py-20">
                <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2 lg:grid-cols-3 text-center">
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Escaneo con QR</h3>
                        <p className="mt-2 text-muted-foreground">
                            Registra la asistencia de cada alumno con solo escanear un código desde su dispositivo.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Control por grupo y horario</h3>
                        <p className="mt-2 text-muted-foreground">
                            Asocia cada materia con su grupo, docente y horario para reportes precisos.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Reportes automáticos</h3>
                        <p className="mt-2 text-muted-foreground">
                            Genera informes de asistencia por alumno, materia o periodo con un clic.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Panel administrativo</h3>
                        <p className="mt-2 text-muted-foreground">
                            Administra maestros, grupos, materias y horarios desde un panel sencillo.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Compatibilidad multiplataforma</h3>
                        <p className="mt-2 text-muted-foreground">
                            Funciona en laptops, tablets y móviles, sin necesidad de instalar nada.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary">Modo claro y oscuro</h3>
                        <p className="mt-2 text-muted-foreground">
                            Diseñado para adaptarse a las preferencias visuales del usuario.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">Listo para transformar tu aula</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Aula QR es la herramienta que docentes, coordinadores y alumnos esperaban. Empieza hoy sin complicaciones.
                </p>
                <a
                    href="/register"
                    className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                >
                    Comenzar ahora
                </a>
            </section>
        </MainLayout>
    );
}
