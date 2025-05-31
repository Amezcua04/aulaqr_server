import React, { useEffect, useRef, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import jsQR from 'jsqr';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Asistencia',
        href: '/asistencias',
    },
    {
        title: 'Tomar asistencia',
        href: '/asistencias/create',
    },
];

interface Estudiante {
    id: number;
    nombre: string;
}

interface Asignacion {
    id: number;
    materia: {
        nombre: string;
    };
    grupo: {
        nombre: string;
        estudiantes: Estudiante[];
    };
}

interface Props {
    asignacion: Asignacion;
    fecha: string;
}

export default function CreateAsistencia({ asignacion, fecha }: Props) {
    const webcamRef = useRef<Webcam>(null);
    const [scanned, setScanned] = useState<string | null>(null);

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

                const estudianteValido = asignacion.grupo.estudiantes.find((e) => {
                    return e.id.toString() === estudianteId;
                });

                if (!estudianteValido) {
                    toast.error('El QR no corresponde a un estudiante del grupo.');
                    return;
                }

                setScanned(estudianteId);
                registrarAsistencia(estudianteId);
            }
        };
    };

    const registrarAsistencia = (estudianteId: string) => {
        router.post('/asistencias',
            {
                estudiante_id: parseInt(estudianteId, 10),
                asignacion_docente_id: asignacion.id,
                fecha: fecha,
                estado: 'presente',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Asistencia registrada con éxito');
                    setTimeout(() => setScanned(null), 3000);
                },
                onError: (e) => {
                    toast.error('Error al registrar la asistencia');
                    setScanned(null);
                },
            }
        );
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
            <Head title="Registrar Asistencia" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Escanear Asistencia</CardTitle>
                            <Link href="/asistencias">
                                <Button variant="outline">
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Regresar
                                </Button>
                            </Link>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2">
                            Materia: <strong>{asignacion.materia.nombre}</strong> | Grupo:{' '}
                            <strong>{asignacion.grupo.nombre}</strong> | Fecha:{' '}
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
