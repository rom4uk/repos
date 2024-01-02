async function getRepositories(query: string): Promise<Response> {
    return await fetch(`https://api.github.com/search/repositories?q=${query}`);
}

export {
    getRepositories,
} 