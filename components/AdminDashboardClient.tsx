"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Users,
  Building2,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  ChevronDown,
  HeartPulse,
  Brain,
  Baby,
  Eye,
  Bone,
  Microscope,
  Activity,
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
  Badge,
  Ear,
  Smile,
  Scissors,
  FlaskConical,
  Apple,
  Clipboard,
  Sparkles,
} from "lucide-react";

// Types
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image_url: string | null;
  created_at: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

interface DoctorFormData {
  name: string;
  specialty: string;
  bio: string;
  image_url: string;
}

interface DepartmentFormData {
  name: string;
  description: string;
  icon: string;
}

// Available icons (name -> Lucide component)
const DEPARTMENT_ICON_MAP = {
  HeartPulse,
  Brain,
  Baby,
  Eye,
  Bone,
  Microscope,
  Activity,
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
  Badge,
  Ear,
  Smile,
  Scissors,
  FlaskConical,
  Apple,
  Clipboard,
  Sparkles,
} as const;

type DepartmentIconName = keyof typeof DEPARTMENT_ICON_MAP;
const DEPARTMENT_ICONS = Object.keys(DEPARTMENT_ICON_MAP) as DepartmentIconName[];

const normalizeDepartmentIcon = (iconName: string): DepartmentIconName =>
  iconName in DEPARTMENT_ICON_MAP
    ? (iconName as DepartmentIconName)
    : DEPARTMENT_ICONS[0];

const getDepartmentIcon = (iconName: string) =>
  DEPARTMENT_ICON_MAP[normalizeDepartmentIcon(iconName)];

// Supabase API functions (defined inline to avoid module import issues during build)

// Client for read operations (uses anon key, respects RLS)
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // Dynamic import to avoid SSR issues
  const { createClient } = require('@supabase/supabase-js');
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Admin client for write operations (uses service_role key, bypasses RLS)
const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  // Note: In production, consider using API routes instead of exposing service_role key
  const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  console.log('[Admin Client Debug] URL exists:', !!supabaseUrl);
  console.log('[Admin Client Debug] Service Role Key exists:', !!serviceRoleKey);
  console.log('[Admin Client Debug] Service Role Key length:', serviceRoleKey.length);

  // Show first/last 10 chars of key to verify it's correct
  if (serviceRoleKey) {
    console.log('[Admin Client Debug] Key starts with:', serviceRoleKey.substring(0, 10) + '...');
    console.log('[Admin Client Debug] Key ends with:', '...' + serviceRoleKey.substring(serviceRoleKey.length - 10));
  }

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('[Admin Client Debug] Service role key not configured. Admin operations will fail with RLS.');
    return null;
  }

  // Dynamic import to avoid SSR issues
  const { createClient } = require('@supabase/supabase-js');
  console.log('[Admin Client Debug] Creating admin client with service_role key...');
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && url !== 'your_supabase_project_url_here' && key !== 'your_supabase_anon_key_here';
};

const isAdminConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKeyPublic = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  const serviceKeyServer = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceKey = serviceKeyPublic || serviceKeyServer;

  // Debug logging to help diagnose env variable issues
  console.log('[Admin Config Debug] NEXT_PUBLIC_SUPABASE_URL:', url ? '✓ SET' : '✗ MISSING');
  console.log('[Admin Config Debug] NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:', serviceKeyPublic ? `✓ SET (length: ${serviceKeyPublic.length})` : '✗ MISSING');
  console.log('[Admin Config Debug] SUPABASE_SERVICE_ROLE_KEY (server):', serviceKeyServer ? `✓ SET (length: ${serviceKeyServer.length})` : '✗ MISSING');

  const isValid = url && serviceKey &&
    serviceKey !== 'your_supabase_service_role_key_here' &&
    !serviceKey.includes('your_supabase');

  console.log('[Admin Config Debug] isAdminConfigured:', isValid ? '✓ TRUE' : '✗ FALSE');

  return isValid;
};

async function getDoctors(): Promise<Doctor[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabase();
  if (!supabase) return [];

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

async function createDoctor(doctor: Omit<Doctor, 'id' | 'created_at'>): Promise<Doctor | null> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot create doctor.');
    return null;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

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

async function updateDoctor(id: string, doctor: Partial<Omit<Doctor, 'id' | 'created_at'>>): Promise<Doctor | null> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot update doctor.');
    return null;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

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

async function deleteDoctor(id: string): Promise<boolean> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot delete doctor.');
    return false;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

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

async function getDepartments(): Promise<Department[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabase();
  if (!supabase) return [];

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

async function createDepartment(department: Omit<Department, 'id' | 'created_at'>): Promise<Department | null> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot create department.');
    return null;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

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

async function updateDepartment(id: string, department: Partial<Omit<Department, 'id' | 'created_at'>>): Promise<Department | null> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot update department.');
    return null;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

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

async function deleteDepartment(id: string): Promise<boolean> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot delete department.');
    return false;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

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

async function uploadDoctorImage(file: File, doctorId: string): Promise<string | null> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot upload image.');
    return null;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

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

  const { data: { publicUrl } } = supabase.storage
    .from('doctor-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

async function deleteDoctorImage(imageUrl: string): Promise<boolean> {
  if (!isAdminConfigured()) {
    console.error('Admin not configured. Cannot delete image.');
    return false;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

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

export default function AdminDashboardClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"doctors" | "departments">("doctors");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseError, setSupabaseError] = useState(false);
  const [adminConfigError, setAdminConfigError] = useState(false);

  // Modal states
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  // Form states
  const [doctorForm, setDoctorForm] = useState<DoctorFormData>({
    name: "",
    specialty: "",
    bio: "",
    image_url: "",
  });
  const [departmentForm, setDepartmentForm] = useState<DepartmentFormData>({
    name: "",
    description: "",
    icon: DEPARTMENT_ICONS[0],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: log adminConfigError state changes
  useEffect(() => {
    console.log('[Admin Config Debug] adminConfigError state changed to:', adminConfigError);
  }, [adminConfigError]);

  // Check authentication
  useEffect(() => {
    if (!mounted) return;
    const checkAuth = () => {
      const token = localStorage.getItem("er_med_admin_token");
      if (!token) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router, mounted]);

  // Load data
  useEffect(() => {
    if (!mounted) return;
    loadData();
  }, [mounted]);

  const loadData = async () => {
    setLoading(true);
    setSupabaseError(false);
    setAdminConfigError(false);
    console.log('[Admin Config Debug] loadData started, reset adminConfigError to false');
    try {
      const [docs, depts] = await Promise.all([getDoctors(), getDepartments()]);
      setDoctors(docs);
      setDepartments(depts);

      const supabaseOk = isSupabaseConfigured();
      const adminOk = isAdminConfigured();

      console.log('[Admin Config Debug] isSupabaseConfigured:', supabaseOk);
      console.log('[Admin Config Debug] isAdminConfigured:', adminOk);

      if (!supabaseOk) {
        console.log('[Admin Config Debug] Setting supabaseError to TRUE');
        setSupabaseError(true);
      }
      if (!adminOk) {
        console.log('[Admin Config Debug] Setting adminConfigError to TRUE');
        setAdminConfigError(true);
      } else {
        console.log('[Admin Config Debug] Admin config OK, keeping adminConfigError as FALSE');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setSupabaseError(true);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("er_med_admin_token");
    router.push("/admin/login");
  };

  // Doctor handlers
  const openDoctorModal = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setDoctorForm({
        name: doctor.name,
        specialty: doctor.specialty,
        bio: doctor.bio,
        image_url: doctor.image_url || "",
      });
    } else {
      setEditingDoctor(null);
      setDoctorForm({ name: "", specialty: "", bio: "", image_url: "" });
    }
    setImageFile(null);
    setShowDoctorModal(true);
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      alert("Supabase əvvəlcə quraşdırılmalıdır!");
      return;
    }
    setSubmitting(true);

    let imageUrl = doctorForm.image_url;

    if (imageFile) {
      const tempId = editingDoctor?.id || "new";
      const uploadedUrl = await uploadDoctorImage(imageFile, tempId);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const doctorData = { ...doctorForm, image_url: imageUrl };

    if (editingDoctor) {
      await updateDoctor(editingDoctor.id, doctorData);
    } else {
      await createDoctor(doctorData);
    }

    await loadData();
    setShowDoctorModal(false);
    setSubmitting(false);
  };

  const handleDeleteDoctor = async (doctor: Doctor) => {
    if (!confirm(`"${doctor.name}" həkimini silmək istədiyinizə əminsiniz?`)) return;
    if (!isSupabaseConfigured()) {
      alert("Supabase əvvəlcə quraşdırılmalıdır!");
      return;
    }

    if (doctor.image_url) {
      await deleteDoctorImage(doctor.image_url);
    }
    await deleteDoctor(doctor.id);
    await loadData();
  };

  // Department handlers
  const openDepartmentModal = (department?: Department) => {
    if (department) {
      setEditingDepartment(department);
      setDepartmentForm({
        name: department.name,
        description: department.description,
        icon: normalizeDepartmentIcon(department.icon),
      });
    } else {
      setEditingDepartment(null);
      setDepartmentForm({ name: "", description: "", icon: DEPARTMENT_ICONS[0] });
    }
    setIsIconDropdownOpen(false);
    setShowDepartmentModal(true);
  };

  const handleDepartmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      alert("Supabase əvvəlcə quraşdırılmalıdır!");
      return;
    }
    setSubmitting(true);

    if (editingDepartment) {
      await updateDepartment(editingDepartment.id, departmentForm);
    } else {
      await createDepartment(departmentForm);
    }

    await loadData();
    setShowDepartmentModal(false);
    setSubmitting(false);
  };

  const handleDeleteDepartment = async (department: Department) => {
    if (!confirm(`"${department.name}" şöbəsini silmək istədiyinizə əminsiniz?`)) return;
    if (!isSupabaseConfigured()) {
      alert("Supabase əvvəlcə quraşdırılmalıdır!");
      return;
    }

    await deleteDepartment(department.id);
    await loadData();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">ER</span>
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Çıxış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Supabase Error Warning */}
        {supabaseError && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 font-medium">
              ⚠️ Supabase əvvəlcə quraşdırılmalıdır!
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Zəhmət olmasa .env.local faylında Supabase məlumatlarını daxil edin və cədvəlləri yaradın.
            </p>
          </div>
        )}

        {/* Admin Config Error Warning */}
        {adminConfigError && !supabaseError && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-orange-800 font-medium">
              ⚠️ Admin əməliyyatları üçün SERVICE_ROLE_KEY tələb olunur!
            </p>
            <p className="text-orange-700 text-sm mt-1">
              Yazı əməliyyatları (əlavə, sil, redaktə) üçün SUPABASE_SERVICE_ROLE_KEY əlavə edilməlidir.
              Məlumatları oxumaq işləyəcək, amma dəyişikliklər mümkün olmayacaq.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("doctors")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "doctors"
              ? "bg-navy text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Users className="w-5 h-5" />
            <span>Həkimlər ({doctors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("departments")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "departments"
              ? "bg-navy text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Şöbələr ({departments.length})</span>
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() =>
              activeTab === "doctors" ? openDoctorModal() : openDepartmentModal()
            }
            className="flex items-center space-x-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{activeTab === "doctors" ? "Yeni Həkim" : "Yeni Şöbə"}</span>
          </button>
        </div>

        {/* Doctors List */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Şəkil
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Ad Soyad
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      İxtisas
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Bioqrafiya
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {doctor.image_url ? (
                          <img
                            src={doctor.image_url}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                            {doctor.name.charAt(0)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">
                        {doctor.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {doctor.specialty}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {doctor.bio}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openDoctorModal(doctor)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDoctor(doctor)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {doctors.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                {supabaseError ? "Supabase quraşdırıldıqdan sonra həkimlər əlavə edə bilərsiniz" : "Hələ heç bir həkim əlavə edilməyib"}
              </div>
            )}
          </div>
        )}

        {/* Departments List */}
        {activeTab === "departments" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      İkon
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Ad
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Təsviri
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Əməliyyatlar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {departments.map((department) => (
                    <tr key={department.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          {(() => {
                            const DepartmentIcon = getDepartmentIcon(department.icon);
                            return <DepartmentIcon className="w-5 h-5 text-navy" />;
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">
                        {department.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                        {department.description}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openDepartmentModal(department)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDepartment(department)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {departments.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                {supabaseError ? "Supabase quraşdırıldıqdan sonra şöbələr əlavə edə bilərsiniz" : "Hələ heç bir şöbə əlavə edilməyib"}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Doctor Modal */}
      <AnimatePresence>
        {showDoctorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDoctorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy">
                  {editingDoctor ? "Həkimi Redaktə Et" : "Yeni Həkim Əlavə Et"}
                </h2>
                <button
                  onClick={() => setShowDoctorModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleDoctorSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={doctorForm.name}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İxtisas *
                  </label>
                  <input
                    type="text"
                    value={doctorForm.specialty}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, specialty: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    required
                    placeholder="Məs: Kardioloq, Nevroloq"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bioqrafiya
                  </label>
                  <textarea
                    value={doctorForm.bio}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, bio: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    rows={3}
                    placeholder="Qısa bioqrafiya və təcrübə"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şəkil
                  </label>
                  <div className="space-y-3">
                    {doctorForm.image_url && !imageFile && (
                      <div className="flex items-center space-x-3">
                        <img
                          src={doctorForm.image_url}
                          alt="Current"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <span className="text-sm text-gray-500">
                          Cari şəkil
                        </span>
                      </div>
                    )}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="doctor-image"
                      />
                      <label
                        htmlFor="doctor-image"
                        className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-navy hover:bg-primary-50 cursor-pointer transition-colors"
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">
                          {imageFile ? imageFile.name : "Şəkil yüklə"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDoctorModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-navy text-white px-4 py-3 rounded-xl font-semibold hover:bg-navy-light transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : editingDoctor ? (
                      "Yadda saxla"
                    ) : (
                      "Əlavə et"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Department Modal */}
      <AnimatePresence>
        {showDepartmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDepartmentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy">
                  {editingDepartment ? "Şöbəni Redaktə Et" : "Yeni Şöbə Əlavə Et"}
                </h2>
                <button
                  onClick={() => setShowDepartmentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleDepartmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şöbə Adı *
                  </label>
                  <input
                    type="text"
                    value={departmentForm.name}
                    onChange={(e) =>
                      setDepartmentForm({ ...departmentForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İkon *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsIconDropdownOpen((prev) => !prev)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none text-left flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        {(() => {
                          const SelectedIcon = getDepartmentIcon(departmentForm.icon);
                          return <SelectedIcon className="w-4 h-4 text-navy" />;
                        })()}
                        <span>{normalizeDepartmentIcon(departmentForm.icon)}</span>
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>

                    {isIconDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                        {Object.entries(DEPARTMENT_ICON_MAP).map(([iconName, IconComponent]) => (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => {
                              setDepartmentForm({ ...departmentForm, icon: iconName });
                              setIsIconDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left hover:bg-primary-50 transition-colors flex items-center space-x-2 ${departmentForm.icon === iconName ? "bg-primary-50" : ""
                              }`}
                          >
                            <IconComponent className="w-4 h-4 text-navy" />
                            <span>{iconName}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
                    {(() => {
                      const SelectedIcon = getDepartmentIcon(departmentForm.icon);
                      return <SelectedIcon className="w-3.5 h-3.5 text-navy" />;
                    })()}
                    <span>Seçilmiş ikon: {normalizeDepartmentIcon(departmentForm.icon)}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Təsviri
                  </label>
                  <textarea
                    value={departmentForm.description}
                    onChange={(e) =>
                      setDepartmentForm({ ...departmentForm, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    rows={3}
                    placeholder="Şöbənin təsviri"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDepartmentModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-navy text-white px-4 py-3 rounded-xl font-semibold hover:bg-navy-light transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : editingDepartment ? (
                      "Yadda saxla"
                    ) : (
                      "Əlavə et"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
