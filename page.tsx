import "./bsky-widget";

import { AtpAgent } from "@atproto/api";
import type { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import React, { useEffect } from "react";
const agent = new AtpAgent({ service: 'https://api.bsky.app/' });

async function getRandomPost() {
    const res = await agent.app.bsky.feed.getFeed({
        limit: 100,
        feed: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot',
    });

    const feed = res.data.feed;

    const randomIndex = Math.floor(Math.random() * feed.length);
    return feed[randomIndex].post;
}
async function fetchUser(did: string) {
    const profile = await agent.getProfile({
        actor: did
    })

    const followers = await agent.getFollowers({
        actor: did
    })

    return {
        profile: profile.data,
        followers: followers.data.followers
    }
}

function Intro(props: { user: string, starting: string | null, onClose: () => void }) {
    const [user, setUser] = React.useState<Awaited<ReturnType<typeof fetchUser>> | undefined>();
    const [startingUser, setStartingUser] = React.useState<Awaited<ReturnType<typeof fetchUser>> | undefined>();

    useEffect(() => {
        fetchUser(props.user).then(u => setUser(u));
        if (props.starting) {
            fetchUser(props.starting).then(u => setStartingUser(u));
        }
    }, [])

    return user && (!props.starting || startingUser) && <>
        {/* Overlay */}
        <div style={{
            background: 'rgba(0, 0, 0, 0.80)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
        }}></div>

        <div style={{
            padding: "24px 20px",
            gap: "18px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            border: "1px solid #2E4052",
            backgroundColor: '#161E27',
            color: '#ffffff',
            zIndex: 2,
            display: 'flex'
        }}>
            <div style={{
                display: 'flex',
                gap: '10px',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <span style={{
                    fontSize: '19.675px',
                    fontWeight: 600
                }}>Think you have what it takes?</span>
                <div style={{
                    backgroundColor: '#2E4052',
                    height: '1px',
                    width: '100%',
                }} />
                <span style={{
                    fontSize: '15px',
                    color: '#AEBBC9'
                }}>{props.starting && startingUser ? <>
                    You'll be shown <a href={`https://bsky.app/profile/${startingUser.profile.handle == "handle.invalid" ? startingUser.profile.did : startingUser.profile.handle}`}>{startingUser.profile.displayName || startingUser.profile.handle}</a>'s follower list.
                </> : <>
                    You'll be given a random user from the top 100 on the Discover feed.
                </>}
                    <br />Think you could find <a href={`https://bsky.app/profile/${user.profile.handle == "handle.invalid" ? user.profile.did : user.profile.handle}`}>{user.profile.displayName || user.profile.handle}</a> by going through follower lists?</span>
            </div>
            <bsky-widget
                data-handle={user.profile.did}
                data-show-description={false}
                data-show-banner={true}
            >
            </bsky-widget>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <button className="start-btn" onClick={props.onClose}>
                    Let's Go!
                </button>
                <button className="start-btn" onClick={() => {
                    const user = prompt("Enter someone's user handle:");

                    if (user) {
                        fetchUser(user).then(u => {
                            if (u.profile)
                                location.search = `?user=${user}${props.starting ? `&starting=${props.starting}` : ""}`;
                            else
                                alert("That user doesn't exist. Did you type their name in correctly?")
                        }).catch(() => {
                            alert("That user doesn't exist. Did you type their name in correctly?");
                        })
                    }
                }}>
                    Choose someone else to find!
                </button>
            </div>
        </div>
    </>
}

function Win(props: { user: Awaited<ReturnType<typeof fetchUser>>, path: { displayName: string | undefined, handle: string }[] }) {
    return <>
        {/* Overlay */}
        <div style={{
            background: 'rgba(0, 0, 0, 0.80)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            backdropFilter: 'blur(12px)',
        }}></div>

        <div style={{
            position: 'fixed',
            zIndex: 999,
            padding: "24px 20px",
            gap: "18px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            border: "1px solid #2E4052",
            backgroundColor: '#161E27',
            color: '#ffffff',
            display: 'flex',
            height: '75%',
            width: '75%',
        }}>
            <div style={{
                display: 'flex',
                gap: '10px',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                <span style={{
                    fontSize: '19.675px',
                    fontWeight: 600
                }}>You found {props.user.profile.displayName || props.user.profile.handle}!</span>
                <div style={{
                    backgroundColor: '#2E4052',
                    height: '1px',
                    width: '100%',
                }} />
                <span style={{
                    fontSize: '15px',
                    color: '#AEBBC9'
                }}>Great job! It took you <strong>{props.path.length}</strong> users to find them. Here's the path you took:</span>
                <div style={{
                    display: 'flex',
                    padding: '12px',
                    justifyContent: 'center',
                    gap: '12px',
                    flex: '1 0 0',
                    alignSelf: 'stretch',
                    flexWrap: 'wrap',
                    overflowY: 'scroll',
                    width: '100%',
                    height: '100%',
                }}>
                    {props.path.map((user, index) => {
                        return <Follower
                            key={index}
                            displayName={user.displayName}
                            handle={user.handle}
                            onClick={() => { }}
                        />
                    })}
                </div>
            </div>
        </div>
    </>
}

function Follower({ displayName, handle, onClick }: { displayName: string | undefined, handle: string, onClick: () => void }) {
    return (
        <div style={{
            display: 'flex',
            padding: '12px 26px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '8px',
            borderRadius: '8px',
            background: '#FFF',
            width: '275px',
            height: '85px',
        }} onClick={onClick} className="follower">
            <span style={{
                color: '#000',
                textOverflow: 'ellipsis',
                fontSize: '22.4px',
                fontWeight: 700,
                flex: '1 0 0',
                alignSelf: 'stretch',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}>
                {displayName || handle}
            </span>
            <span style={{
                color: '#000',
                fontSize: '16px',
                textOverflow: 'ellipsis',
                fontWeight: 400,
                flex: '1 0 0',
                alignSelf: 'stretch',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}>
                {handle == "handle.invalid" ? "Invalid Handle" : <>{handle}</>}
            </span>
        </div>
    );
}

function Game({ currentUser, onNewFollower }: { currentUser: Awaited<ReturnType<typeof fetchUser>>, onNewFollower: (follower: ProfileView) => void }) {
    console.log(currentUser)
    const handle = currentUser.profile.handle == "handle.invalid" ? "Invalid Handle" : currentUser.profile.handle;

    return <div style={{
        display: 'flex',
        padding: '64px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '18px',
        height: '100vh',
        overflowY: 'hidden'
    }}>
        <span style={{
            fontSize: '18.675px',
            fontWeight: 600
        }}>{currentUser.profile.displayName ? `${currentUser.profile.displayName} (${handle})` : handle}'s followers:</span>
        <div style={{
            display: 'flex',
            padding: '12px',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            gap: '12px',
            flex: '1 0 0',
            alignSelf: 'stretch',
            flexWrap: 'wrap',
            overflowY: 'scroll',
        }}>
            {currentUser.followers.map((follower, index) => {
                return <Follower
                    key={index}
                    displayName={follower.displayName}
                    handle={follower.handle}
                    onClick={() => onNewFollower(follower)}
                />
            })}
        </div>
    </div>
}

function Index(props: { user: string, starting: string | null }) {
    const [started, setStarted] = React.useState(false);
    const [won, setWon] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState<
        Awaited<
            ReturnType<typeof fetchUser>
        > | undefined
    >(undefined);
    const [path, setPath] = React.useState<{ displayName: string | undefined, handle: string }[]>([]);

    return <>
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Skyrace</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />

            <style>{`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #FFF;
}

bsky-widget {
    min-height: 275px;
    width: 100%;
    color: initial;
}

a {
    color: #208BFE;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.start-btn {
    display: flex;
    padding: 13px 20px;
    border-radius: 999px;
    background-color: #208BFE;
    transition: background-color 0.3s ease;
    font-weight: 600;
    user-select: none;
    z-index: 2;
    font-family: Inter;
    font-size: 15px;
    border: none;
}

.start-btn:hover {
    background-color: #4CA2FE;
    cursor: pointer;
}

follower:hover {
    cursor: pointer;
}
`}
            </style>
        </head>
        <body style={{
            background: '#161E27',
            display: 'flex',
            padding: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
            height: '100%',
            width: '100%',
        }}>
            {started ? <>
                {currentUser && <Game currentUser={currentUser} onNewFollower={async (follower: ProfileView) => {
                    const user = await fetchUser(follower.did);
                    if (user.profile.did == props.user || user.profile.handle == props.user) {
                        setCurrentUser(user);
                        setWon(true);
                    } else {
                        if (user.followers.length == 0) {
                            alert("Whoops - " + user.profile.displayName || user.profile.handle + " has no followers. Try someone else.")
                            return;
                        }
                        setCurrentUser(user);

                        setPath([
                            ...path,
                            {
                                displayName: user.profile.displayName,
                                handle: user.profile.handle
                            }
                        ]);
                    }
                }} />}

                {won && <Win user={currentUser!} path={path} />}
            </> :
                <Intro user={props.user} starting={props.starting} onClose={async () => {
                    if (props.starting) {
                        const user = await fetchUser(props.starting);

                        setCurrentUser(user);

                        setPath([
                            ...path,
                            {
                                displayName: user.profile.displayName,
                                handle: user.profile.handle
                            }
                        ]);
                    } else {
                        const post = await getRandomPost();
                        const user = await fetchUser(post.author.did);

                        setCurrentUser(user);

                        setPath([
                            ...path,
                            {
                                displayName: user.profile.displayName,
                                handle: user.profile.handle
                            }
                        ]);
                    }

                    setStarted(true)
                }} />}

            <script
                src="https://unpkg.com/bsky-widget@~0.0/dist/index.js"
                type="module"
            >
            </script>
        </body>
    </>
}

import { createRoot } from "react-dom/client";

const searchParams = new URLSearchParams(window.location.search);

const user = searchParams.get("user") || "imlunahey.com";
const starting = searchParams.get("starting");

const root = createRoot(document.getElementById("root")!);
root.render(<Index user={user} starting={starting} />);