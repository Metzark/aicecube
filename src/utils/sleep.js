// Sleep for ms number of milliseconds
export function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
