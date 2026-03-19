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
import { db } from "./firebase";

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
    await updateDoc(doc(db, "projects", id), project);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
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
    await updateDoc(doc(db, "featuredProjects", id), project);
  } catch (error) {
    console.error("Error updating featured project:", error);
    throw error;
  }
};

export const deleteFeaturedProject = async (id: string) => {
  try {
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
    await setDoc(doc(db, "portfolio", "about"), {
      ...about,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating about data:", error);
    throw error;
  }
};
