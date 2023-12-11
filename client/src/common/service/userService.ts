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

export async function userWins(uName: string, passW: string) {
    const response = await fetch(`${server}/api/user/wins`, {
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

export async function userCount(uName: string, passW: string) {
    const response = await fetch(`${server}/api/user/count`, {
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