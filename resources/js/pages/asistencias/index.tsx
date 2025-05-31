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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Asistencias', href: '/asistencias' },
];

interface Asistencia {
    id: number;
    fecha: string;
    estado: 'presente' | 'ausente' | 'tarde' | 'justificado';
    estudiante: {
        nombre: string;
        paterno: string;
        materno: string;
    };
    asignacion_docente: {
        materia: { nombre: string };
        grupo: { nombre: string };
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AsistenciasPagination {
    data: Asistencia[];
    links: PaginationLink[];
}

export default function Asistencias({ asistencias }: { asistencias: AsistenciasPagination }) {
    const [filters, setFilters] = useState({
        estudiante: '',
        materia: '',
        grupo: '',
        fecha: '',
        estado: '',
    });

    const filteredData = useMemo(() => {
        return asistencias.data.filter((asistencia) => {
            const estudianteNombre = `${asistencia.estudiante.nombre} ${asistencia.estudiante.paterno} ${asistencia.estudiante.materno}`.toLowerCase();
            return (
                estudianteNombre.includes(filters.estudiante.toLowerCase()) &&
                asistencia.asignacion_docente.materia.nombre.toLowerCase().includes(filters.materia.toLowerCase()) &&
                asistencia.asignacion_docente.grupo.nombre.toLowerCase().includes(filters.grupo.toLowerCase()) &&
                asistencia.fecha.includes(filters.fecha) &&
                asistencia.estado.toLowerCase().includes(filters.estado.toLowerCase())
            );
        });
    }, [filters, asistencias.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Asistencias" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Asistencias</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Todas las Asistencias</CardTitle>
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
                                    placeholder="Buscar estado..."
                                    value={filters.estado}
                                    onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                                />
                            </div>

                            <Table>
                                <TableCaption>Lista de asistencias de estudiantes</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Estudiante</TableHead>
                                        <TableHead>Materia</TableHead>
                                        <TableHead>Grupo</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-6">
                                                No hay asistencias que coincidan con los filtros.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredData.map((asistencia) => (
                                            <TableRow key={asistencia.id}>
                                                <TableCell>{asistencia.id}</TableCell>
                                                <TableCell>{`${asistencia.estudiante.nombre} ${asistencia.estudiante.paterno} ${asistencia.estudiante.materno}`}</TableCell>
                                                <TableCell>{asistencia.asignacion_docente.materia.nombre}</TableCell>
                                                <TableCell>{asistencia.asignacion_docente.grupo.nombre}</TableCell>
                                                <TableCell>{asistencia.fecha}</TableCell>
                                                <TableCell className="capitalize">{asistencia.estado}</TableCell>
                                                <TableCell className="text-right">
                                                    <Link href={`/asistencias/${asistencia.id}/edit`}>
                                                        <Button variant="outline" size="icon">
                                                            <EditIcon className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={asistencias.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
