"use client";

import { useEffect, useState } from "react";
import AboutPanel from '../../../components/AboutPanel';
import { getAboutData, type AboutData } from "@/lib/firestoreService";
import Skeleton from "@/components/ui/skeleton";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error("Error loading about data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-12 md:px-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AboutPanel 
        intro={aboutData?.intro}
        careerSummary={aboutData?.careerSummary}
        skills={aboutData?.skills}
      />
    </div>
  );
};

export default AboutPage;
