import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Docentes',
        href: '/docentes',
    },
    {
        title: 'Editar',
        href: '/docentes/edit',
    },
];

interface Docente {
    id: number;
    nombre: string;
    paterno: string;
    materno: string;
    estado: boolean;
}

export default function EditDocente({ docente }: { docente: Docente }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: docente.nombre || '',
        paterno: docente.paterno || '',
        materno: docente.materno || '',
        estado: docente.estado ? 'true' : 'false',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/docentes/${docente.id}`, {
            onSuccess: () => toast.success('Docente actualizado con éxito'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Docente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Editar Docente</CardTitle>
                            <Link href='/docentes'>
                                <Button className='cursor-pointer' variant='outline'>
                                    <ArrowLeftIcon className='w-4 h-4' />
                                    Regresar
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="nombre">Nombre <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        placeholder="Ingresa el nombre"
                                        required
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                                </div>
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="paterno">Apellido paterno <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="paterno"
                                        name="paterno"
                                        type="text"
                                        placeholder="Ingresa el apellido paterno"
                                        required
                                        value={data.paterno}
                                        onChange={(e) => setData('paterno', e.target.value)}
                                    />
                                    {errors.paterno && <p className="text-sm text-red-500">{errors.paterno}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="materno">Apellido materno <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="materno"
                                        name="materno"
                                        type="text"
                                        placeholder="Ingresa el apellido materno"
                                        required
                                        value={data.materno}
                                        onChange={(e) => setData('materno', e.target.value)}
                                    />
                                    {errors.materno && <p className="text-sm text-red-500">{errors.materno}</p>}
                                </div>
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="estado">Estado <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={data.estado}
                                        onValueChange={(value) => setData('estado', value)}
                                    >
                                        <SelectTrigger id="estado" className='cursor-pointer'>
                                            <SelectValue placeholder="Selecciona un estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Activo</SelectItem>
                                            <SelectItem value="false">Inactivo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className='cursor-pointer'>
                                    {processing ? 'Guardando...' : "Guardar"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
