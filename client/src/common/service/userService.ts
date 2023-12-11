
const server = "http://localhost:6284";

export async function register(uName: string, passW: string) {
    fetch(`${server}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: `${uName}`,
            password: `${passW}`
        })
    });
}