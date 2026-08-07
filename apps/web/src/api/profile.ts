import { api } from "./client";

export interface Profile {
id: number;
name: string;
email: string;
professionalSummary?: string | null;
createdAt: string;
}

export async function getProfile() {
const response = await api.get<Profile | null>(
"/api/profile"
);

return response.data;
}

export async function saveProfile(data: {
name: string;
email: string;
professionalSummary?: string;
}) {
const response = await api.put<Profile>(
"/api/profile",
data
);

return response.data;
}