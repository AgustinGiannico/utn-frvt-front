export interface Edifice {
    id_edifice: number;
    name: string;
    num_tag: string;
    street: string;
    number: number;
    location: string;   // Nombre de la ubicación
    province: string;   // Nombre de la provincia
    available: string;  // Estado de disponibilidad
    id_location: number; // ID de la ubicación
    id_province: number; // ID de la provincia
    id_available: number; // ID de disponibilidad
}
