const server = "http://localhost:6284";

export async function register(uName: string, passW: string) {
    fetch(`${server}/api/user/register`, {
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

export async function login(uName: string, passW: string) {
    const response = await fetch(`${server}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: `${uName}`,
            password: `${passW}`
        })
    });

    return response.json();
}