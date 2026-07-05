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
  education?: string;
  experience?: string;
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
  education?: string;
  experience?: string;
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

// LocalStorage API functions
const STORAGE_KEYS = {
  DOCTORS: 'er_med_doctors',
  DEPARTMENTS: 'er_med_departments',
};

function getDoctorsFromStorage(): Doctor[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.DOCTORS);
  return stored ? JSON.parse(stored) : [];
}

function saveDoctorsToStorage(doctors: Doctor[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
}

function getDepartmentsFromStorage(): Department[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
  return stored ? JSON.parse(stored) : [];
}

function saveDepartmentsToStorage(departments: Department[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
}

function createDoctor(doctor: Omit<Doctor, 'id' | 'created_at'>): Doctor {
  const newDoctor: Doctor = {
    ...doctor,
    id: `doctor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  const doctors = getDoctorsFromStorage();
  doctors.unshift(newDoctor);
  saveDoctorsToStorage(doctors);
  return newDoctor;
}

function updateDoctor(id: string, updates: Partial<Omit<Doctor, 'id' | 'created_at'>>): Doctor | null {
  const doctors = getDoctorsFromStorage();
  const index = doctors.findIndex(d => d.id === id);
  if (index === -1) return null;

  doctors[index] = { ...doctors[index], ...updates };
  saveDoctorsToStorage(doctors);
  return doctors[index];
}

function deleteDoctor(id: string): boolean {
  const doctors = getDoctorsFromStorage();
  const filtered = doctors.filter(d => d.id !== id);
  if (filtered.length === doctors.length) return false;
  saveDoctorsToStorage(filtered);
  return true;
}

function createDepartment(department: Omit<Department, 'id' | 'created_at'>): Department {
  const newDepartment: Department = {
    ...department,
    id: `dept_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  const departments = getDepartmentsFromStorage();
  departments.unshift(newDepartment);
  saveDepartmentsToStorage(departments);
  return newDepartment;
}

function updateDepartment(id: string, updates: Partial<Omit<Department, 'id' | 'created_at'>>): Department | null {
  const departments = getDepartmentsFromStorage();
  const index = departments.findIndex(d => d.id === id);
  if (index === -1) return null;

  departments[index] = { ...departments[index], ...updates };
  saveDepartmentsToStorage(departments);
  return departments[index];
}

function deleteDepartment(id: string): boolean {
  const departments = getDepartmentsFromStorage();
  const filtered = departments.filter(d => d.id !== id);
  if (filtered.length === departments.length) return false;
  saveDepartmentsToStorage(filtered);
  return true;
}

function uploadDoctorImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function deleteDoctorImage(): boolean {
  // For localStorage, images are stored as base64 strings in the doctor object
  // No separate storage to clean up
  return true;
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"doctors" | "departments">("doctors");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

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
    education: "",
    experience: "",
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

  // Load data from localStorage
  useEffect(() => {
    if (!mounted) return;
    loadData();
  }, [mounted]);

  const loadData = () => {
    setLoading(true);
    try {
      const docs = getDoctorsFromStorage();
      const depts = getDepartmentsFromStorage();
      setDoctors(docs);
      setDepartments(depts);
    } catch (error) {
      console.error('Error loading data:', error);
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
        education: doctor.education || "",
        experience: doctor.experience || "",
      });
    } else {
      setEditingDoctor(null);
      setDoctorForm({ name: "", specialty: "", bio: "", image_url: "", education: "", experience: "" });
    }
    setImageFile(null);
    setShowDoctorModal(true);
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let imageUrl = doctorForm.image_url;

    if (imageFile) {
      try {
        const uploadedUrl = await uploadDoctorImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Şəkil yüklənərkən xəta baş verdi');
        setSubmitting(false);
        return;
      }
    }

    const doctorData = { ...doctorForm, image_url: imageUrl };

    if (editingDoctor) {
      updateDoctor(editingDoctor.id, doctorData);
    } else {
      createDoctor(doctorData);
    }

    loadData();
    setShowDoctorModal(false);
    setSubmitting(false);
  };

  const handleDeleteDoctor = (doctor: Doctor) => {
    if (!confirm(`"${doctor.name}" həkimini silmək istədiyinizə əminsiniz?`)) return;
    deleteDoctor(doctor.id);
    loadData();
  };

  const handleDeleteDoctorImage = () => {
    if (!doctorForm.image_url) return;
    if (!confirm("Həkimin şəklini silmək istədiyinizə əminsiniz?")) return;

    setDoctorForm({ ...doctorForm, image_url: "" });
    if (editingDoctor) {
      updateDoctor(editingDoctor.id, { image_url: null });
      loadData();
    }
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

  const handleDepartmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (editingDepartment) {
      updateDepartment(editingDepartment.id, departmentForm);
    } else {
      createDepartment(departmentForm);
    }

    loadData();
    setShowDepartmentModal(false);
    setSubmitting(false);
  };

  const handleDeleteDepartment = (department: Department) => {
    if (!confirm(`"${department.name}" şöbəsini silmək istədiyinizə əminsiniz?`)) return;
    deleteDepartment(department.id);
    loadData();
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
                Hələ heç bir həkim əlavə edilməyib
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
                Hələ heç bir şöbə əlavə edilməyib
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
                    Təhsil
                  </label>
                  <textarea
                    value={doctorForm.education}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, education: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    rows={2}
                    placeholder="Məs: Azərbaycan Tibb Universiteti, 2015"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Təcrübə
                  </label>
                  <textarea
                    value={doctorForm.experience}
                    onChange={(e) =>
                      setDoctorForm({ ...doctorForm, experience: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                    rows={2}
                    placeholder="Məs: 5 il iş təcrübəsi"
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
                        <div className="flex flex-col space-y-2">
                          <span className="text-sm text-gray-500">
                            Cari şəkil
                          </span>
                          <button
                            type="button"
                            onClick={handleDeleteDoctorImage}
                            className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Şəkli sil</span>
                          </button>
                        </div>
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
