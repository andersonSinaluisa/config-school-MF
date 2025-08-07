export const Status = {
    PLANNING: {
        id: 1,
        label: 'Planificado',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-500',
    },
    ACTIVE: {
        id: 2,
        label: 'Activo',
        color: 'bg-green-500',
        textColor: 'text-green-500',
    },
    COMPLETED: {
        id: 3,
        label: 'Completado',
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
    },
    ARCHIVED: {
        id: 4,
        label: 'Archivado',
        color: 'bg-gray-500',
        textColor: 'text-gray-500',
    },
    getAll: () => [
        Status.PLANNING,
        Status.ACTIVE,
        Status.COMPLETED,
        Status.ARCHIVED
    ],
}