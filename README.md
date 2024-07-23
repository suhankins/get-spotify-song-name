# Get Spotify song name

[![Website screenshot](https://github.com/user-attachments/assets/383595d8-97e1-4a2d-8eac-8503794a215d)](https://spotify.detta.dev/?url=https://open.spotify.com/track/6Cxzd8UyB28Grofsy17tfF)

Gets name of the song and artist from Spotify URL, so you can look your favorite song up.

Was created for cases when you want to look up a song titled in a language you can't type. Thanks to it I found out that [one song I listened to](https://open.spotify.com/track/0xXtMqRj03WabqHZhAFQNJ) was actually a touhou remix. Who could've thought?

Installable as a PWA, it even registers itself as a Share Target, so you can get links from Spotify app directly into PWA.

## Design goals

* Ship as litte JavaScript as possible
* Have it work even if JavaScript is disabled

## Original project

Astro remake of [Copy Spotify Song Name](https://github.com/suhankins/copy-spotify-song-name) that was made with Next.js. It slightly annoyed me that such a simple app required ~178KB of JS and wouldn't work without JavaScript at all.
