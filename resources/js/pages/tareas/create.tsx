import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Asignacion = {
    id: number;
    materia: {
        nombre: string;
    };
    grupo: {
        nombre: string;
    };
};

type Props = {
    asignaciones: Asignacion[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tareas', href: '/tareas' },
    { title: 'Crear', href: '/tareas/create' },
];

export default function CreateTarea({ asignaciones }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        descripcion: '',
        fecha_entrega: '',
        asignacion_docente_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tareas', {
            onSuccess: () => toast.success('Tarea creada correctamente'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Tarea" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Crear Tarea</CardTitle>
                            <Link href="/tareas">
                                <Button variant="outline">
                                    <ArrowLeftIcon className="w-4 h-4" />
                                    Regresar
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="fecha_entrega">
                                        Fecha de entrega <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="fecha_entrega"
                                        name="fecha_entrega"
                                        type="date"
                                        value={data.fecha_entrega}
                                        onChange={(e) => setData('fecha_entrega', e.target.value)}
                                        required
                                    />
                                    {errors.fecha_entrega && (
                                        <p className="text-sm text-red-500">{errors.fecha_entrega}</p>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="asignacion_docente_id">
                                        Asignación <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.asignacion_docente_id}
                                        onValueChange={(value) => setData('asignacion_docente_id', value)}
                                    >
                                        <SelectTrigger id="asignacion_docente_id">
                                            <SelectValue placeholder="Selecciona una asignación" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {asignaciones.map((asignacion) => (
                                                <SelectItem key={asignacion.id} value={String(asignacion.id)}>
                                                    {asignacion.materia.nombre} - {asignacion.grupo.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.asignacion_docente_id && (
                                        <p className="text-sm text-red-500">{errors.asignacion_docente_id}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="descripcion">
                                    Descripción <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="descripcion"
                                    name="descripcion"
                                    type="text"
                                    placeholder="Descripción de la tarea"
                                    value={data.descripcion}
                                    onChange={(e) => setData('descripcion', e.target.value)}
                                    required
                                />
                                {errors.descripcion && (
                                    <p className="text-sm text-red-500">{errors.descripcion}</p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
