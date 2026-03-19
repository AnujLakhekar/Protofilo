"use client";

import { useEffect, useState } from "react";
import AboutPanel from '../../../components/AboutPanel';
import { getAboutData, type AboutData } from "@/lib/firestoreService";

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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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
