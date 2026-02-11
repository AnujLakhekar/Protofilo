import React from 'react';

interface Experience {
  timeline: string;
  company: string;
  role: string;
  description: string;
  languages: string[];
}

interface ExperienceBlockProps {
  experiences: Experience[];
}

const ExperienceBlock: React.FC<ExperienceBlockProps> = ({ experiences }) => {
  return (
    <div>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-8">
          <p className="text-sm text-slate-400">{exp.timeline}</p>
          <h3 className="text-lg font-semibold text-slate-200">{exp.role} at {exp.company}</h3>
          <p className="mt-2 text-slate-400">{exp.description}</p>
          <div className="mt-2 flex gap-2">
            {exp.languages.map((lang, i) => (
              <span key={i} className="bg-teal-400/10 text-teal-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceBlock;
