"use client";

import {useQuery} from "@tanstack/react-query";
import AnimatedList from "./animations/scroll";

export default function Projects() {
    const {data, isLoading} = useQuery({
        queryKey: ["repos"], queryFn: () => fetch("api/projects")
            .then(res => res.json()),
    });

    if (isLoading) return <p>Loading...</p>

    return (<div className={"max-h-[400px] overflow-y-auto scroll-smooth w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8"}>
            {data ? <div>
                <AnimatedList
                    items={data.githubRepos}
                    onItemSelect={(item, index) => console.log(item, index)}
                    enableArrowNavigation
                    showGradients={false}
                    displayScrollbar={false}
                />
            </div> : "unable to fetch projects :("}
        </div>);
}
