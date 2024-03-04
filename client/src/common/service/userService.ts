const server = "http://5.230.229.206:6284";

export async function winsUpdate(uName: string, wins: number) {
    fetch(`${server}/api/user/winsUpdate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uName: `${uName}`,
            newWins: `${wins}`
        })
    });
}

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

export async function userLogInCheckAndGetUserWins(uName: string, passW: string) {
    const response = await fetch(`${server}/api/user/loginAndWins`, {
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