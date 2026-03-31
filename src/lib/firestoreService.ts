import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Types
export interface Project {
  id?: string;
  title: string;
  summary: string;
  status: "Planned" | "In Progress" | "Live";
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  createdAt: number;
}

export interface FeaturedProject {
  id?: string;
  title: string;
  desc: string;
  tags: string[];
  createdAt: number;
}

export interface CurrentState {
  id?: string;
  title: string;
  description: string;
  status: string;
  updatedAt: number;
}

export interface AboutData {
  id?: string;
  intro: string;
  careerSummary: string;
  skills: string[];
  updatedAt: number;
}

export interface BlogDocBlock {
  type: "heading" | "paragraph" | "code" | "list";
  content?: string;
  items?: string[];
  language?: string;
}

export interface BlogDoc {
  id?: string;
  sid: string;
  appName: string;
  title: string;
  summary: string;
  tags: string[];
  blocks: BlogDocBlock[];
  createdAt: number;
  updatedAt: number;
}

const getAllowedAdminEmails = (): string[] => {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

const assertAdminWriteAccess = () => {
  const allowedEmails = getAllowedAdminEmails();
  const currentEmail = auth.currentUser?.email?.toLowerCase();

  if (!currentEmail || !allowedEmails.includes(currentEmail)) {
    throw new Error("Unauthorized admin write operation");
  }
};

// Projects Collection
export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, "projects"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const addProject = async (project: Omit<Project, "id" | "createdAt">) => {
  try {
    assertAdminWriteAccess();
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const updateProject = async (
  id: string,
  project: Partial<Project>
) => {
  try {
    assertAdminWriteAccess();
    await updateDoc(doc(db, "projects", id), project);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    assertAdminWriteAccess();
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Featured Projects Collection
export const getFeaturedProjects = async (): Promise<FeaturedProject[]> => {
  try {
    const q = query(
      collection(db, "featuredProjects"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as FeaturedProject)
    );
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
};

export const addFeaturedProject = async (
  project: Omit<FeaturedProject, "id" | "createdAt">
) => {
  try {
    assertAdminWriteAccess();
    const docRef = await addDoc(collection(db, "featuredProjects"), {
      ...project,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding featured project:", error);
    throw error;
  }
};

export const updateFeaturedProject = async (
  id: string,
  project: Partial<FeaturedProject>
) => {
  try {
    assertAdminWriteAccess();
    await updateDoc(doc(db, "featuredProjects", id), project);
  } catch (error) {
    console.error("Error updating featured project:", error);
    throw error;
  }
};

export const deleteFeaturedProject = async (id: string) => {
  try {
    assertAdminWriteAccess();
    await deleteDoc(doc(db, "featuredProjects", id));
  } catch (error) {
    console.error("Error deleting featured project:", error);
    throw error;
  }
};

// Current State Collection
export const getCurrentState = async (): Promise<CurrentState | null> => {
  try {
    const docSnap = await getDoc(doc(db, "portfolio", "currentState"));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as CurrentState;
    }
    return null;
  } catch (error) {
    console.error("Error fetching current state:", error);
    return null;
  }
};

export const updateCurrentState = async (state: Omit<CurrentState, "id" | "updatedAt">) => {
  try {
    assertAdminWriteAccess();
    await setDoc(doc(db, "portfolio", "currentState"), {
      ...state,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating current state:", error);
    throw error;
  }
};

// About Data Collection
export const getAboutData = async (): Promise<AboutData | null> => {
  try {
    const docSnap = await getDoc(doc(db, "portfolio", "about"));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as AboutData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};

export const updateAboutData = async (about: Omit<AboutData, "id" | "updatedAt">) => {
  try {
    assertAdminWriteAccess();
    await setDoc(doc(db, "portfolio", "about"), {
      ...about,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating about data:", error);
    throw error;
  }
};

// Blog Docs Collection
export const getBlogDocs = async (): Promise<BlogDoc[]> => {
  try {
    const q = query(collection(db, "blogDocs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BlogDoc));
  } catch (error) {
    console.error("Error fetching blog docs:", error);
    return [];
  }
};

export const getBlogDocBySid = async (sid: string): Promise<BlogDoc | null> => {
  try {
    const docSnap = await getDoc(doc(db, "blogDocs", sid));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as BlogDoc;
  } catch (error) {
    console.error("Error fetching blog doc:", error);
    return null;
  }
};

export const addBlogDoc = async (
  blogDoc: Omit<BlogDoc, "id" | "createdAt" | "updatedAt">
) => {
  try {
    assertAdminWriteAccess();
    const now = Date.now();
    const sid = blogDoc.sid.trim().toLowerCase();

    await setDoc(doc(db, "blogDocs", sid), {
      ...blogDoc,
      sid,
      createdAt: now,
      updatedAt: now,
    });

    return sid;
  } catch (error) {
    console.error("Error adding blog doc:", error);
    throw error;
  }
};

export const updateBlogDoc = async (
  sid: string,
  blogDoc: Partial<Omit<BlogDoc, "id" | "sid" | "createdAt">>
) => {
  try {
    assertAdminWriteAccess();
    await updateDoc(doc(db, "blogDocs", sid), {
      ...blogDoc,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating blog doc:", error);
    throw error;
  }
};

export const deleteBlogDoc = async (sid: string) => {
  try {
    assertAdminWriteAccess();
    await deleteDoc(doc(db, "blogDocs", sid));
  } catch (error) {
    console.error("Error deleting blog doc:", error);
    throw error;
  }
};
