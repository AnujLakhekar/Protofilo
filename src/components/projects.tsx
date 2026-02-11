import React from 'react';
import { Github } from 'lucide-react';

const projectsData = [
    { name: 'Quize', url: '#' },
    { name: 'Redord', url: '#' },
    { name: 'schologama', url: '#' },
    { name: 'TicTacToaV2', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'vibe', url: '#' },
];

const Projects = () => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8">
            {projectsData.map((project, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-[#18181b] rounded-md px-3 py-2 sm:px-4 sm:py-3 w-full hover:scale-[1.01] transition-transform">
                    <Github className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-slate-200 font-medium text-base sm:text-lg">{project.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Projects;
