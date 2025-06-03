import React, { useEffect, useRef, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Revisiones', href: '/revisiones' },
    { title: 'Registrar Revisión', href: '/revisiones/create' },
];

interface Estudiante {
    id: number;
    nombre: string;
}

interface Grupo {
    nombre: string;
    estudiantes: Estudiante[];
}

interface Materia {
    nombre: string;
}

interface AsignacionDocente {
    materia: Materia;
    grupo: Grupo;
}

interface Tarea {
    id: number;
    titulo: string;
    asignacion_docente: AsignacionDocente;
}

interface Props {
    tarea: Tarea;
    fecha: string;
}

export default function CreateRevision({ tarea, fecha }: Props) {
    const webcamRef = useRef<Webcam>(null);
    const [scanned, setScanned] = useState<string | null>(null);
    const [scannedRecently, setScannedRecently] = useState<string | null>(null);
    const cooldownTime = 5000;

    const { post, setData } = useForm({
        estudiante_id: '',
        tarea_id: tarea.id,
        fecha_revision: fecha,
    });

    const reproducirSonido = () => {
        const audio = new Audio('/sounds/success.mp3');
        audio.play().catch((err) => console.warn('No se pudo reproducir el sonido:', err));
    };

    const registrarRevision = (estudianteId: string) => {
        if (scannedRecently === estudianteId) {
            toast.warning('Este QR ya fue escaneado recientemente');
            return;
        }

        setScanned(estudianteId);
        setScannedRecently(estudianteId);
        setData('estudiante_id', estudianteId);

        post('/revisiones', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Revisión registrada con éxito');
                reproducirSonido();
            },
            onError: (errors) => {
                if (errors?.message?.includes('Ya se registró')) {
                    toast.warning('Esta revisión ya fue registrada previamente.');
                } else {
                    toast.error('Error al registrar la revisión');
                }
            },
            onFinish: () => {
                setTimeout(() => {
                    setScanned(null);
                    setScannedRecently(null);
                }, cooldownTime);
            },
        });
    };

    const handleScan = (imageSrc: string | null) => {
        if (!imageSrc) return;

        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height, {
                inversionAttempts: 'attemptBoth',
            });

            if (code) {
                const estudianteId = code.data;
                if (scanned === estudianteId) return;

                const esEstudianteValido = tarea.asignacion_docente.grupo.estudiantes.find(
                    (e) => e.id.toString() === estudianteId
                );

                if (!esEstudianteValido) {
                    toast.error('El QR no corresponde a un estudiante del grupo.');
                    return;
                }

                registrarRevision(estudianteId);
            }
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const screenshot = webcamRef.current?.getScreenshot();
            if (screenshot) {
                handleScan(screenshot);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [scanned]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Revisión" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Escanear Revisión</CardTitle>
                            <Link href="/revisiones">
                                <Button variant="outline">
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Regresar
                                </Button>
                            </Link>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2">
                            Tarea: <strong>{tarea.titulo}</strong> | Materia:{' '}
                            <strong>{tarea.asignacion_docente.materia.nombre}</strong> | Grupo:{' '}
                            <strong>{tarea.asignacion_docente.grupo.nombre}</strong> | Fecha:{' '}
                            <strong>{fecha}</strong>
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <Webcam
                                ref={webcamRef}
                                audio={false}
                                screenshotFormat="image/jpeg"
                                width={500}
                                videoConstraints={{
                                    facingMode: 'environment',
                                    width: 500,
                                    height: 500,
                                }}
                                className="rounded-xl shadow-md"
                            />
                            {scanned && (
                                <p className="text-green-600 font-semibold">
                                    Último QR escaneado: {scanned}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
