![Skyrace Logo](https://raw.githubusercontent.com/DaInfLoop/skyrace/refs/heads/master/assets/logo.png)

# Skyrace
![time spent](https://waka.hackclub.com/api/badge/U06TBP41C3E/interval:any/project:find-luna?label=time%20spent)
[![made for high seas](https://img.shields.io/badge/made%20for-hack%20club%20high%20seas-fec2fb)](https://high-seas.hackclub.com/)

[WikiRace](https://wiki-race.com/) but Bluesky. Get given a random person on the [Discover](https://bsky.app/?feed=feedgen%7Cat%3A%2F%2Fdid%3Aplc%3Az72i7hdynmk6r22z27h6tvur%2Fapp.bsky.feed.generator%2Fwhats-hot) feed, and try find another person from everyone's following feed!

## Preview
A preview of the site is avaliable at [skyrace.dainfloop.me](https://skyrace.dainfloop.me/).

The preview defaults to [luna](https://bsky.app/profile/imlunahey.com)'s profile: however it can be customized with the `?user=<handle / did>` query param.

The preview also defaults to starting from a random user's account: this can also be customized by using the `?starting=<handle / did>` query param.

## Development
1. Clone the repo and then go into the directory:
```sh
$ git clone https://github.com/DaInfLoop/skyrace.git
$ cd skyrace
```

2. Install dependencies:
```sh
$ bun i
# or
$ npm i
# or
$ yarn
```

3. Mess around and build the project.
```sh
$ bun run build
# or
$ npm run build
# or
$ yarn build
```

> [!IMPORTANT]  
> You need to build the project to be able to run it. For some reason, the site doesn't work otherwise.
>
> React shenanigans. If you manage to fix this, please PR.

### Contributions
Thank you to [@saurabhdaware](https://github.com/saurabhdaware) (Bluesky: [@saurabhd.bsky.social](https://bsky.app/profile/saurabhd.bsky.social)) for [bsky-widget](https://github.com/saurabhdaware/bsky-widget)! I realised too late that it was an actual module, but credits have been given both here and in the file!

Thank you [@ImLunaHey](https://github.com/ImLunaHey) (Bluesky: [@imlunahey.com](https://bsky.app/profile/imlunahey.com)) for giving me the initial idea accidentally :p

And thank you everyone else who:
1. Had a look at the project!
2. Looked and gave feedback during its development!

Without any of the lovely people above, this probably wouldn't have happened.

### License
This website and its source code (excluding `bsky-widget.js`) are licensed under the **MIT License**. A version of it is readable at [LICENSE](/LICENSE).

`bsky-widget.js` is licensed under the **MIT License** by Saurabh Daware. A copy of that license is readable at [`saurabhdaware/bsky-widget/LICENSE`](https://github.com/saurabhdaware/bsky-widget/blob/main/LICENSE).
