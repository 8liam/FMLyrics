import { useState } from 'react';

export const demoSongList = () => {
    const [songs, setSongs] = useState([
        {
            track: "Zombie",
            artist: "The Cranberries",
            album: "No Need to Argue (The Complete Sessions 1994-1995)",
            image: "https://lastfm.freetls.fastly.net/i/u/300x300/84d8e7ab301df9f5c53f079155f3fdee.jpg",
            songUrl: "https://www.last.fm/music/The+Cranberries/_/Zombie",
            songLyrics: "[Verse 1]\nAnother head hangs lowly\nChild is slowly taken\nAnd the violence caused such silence\nWho are we mistaken?\n\n[Pre-Chorus]\nBut you see, it's not me, it's not my family\nIn your head, in your head, they are fightin'\nWith their tanks and their bombs and their bombs and their guns\nIn your head, in your head, they are cryin'\n\n[Chorus]\nIn your head, in your head\nZombie, zombie, zombie-ie-ie\nWhat's in your head, in your head?\nZombie, zombie, zombie-ie-ie-ie, oh\n\n[Post-Chorus]\nDu, du, du, du\nDu, du, du, du\nDu, du, du, du\nDu, du, du, du\n\n[Verse 2]\nAnother mother's breakin'\nHeart is takin' over\nWhen the violence causes silence\nWe must be mistaken\n\n[Pre-Chorus]\nIt's the same old theme, since 1916\nIn your head, in your head, they're still fightin'\nWith their tanks and their bombs and their bombs and their guns\nIn your head, in your head, they are dyin'\n\n[Chorus]\nIn your head, in your head\nZombie, zombie, zombie-ie-ie\nWhat's in your head, in your head?\nZombie, zombie, zombie-ie-ie-ie, oh-oh-oh-oh-oh-oh-oh, eh-eh-oh, ra-ra\n\n[Instrumental Outro]"
        },
        {
            track: "Wake me Up",
            artist: "Avicii",
            album: "True",
            image: "https://lastfm.freetls.fastly.net/i/u/300x300/f54f3b6ef26445a5bbb8a72f0f7830bd.png",
            songUrl: "https://www.last.fm/music/Avicii/_/Wake+Me+Up",
            songLyrics: "[Verse 1: Aloe Blacc]\nFeelin' my way through the darkness\nGuided by a beatin' heart\nI can't tell where the journey will end\nBut I know where to start\nThey tell me I'm too young to understand\nThey say I'm caught up in a dream\nWell, life will pass me by if I don't open up my eyes\nWell, that's fine by me\n\n[Chorus: Aloe Blacc]\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time, I was findin' myself and I\nDidn't know﻿ I was lost\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time, I was findin' myself and I\nDidn't know﻿ I was lost\n\n[Build]\n\n[Drop]\n\n[Verse 2: Aloe Blacc]\nI tried carryin' the weight of the world\nBut I only have two hands\nHope I get the chance to travel the world\nBut I don't have any plans\nWish that I could stay forever this young\nNot afraid to close my eyes\nLife's a game﻿ made for everyone\nAnd love is the prize\n\n[Chorus: Aloe Blacc]\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time, I was findin' myself and I\nDidn't know﻿ I was lost\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time, I was findin' myself and I\nI didn't know I was lost\n\n[Bridge: Aloe Blacc]\nI didn't know I was lost\nI didn't know I was lost\nI didn't know I was lost\nI didn't know, I didn't know, I didn't know\n\n[Build]\n\n[Drop]"
        },
        {
            track: "Clarity",
            artist: "Zedd",
            album: "Clarity",
            image: "https://lastfm.freetls.fastly.net/i/u/300x300/35ab40e905afdb5932f593ec5740f805.jpg",
            songUrl: "https://www.last.fm/music/Zedd/_/Clarity",
            songLyrics: "[Verse 1]\nHigh dive into frozen waves\nWhere the past comes back to life\nFight fear for the selfish pain\nIt was worth it every time\nHold still right before we crash\n'Cause we both know how this ends\nOur clock ticks till it breaks your glass\nAnd I drown in you again\n\n[Pre-Chorus]\n'Cause you are the piece of me\nI wish I didn't need\nChasing relentlessly\nStill fight and I don't know why\n\n[Chorus]\nIf our love is tragedy\nWhy are you my remedy?\nIf our love's insanity\nWhy are you my clarity?\n\n[Drop]\n\n[Chorus]\nIf our love is tragedy\nWhy are you my remedy?\nIf our love's insanity\nWhy are you my clarity?\n\n[Verse 2]\nWalk on through a red parade\nAnd refuse to make amends\nIt cuts deep through our ground\nAnd makes us forget all common sense\nDon't speak as I try to leave\n'Cause we both know what we'll choose\nIf you pull, then I'll push too deep\nAnd I'll fall right back to you\n\n[Pre-Chorus]\n'Cause you are the piece of me\nI wish I didn't need\nChasing relentlessly\nStill fight and I don't know why\n\n[Chorus]\nIf our love is tragedy\nWhy are you my remedy?\nIf our love's insanity\nWhy are you my clarity?\n\n[Build]\n\n[Drop]\nWhy are you my clarity?\nWhy are you my remedy?\nWhy are you my clarity?\nWhy are you my remedy\n\n[Chorus]\nIf our love is tragedy\nWhy are you my remedy?\nIf our love's insanity\nWhy are you my clarity?\n\n"
        },
    ]);

    return { songs, setSongs };
};