import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';

export default function About() {
    return (
        <MainLayout>
            <PageHead title="Acerca de" />

            <section className="mx-auto max-w-6xl px-6 py-20 text-center md:text-left">
                <div className="max-w-2xl">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-primary">
                        Nuestra Misión
                    </h1>
                    <p className="text-lg text-muted-foreground md:text-xl">
                        En <strong>Aula QR</strong>, buscamos revolucionar la gestión académica mediante una plataforma accesible, rápida y confiable
                        que facilite el control de asistencia y participación en entornos educativos modernos.
                    </p>
                </div>
            </section>

            <section className="bg-muted/50 dark:bg-muted px-6 py-20 text-center">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold md:text-4xl text-primary">¿Por qué Aula QR?</h2>
                    <div className="mt-8 grid gap-12 md:grid-cols-2">
                        <div>
                            <h3 className="text-xl font-semibold text-primary">Facilidad de uso</h3>
                            <p className="mt-2 text-muted-foreground">
                                Nuestra interfaz es intuitiva, sin necesidad de capacitación previa. Ideal para profesores y alumnos.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">Innovación educativa</h3>
                            <p className="mt-2 text-muted-foreground">
                                Implementamos tecnología QR para que tomar asistencia sea tan fácil como escanear un código desde el celular.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">Adaptabilidad</h3>
                            <p className="mt-2 text-muted-foreground">
                                Aula QR se ajusta a todo tipo de instituciones: universidades, preparatorias, academias o talleres.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">Compromiso educativo</h3>
                            <p className="mt-2 text-muted-foreground">
                                Trabajamos por un entorno académico más eficiente y transparente, donde el tiempo se use para enseñar, no para contar listas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">Visión a futuro</h2>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                    Consolidarnos como la plataforma líder en herramientas tecnológicas para la gestión académica en América Latina,
                    apoyando tanto a docentes como a estudiantes a lograr sus metas con soluciones simples y efectivas.
                </p>
            </section>
        </MainLayout>
    );
}
