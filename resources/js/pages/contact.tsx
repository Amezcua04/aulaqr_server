import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';

export default function Contact() {
    return (
        <MainLayout>
            <PageHead title="Contáctanos" />

            <section className="mx-auto max-w-3xl px-6 py-20 text-center md:text-left">
                <h1 className="text-4xl font-bold md:text-5xl text-primary text-center">
                    Ponte en contacto con nosotros
                </h1>
                <p className="mt-4 text-muted-foreground text-lg text-center">
                    ¿Tienes dudas, comentarios o deseas una demo personalizada? Escríbenos, estamos para ayudarte.
                </p>

                <form className="mt-12 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            required
                            className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                        >
                            Enviar mensaje
                        </button>
                    </div>
                </form>
            </section>

            <section className="px-6 pb-20 text-center text-muted-foreground">
                <p className="text-sm">
                    También puedes escribirnos a <a href="mailto:contacto@aulaqr.com" className="underline">contacto@aulaqr.com</a>
                </p>
            </section>
        </MainLayout>
    );
}
