import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';

export default function Plans() {
    return (
        <MainLayout>
            <PageHead title="Planes y Precios - Aula QR" />

            <section className="mx-auto max-w-6xl px-6 py-20 text-center">
                <h1 className="text-4xl font-bold md:text-5xl text-primary">
                    Elige el plan que mejor se adapte a tu institución
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Aula QR ofrece opciones accesibles para instituciones pequeñas, medianas o grandes. Empieza gratis y escala cuando lo necesites.
                </p>
            </section>

            <section className="bg-muted/50 dark:bg-muted px-6 py-20">
                <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-3">
                    {/* Plan Gratis */}
                    <div className="rounded-lg border border-border bg-background p-8 shadow-md">
                        <h3 className="text-2xl font-bold text-primary">Plan Gratuito</h3>
                        <p className="mt-2 text-muted-foreground">Ideal para pruebas o uso personal</p>
                        <p className="mt-6 text-4xl font-extrabold text-foreground">Gratis</p>
                        <ul className="mt-6 text-left space-y-3 text-muted-foreground">
                            <li>✅ Hasta 1 grupo</li>
                            <li>✅ Máximo 30 alumnos</li>
                            <li>✅ Escaneo QR básico</li>
                            <li>✅ Reportes en pantalla</li>
                        </ul>
                        <a
                            href="/register"
                            className="mt-8 inline-block w-full rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                        >
                            Empezar gratis
                        </a>
                    </div>

                    {/* Plan Escolar */}
                    <div className="rounded-lg border-2 border-primary bg-background p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-primary">Plan Escolar</h3>
                        <p className="mt-2 text-muted-foreground">Perfecto para escuelas o academias</p>
                        <p className="mt-6 text-4xl font-extrabold text-foreground">$499<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
                        <ul className="mt-6 text-left space-y-3 text-muted-foreground">
                            <li>✅ Hasta 10 grupos</li>
                            <li>✅ Reportes descargables</li>
                            <li>✅ Soporte por correo</li>
                            <li>✅ Administración de docentes</li>
                        </ul>
                        <a
                            href="/register"
                            className="mt-8 inline-block w-full rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                        >
                            Solicitar demo
                        </a>
                    </div>

                    {/* Plan Institucional */}
                    <div className="rounded-lg border border-border bg-background p-8 shadow-md">
                        <h3 className="text-2xl font-bold text-primary">Plan Institucional</h3>
                        <p className="mt-2 text-muted-foreground">Para universidades y grandes instituciones</p>
                        <p className="mt-6 text-4xl font-extrabold text-foreground">A consultar</p>
                        <ul className="mt-6 text-left space-y-3 text-muted-foreground">
                            <li>✅ Usuarios ilimitados</li>
                            <li>✅ Reportes avanzados</li>
                            <li>✅ Integración con sistemas internos</li>
                            <li>✅ Soporte prioritario</li>
                        </ul>
                        <a
                            href="/contact"
                            className="mt-8 inline-block w-full rounded-full border border-primary text-primary px-6 py-2.5 text-sm font-medium hover:bg-primary/10 transition"
                        >
                            Contactar equipo
                        </a>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">¿Tienes necesidades especiales?</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Escríbenos para adaptar un plan que se ajuste a tu modelo educativo o institución.
                </p>
                <a
                    href="/contact"
                    className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                >
                    Hablar con ventas
                </a>
            </section>
        </MainLayout>
    );
}
