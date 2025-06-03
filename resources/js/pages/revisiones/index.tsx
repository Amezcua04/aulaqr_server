import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/pagination';
import DeleteButton from '@/components/delete-button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Revisiones', href: '/revision-tareas' },
];

interface RevisionTarea {
    id: number;
    fecha_revision: string;
    estudiante: {
        nombre: string;
        paterno: string;
        materno: string;
    };
    tarea: {
        descripcion: string;
        asignacion_docente: {
            materia: {
                nombre: string;
            };
            grupo: {
                nombre: string;
            };
        };
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface RevisionesPagination {
    data: RevisionTarea[];
    links: PaginationLink[];
}

export default function Revisiones({ revisiones }: { revisiones: RevisionesPagination }) {
    const [filters, setFilters] = useState({
        estudiante: '',
        materia: '',
        grupo: '',
        fecha: '',
        descripcion: '',
    });

    const filteredData = useMemo(() => {
        return revisiones.data.filter((revision) => {
            const estudianteNombre = `${revision.estudiante.nombre} ${revision.estudiante.paterno} ${revision.estudiante.materno}`.toLowerCase();
            return (
                estudianteNombre.includes(filters.estudiante.toLowerCase()) &&
                revision.tarea.asignacion_docente.materia.nombre.toLowerCase().includes(filters.materia.toLowerCase()) &&
                revision.tarea.asignacion_docente.grupo.nombre.toLowerCase().includes(filters.grupo.toLowerCase()) &&
                revision.fecha_revision.includes(filters.fecha) &&
                revision.tarea.descripcion.toLocaleLowerCase().includes(filters.descripcion.toLowerCase())
            );
        });
    }, [filters, revisiones.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Revisiones de Tareas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Revisiones de Tareas</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Todas las Revisiones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pb-4">
                                <Input
                                    placeholder="Buscar estudiante..."
                                    value={filters.estudiante}
                                    onChange={(e) => setFilters({ ...filters, estudiante: e.target.value })}
                                />
                                <Input
                                    placeholder="Buscar materia..."
                                    value={filters.materia}
                                    onChange={(e) => setFilters({ ...filters, materia: e.target.value })}
                                />
                                <Input
                                    placeholder="Buscar grupo..."
                                    value={filters.grupo}
                                    onChange={(e) => setFilters({ ...filters, grupo: e.target.value })}
                                />
                                <Input
                                    placeholder="Buscar fecha..."
                                    value={filters.fecha}
                                    onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
                                />
                                <Input
                                    placeholder="Buscar título tarea..."
                                    value={filters.descripcion}
                                    onChange={(e) => setFilters({ ...filters, descripcion: e.target.value })}
                                />
                            </div>

                            <Table>
                                <TableCaption>Lista de revisiones de tareas</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Estudiante</TableHead>
                                        <TableHead>Materia</TableHead>
                                        <TableHead>Grupo</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Tarea</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-6">
                                                No hay revisiones que coincidan con los filtros.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredData.map((revision) => (
                                            <TableRow key={revision.id}>
                                                <TableCell>{revision.id}</TableCell>
                                                <TableCell>{`${revision.estudiante.nombre} ${revision.estudiante.paterno} ${revision.estudiante.materno}`}</TableCell>
                                                <TableCell>{revision.tarea?.asignacion_docente?.materia?.nombre ?? '-'}</TableCell>
                                                <TableCell>{revision.tarea?.asignacion_docente?.grupo?.nombre ?? '-'}</TableCell>
                                                <TableCell>{revision.fecha_revision}</TableCell>
                                                <TableCell>{revision.tarea.descripcion}</TableCell>
                                                <TableCell className="text-right">
                                                    <DeleteButton resourceName='revision' deleteUrl={`/revisiones/${revision.id}`} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={revisiones.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
