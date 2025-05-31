import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScanQrCodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Clase {
    id: number;
    materia: {
        nombre: string;
    };
    grupo: {
        nombre: string;
    };
    horario_dia: {
        dia: {
            nombre: string;
        };
        horario: {
            hora_inicio: string;
            hora_fin: string;
        };
    };
}

interface Props {
    clases: Clase[];
}

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default function ClasesIndex({ clases = [] }: Props) {
    const [filtroDia, setFiltroDia] = useState('todas');

    const obtenerDiaActual = (): string => {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const hoy = new Date();
        return dias[hoy.getDay()];
    };

    const clasesFiltradas = clases.filter((clase) => {
        const dia = clase.horario_dia?.dia?.nombre;
        if (filtroDia === 'todas') return true;
        if (filtroDia === 'hoy') return dia === obtenerDiaActual();
        return dia === filtroDia;
    });

    return (
        <AppLayout>
            <Head title="Mis Clases" />
            <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Mis Clases</h1>
                <Select onValueChange={setFiltroDia} defaultValue="todas">
                    <SelectTrigger className="w-full sm:w-64 cursor-pointer">
                        <SelectValue placeholder="Filtrar por día" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="hoy">Hoy ({obtenerDiaActual()})</SelectItem>
                        {diasSemana.map((dia) => (
                            <SelectItem key={dia} value={dia}>
                                {dia}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {clases.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">No tienes clases asignadas actualmente.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clasesFiltradas.map((clase) => (
                            <Card key={clase.id} className="shadow-md transition hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg">{clase.materia.nombre}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p><span className="font-semibold">Grupo:</span> {clase.grupo.nombre}</p>
                                    <p><span className="font-semibold">Día:</span> {clase.horario_dia.dia.nombre}</p>
                                    <p><span className="font-semibold">Horario:</span>{clase.horario_dia.horario.hora_inicio} - {clase.horario_dia.horario.hora_fin}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <Badge variant="outline">Clase ID: {clase.id}</Badge>
                                        <Link href={route('asistencias.create', { asignacion: clase.id })}>
                                            <Button variant="outline" size="icon" className="cursor-pointer">
                                                <ScanQrCodeIcon className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
