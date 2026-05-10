import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client only if credentials are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // Will be checked before use

const isSupabaseConfigured = () => supabase && supabaseUrl && supabaseAnonKey;

// Types for our database tables
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  education?: string;
  experience?: string;
  image_url: string | null;
  created_at: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

// Available icon names for departments (matching lucide-react icons)
export const DEPARTMENT_ICONS = [
  'HeartPulse',
  'Brain',
  'Baby',
  'Eye',
  'Bone',
  'Microscope',
  'Activity',
  'Pill',
  'Stethoscope',
  'Syringe',
  'Thermometer',
  'Badge',
] as const;

// Doctors API
export async function getDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }

  return data || [];
}

export async function createDoctor(doctor: Omit<Doctor, 'id' | 'created_at'>): Promise<Doctor | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot create doctor.');
    return null;
  }

  const { data, error } = await supabase
    .from('doctors')
    .insert([doctor])
    .select()
    .single();

  if (error) {
    console.error('Error creating doctor:', error);
    return null;
  }

  return data;
}

export async function updateDoctor(id: string, doctor: Partial<Omit<Doctor, 'id' | 'created_at'>>): Promise<Doctor | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot update doctor.');
    return null;
  }

  const { data, error } = await supabase
    .from('doctors')
    .update(doctor)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating doctor:', error);
    return null;
  }

  return data;
}

export async function deleteDoctor(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot delete doctor.');
    return false;
  }

  const { error } = await supabase
    .from('doctors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting doctor:', error);
    return false;
  }

  return true;
}

// Departments API
export async function getDepartments(): Promise<Department[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Returning empty departments array.');
    return [];
  }

  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching departments:', error);
    return [];
  }

  return data || [];
}

export async function createDepartment(department: Omit<Department, 'id' | 'created_at'>): Promise<Department | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot create department.');
    return null;
  }

  const { data, error } = await supabase
    .from('departments')
    .insert([department])
    .select()
    .single();

  if (error) {
    console.error('Error creating department:', error);
    return null;
  }

  return data;
}

export async function updateDepartment(id: string, department: Partial<Omit<Department, 'id' | 'created_at'>>): Promise<Department | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot update department.');
    return null;
  }

  const { data, error } = await supabase
    .from('departments')
    .update(department)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating department:', error);
    return null;
  }

  return data;
}

export async function deleteDepartment(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot delete department.');
    return false;
  }

  const { error } = await supabase
    .from('departments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting department:', error);
    return false;
  }

  return true;
}

// Storage API for image uploads
export async function uploadDoctorImage(file: File, doctorId: string): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot upload image.');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${doctorId}-${Date.now()}.${fileExt}`;
  const filePath = `doctor-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('doctor-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('doctor-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteDoctorImage(imageUrl: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot delete image.');
    return false;
  }

  // Extract path from URL
  const pathMatch = imageUrl.match(/doctor-images\/[^?]+/);
  if (!pathMatch) return false;

  const { error } = await supabase.storage
    .from('doctor-images')
    .remove([pathMatch[0]]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}
