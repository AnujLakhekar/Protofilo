import {NextResponse} from "next/server";

export async function GET() {
    const responce = await fetch("https://api.github.com/users/anujLakhekar/repos");
    const data = await responce.json();
    const blocked_Projects = ["anujLakhekar.github.io", "experience", "anuj-lakhekar", "My_All_Projects", "Farmer", "Schologama", "protofilo"];
    const fillter = data.filter(
        (repo: any) =>
            !repo.fork &&
            !repo.archived &&
            repo.visibility === "public" &&
            !blocked_Projects.includes(repo.name)
    );

    const sort_by_date = fillter.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return NextResponse.json({
        githubRepos: sort_by_date.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
        }))
    });
}

