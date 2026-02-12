"use client"
import React from 'react'
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

interface Experience {
    timeline: string;
    company: string;
    role: string;
    description: string;
    languages: string[];
}

interface ExperienceBlockProps {
    experiences?: Experience[];
}

const ExperienceBlock: React.FC<ExperienceBlockProps> = ({ experiences }) => {
    useQueryClient(); // If not used, can be removed
    // Always call useQuery, but only use its data if experiences is not provided
    const { data, isLoading, error } = useQuery({
        queryKey: ['experience'],
        queryFn: async () => {
            const response = await fetch('/api/experience');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !experiences,
    });
    // Ensure message is always an array for mapping
    const message: Experience[] = experiences || data?.message || [];
    if (!message.length && isLoading && !error) return <p>Loading...</p>;
    if (!message.length) return <p>No experience data found.</p>;
    return (
        <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8">
            {message.map((experience: Experience, index: number) => {
                return (
                    <div key={index} className="mb-8 border border-green-300 p-2 sm:p-3 hover:rounded transition-all bg-green-300/10">
                        <h3 className="text-lg sm:text-xl text-green-500 font-semibold">{experience.role} at {experience.company}</h3>
                        <p className="text-xs sm:text-sm text-green-600">{experience.timeline}</p>
                        <p className="mt-2 text-green-200 text-sm sm:text-base">{experience.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {experience.languages.map((language: string, langIndex: number) => (
                                <span key={langIndex} className="inline-block bg-green-300 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                                    {language}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export default ExperienceBlock
