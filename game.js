/* ==========================================================================
   RETRO FAMICOM ADVENTURE - GAME ENGINE (game.js)
   ========================================================================== */

// --- AUDIO MANAGER (Web Audio API Synthesizer) ---
class AudioManager {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (this.ctx) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.warn("AudioContext init failed:", e);
            this.ctx = null;
        }
    }

    playJump() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.18);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.18);
    }

    playCoin() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playStomp() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(10, now + 0.12);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    playPowerupAppear() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const duration = 0.35;
        const notes = [330, 392, 659, 523, 587, 784];
        
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.06);

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.05, noteStart);
            gain.gain.linearRampToValueAtTime(0.001, noteStart + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.08);
        });
    }

    playPowerupCollect() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [330, 392, 659, 523, 587, 784, 1047];

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.05);

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.08, noteStart);
            gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.04);
            gain.gain.linearRampToValueAtTime(0.001, noteStart + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.08);
        });
    }

    playPowerdown() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.25);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    playFireball() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    playBreakBlock() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(30, now + 0.15);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    playBump() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.setValueAtTime(90, now + 0.05);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    playDie() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [493, 440, 392, 349, 329, 293, 261];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.08);

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.1, noteStart);
            gain.gain.linearRampToValueAtTime(0.001, noteStart + 0.07);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.07);
        });
    }

    playClear() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const melody = [
            { f: 261, d: 0.1 }, // C4
            { f: 329, d: 0.1 }, // E4
            { f: 392, d: 0.1 }, // G4
            { f: 523, d: 0.1 }, // C5
            { f: 659, d: 0.1 }, // E5
            { f: 784, d: 0.2 }, // G5 (long)
            { f: 784, d: 0.1 },
            { f: 880, d: 0.3 }  // A5 (triumphant)
        ];

        let accumulatedTime = 0;
        melody.forEach((note) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + accumulatedTime;

            osc.type = 'square';
            osc.frequency.setValueAtTime(note.f, noteStart);

            gain.gain.setValueAtTime(0.1, noteStart);
            gain.gain.linearRampToValueAtTime(0.08, noteStart + note.d - 0.02);
            gain.gain.linearRampToValueAtTime(0.001, noteStart + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + note.d);
            
            accumulatedTime += note.d;
        });
    }
}

const audio = new AudioManager();

// --- PALETTE DEFINITIONS (NES Palette Mapping) ---
const PALETTE = {
    '.': 'transparent', // Transparent
    'R': '#d82800',     // NES Red
    'S': '#f8d878',     // NES Skin Tone
    'B': '#0022f8',     // NES Blue (Dark)
    'L': '#0088fc',     // NES Light Blue
    'O': '#f85800',     // NES Orange
    'D': '#b83c00',     // NES Brown (Dark)
    'Y': '#f8ab00',     // NES Gold/Yellow
    'Y2': '#ffe066',    // Soft Yellow
    'G': '#00a800',     // NES Green
    'g': '#005800',     // NES Dark Green
    'W': '#ffffff',     // White
    'K': '#000000',     // Black
    'P': '#f878f8'      // Pink (Flower core)
};

// --- SPRITES DEFINITIONS (16x16 grids for tiles, 12x16 for Small Mario, 16x32 for Big) ---
const SPRITES = {
    // SMALL MARIO (12x16)
    mario_small_stand: [
        "....RRRRR...",
        "...RRRRRRRR.",
        "...DDDSSSKS.",
        "..DSDSSDSKSS",
        "..DSDDDSSKSS",
        "..DDSSSSS...",
        "....SSSSSSS.",
        "...RRBRRBRR.",
        "..RRRBRRBRRR",
        ".RRRRBBBBBRR",
        ".SSSBBBBBBSS",
        ".SSBBBBBBBSS",
        "..BBBBBBBBB.",
        "...BBB.BBB.",
        "..DDD...DDD.",
        ".DDDD...DDDD"
    ],
    mario_small_run1: [
        "....RRRRR...",
        "...RRRRRRRR.",
        "...DDDSSSKS.",
        "..DSDSSDSKSS",
        "..DSDDDSSKSS",
        "..DDSSSSS...",
        "....SSSSSSS.",
        "...RRBRRBRR.",
        "..RRRBRRBRRR",
        ".RRRRBBBBBRR",
        ".SSSBBBBBBSS",
        ".SSBBBBBBBSS",
        "..BBBBBBBBB.",
        "...DD..DD...",
        "..DDD...DD..",
        ".DDDD...DDDD"
    ],
    mario_small_run2: [
        "....RRRRR...",
        "...RRRRRRRR.",
        "...DDDSSSKS.",
        "..DSDSSDSKSS",
        "..DSDDDSSKSS",
        "..DDSSSSS...",
        "....SSSSSSS.",
        "...RRBRRBRR.",
        "..RRRBRRBRRR",
        ".RRRRBBBBBRR",
        ".SSSBBBBBBSS",
        ".SSBBBBBBBSS",
        "..BBBBBBBBB.",
        "....BBB.BBB.",
        "...DDD...DDD",
        "..DDDD...DDD"
    ],
    mario_small_jump: [
        "....RRRRR...",
        "...RRRRRRRR.",
        "...DDDSSSKS.",
        "..DSDSSDSKSS",
        "..DSDDDSSKSS",
        "..DDSSSSS...",
        "....SSSSSSS.",
        "...RRBRRBRR.",
        "..RRRBRRBRRR",
        ".RRRRBBBBBRR",
        ".SSSBBBBBBSS",
        ".SSBBBBBBBSS",
        "..BBBBBBBBB.",
        "...BBB..BBB.",
        "..DDD....DDD",
        ".DDDD.....DD"
    ],
    mario_small_die: [
        "...KKKKKK...",
        "..KKRRRRKK..",
        ".KKRRRRRRKK.",
        ".KDDSSSKSSK.",
        "KDSDSSDSKSSK",
        "KDSDDDSSKSSK",
        "KDDSSSSSSKK.",
        ".KKSSSSSK...",
        "..KRRBRRBRK.",
        ".KRRRBRRBRRK",
        "KRRRRBBBBBRK",
        "KSSSBBBBBBK.",
        ".KSSBBBBBBK.",
        "..KBBBBBBK..",
        "...KBBBBK...",
        "....KKKK...."
    ],

    // BIG MARIO (16x32)
    mario_big_stand: [
        ".....RRRRR......",
        "....RRRRRRRR....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....RRBRRBRR....",
        "...RRRBRRBRRR...",
        "..RRRRBRRBRRRR..",
        "..SSSRRBBBRRSS..",
        "..SSSRRBBBRRSS..",
        "..SSRRRRRRRRSS..",
        "....RRRRRRRR....",
        "....BBBBBBBB....",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBB..BBBB...",
        "....BBB..BBB....",
        "....DDD..DDD....",
        "...DDDD..DDDD...",
        "..DDDDD..DDDDD..",
        "..DDDD....DDDD..",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],
    mario_big_run1: [
        ".....RRRRR......",
        "....RRRRRRRR....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....RRBRRBRR....",
        "...RRRBRRBRRR...",
        "..RRRRBRRBRRRR..",
        "..SSSRRBBBRRSS..",
        "..SSSRRBBBRRSS..",
        "..SSRRRRRRRRSS..",
        "....RRRRRRRR....",
        "....BBBBBBBB....",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBB..BBBB...",
        "....BBB..BBB....",
        "....DDD...DDD...",
        "...DDDD...DDDD..",
        "..DDDDD...DDDDD.",
        "..DDDD.....DDDD.",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],
    mario_big_run2: [
        ".....RRRRR......",
        "....RRRRRRRR....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....RRBRRBRR....",
        "...RRRBRRBRRR...",
        "..RRRRBRRBRRRR..",
        "..SSSRRBBBRRSS..",
        "..SSSRRBBBRRSS..",
        "..SSRRRRRRRRSS..",
        "....RRRRRRRR....",
        "....BBBBBBBB....",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "....BBB..BBB....",
        "....DDD..DDD....",
        "...DDDD..DDDD...",
        "..DDDDD..DDDDD..",
        "..DDDD....DDDD..",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],
    mario_big_jump: [
        ".....RRRRR......",
        "....RRRRRRRR....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....RRBRRBRR....",
        "...RRRBRRBRRR...",
        "..RRRRBRRBRRRR..",
        "..SSSRRBBBRRSS..",
        "..SSSRRBBBRRSS..",
        "..SSRRRRRRRRSS..",
        "....RRRRRRRR....",
        "....BBBBBBBB....",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBBBBBBBB...",
        "...BBBB..BBBB...",
        "....BBB..BBB....",
        "....DDD....DDD..",
        "...DDDD....DDDD.",
        "..DDDDD....DDDDD",
        "..DDDD......DDDD",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],

    // FIRE MARIO (Uses Big Mario template but changes Reds to Whites and Blues to Reds)
    mario_fire_stand: [
        ".....WWWWW......",
        "....WWWWWWWW....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....WWRWWRWW....",
        "...WWWRWWRWWW...",
        "..WWWWRWWRWWWW..",
        "..SSSWWRRRRWWS..",
        "..SSSWWRRRRWWS..",
        "..SSWWWWWWWWSW..",
        "....WWWWWWWW....",
        "....RRRRRRRR....",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRR..RRRR...",
        "....RRR..RRR....",
        "....DDD..DDD....",
        "...DDDD..DDDD...",
        "..DDDDD..DDDDD..",
        "..DDDD....DDDD..",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],
    mario_fire_run1: [
        ".....WWWWW......",
        "....WWWWWWWW....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....WWRWWRWW....",
        "...WWWRWWRWWW...",
        "..WWWWRWWRWWWW..",
        "..SSSWWRRRRWWS..",
        "..SSSWWRRRRWWS..",
        "..SSWWWWWWWWSW..",
        "....WWWWWWWW....",
        "....RRRRRRRR....",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRR..RRRR...",
        "....RRR..RRR....",
        "....DDD...DDD...",
        "...DDDD...DDDD..",
        "..DDDDD...DDDDD.",
        "..DDDD.....DDDD.",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],
    mario_fire_run2: [
        ".....WWWWW......",
        "....WWWWWWWW....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....WWRWWRWW....",
        "...WWWRWWRWWW...",
        "..WWWWRWWRWWWW..",
        "..SSSWWRRRRWWS..",
        "..SSSWWRRRRWWS..",
        "..SSWWWWWWWWSW..",
        "....WWWWWWWW....",
        "....RRRRRRRR....",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "....RRR..RRR....",
        "....DDD..DDD....",
        "...DDDD..DDDD...",
        "..DDDDD..DDDDD..",
        "..DDDD....DDDD..",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],
    mario_fire_jump: [
        ".....WWWWW......",
        "....WWWWWWWW....",
        "....DDDSSSKS....",
        "...DSDSSDSKSS...",
        "...DSDDDSSKSS...",
        "...DDSSSSS......",
        ".....SSSSSSS....",
        "....WWRWWRWW....",
        "...WWWRWWRWWW...",
        "..WWWWRWWRWWWW..",
        "..SSSWWRRRRWWS..",
        "..SSSWWRRRRWWS..",
        "..SSWWWWWWWWSW..",
        "....WWWWWWWW....",
        "....RRRRRRRR....",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRRRRRRRR...",
        "...RRRR..RRRR...",
        "....RRR..RRR....",
        "....DDD....DDD..",
        "...DDDD....DDDD.",
        "..DDDDD....DDDDD",
        "..DDDD......DDDD",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "................"
    ],

    // GOOMBA (16x16)
    goomba_walk1: [
        "......OOOO......",
        "....OOOOOOOO....",
        "...OOOOOOOOOO...",
        "..OOOKKOOKKOOO..",
        "..OOKKKKkkkkOO..",
        "..OOKKKKKKKKOO..",
        "..OOOOOOOOOOOO..",
        "...OOOOOOOOOO...",
        "....DDDDDDDD....",
        "....DDDDDDDD....",
        "...DDDDDDDDDD...",
        "...DDDDDDDDDD...",
        "..DDD......DDD..",
        ".DDDD......DDDD.",
        ".KKKK......KKKK.",
        "KKKKK......KKKKK"
    ],
    goomba_walk2: [
        "......OOOO......",
        "....OOOOOOOO....",
        "...OOOOOOOOOO...",
        "..OOOKKOOKKOOO..",
        "..OOKKKKkkkkOO..",
        "..OOKKKKKKKKOO..",
        "..OOOOOOOOOOOO..",
        "...OOOOOOOOOO...",
        "....DDDDDDDD....",
        "....DDDDDDDD....",
        "...DDDDDDDDDD...",
        "...DDDDDDDDDD...",
        "..KKKK....KKKK..",
        ".KKKKK....KKKKK.",
        "KKKKK......KKKKK",
        "................"
    ],
    goomba_flat: [
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        "......OOOO......",
        "....OOOOOOOO....",
        "...OOOOOOOOOO...",
        "..OOOKKOOKKOOO..",
        "..OOOOOOOOOOOO..",
        "...OOOOOOOOOO...",
        "....DDDDDDDD....",
        "...DDDDDDDDDD...",
        "..KKKKKKKKKKKK..",
        "KKKKKKKKKKKKKKKK"
    ],

    // ITEMS & TILES
    item_mushroom: [
        ".....RRRRRR.....",
        "...RRRRWWRRRR...",
        "..RRWWRWWWRWRR..",
        ".RRWWRWWWWWWRRR.",
        ".RRWWRWWWWWWRRR.",
        "..RRWWRWWWRWRR..",
        "...RRRRWWRRRR...",
        ".....RRRRRR.....",
        "....KKSSSSKK....",
        "...KKKSSSSKKK...",
        "...KKKSSSSKKK...",
        "...KKKKSSKKKK...",
        "....KKKKKKKK....",
        ".....KKKKKK.....",
        "................",
        "................"
    ],
    item_flower: [
        ".....WWWWWW.....",
        "...WWYYYYYYWW...",
        "..WYYYYPPYYYYW..",
        ".WYYYYPPPPYYYYW.",
        ".WYYYYPPPPYYYYW.",
        "..WYYYYPPYYYYW..",
        "...WWYYYYYYWW...",
        ".....WWWWWW.....",
        "......GGGG......",
        "......GGGG......",
        "....GGGGGGGG....",
        "...GGGGGGGGGG...",
        "......GGGG......",
        "......GGGG......",
        "......GGGG......",
        "......GGGG......"
    ],
    item_coin: [
        ".....YYYY......",
        "...YYYYYYYY....",
        "..YYYYYYYYYY...",
        ".YYYYKKKKYYYY..",
        ".YYYKKYYYYYYY..",
        ".YYYKKYYYYYYY..",
        ".YYYKKYYYYYYY..",
        ".YYYKKYYYYYYY..",
        ".YYYYKKKKYYYY..",
        "..YYYYYYYYYY...",
        "...YYYYYYYY....",
        ".....YYYY......",
        "................",
        "................",
        "................",
        "................"
    ],
    tile_brick: [
        "DDDDDDDDDDDDDDDD",
        "DKKKKKKKKKKKKKKD",
        "DKDDDKDDDKDDDKDD",
        "DKKKKKKKKKKKKKKD",
        "DDKDDDKDDDKDDDKD",
        "DKKKKKKKKKKKKKKD",
        "DKDDDKDDDKDDDKDD",
        "DKKKKKKKKKKKKKKD",
        "DDKDDDKDDDKDDDKD",
        "DKKKKKKKKKKKKKKD",
        "DKDDDKDDDKDDDKDD",
        "DKKKKKKKKKKKKKKD",
        "DDKDDDKDDDKDDDKD",
        "DKKKKKKKKKKKKKKD",
        "DDDDDDDDDDDDDDDD",
        "DDDDDDDDDDDDDDDD"
    ],
    tile_question: [
        "YYYYYYYYYYYYYYYY",
        "YKKKKKKKKKKKKKKY",
        "YKWWWWWWWWWWWWKY",
        "YKWKKKKKKKKKKWKY",
        "YKWKYYYYYYYYKWKY",
        "YKWKYYKKKKYYKWKY",
        "YKWKYYKKKKYYKWKY",
        "YKWKKKKKKKYYKWKY",
        "YKWKKKKKYYYKKWKY",
        "YKWKKKKKYYKKKWKY",
        "YKWKKKKKKKKKKWKY",
        "YKWKKKKKYYKKKWKY",
        "YKWKKKKKYYKKKWKY",
        "YKWWWWWWWWWWWWKY",
        "YKKKKKKKKKKKKKKY",
        "YYYYYYYYYYYYYYYY"
    ],
    tile_used: [
        "DDDDDDDDDDDDDDDD",
        "DKKKKKKKKKKKKKKD",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDDDDDDDDDDDDK",
        "DKKKKKKKKKKKKKKD",
        "DDDDDDDDDDDDDDDD",
        "DDDDDDDDDDDDDDDD"
    ],
    tile_ground: [
        "DDDDDDDDDDDDDDDD",
        "DDKKKKKKKKKKKKDD",
        "DKDDDDDDDDDDDDDK",
        "DKDDKKDDKKDDKKDK",
        "DKDDKKDDKKDDKKDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDKKDDKKDDKKDK",
        "DKDDKKDDKKDDKKDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDKKDDKKDDKKDK",
        "DKDDKKDDKKDDKKDK",
        "DKDDDDDDDDDDDDDK",
        "DKDDKKDDKKDDKKDK",
        "DDKKKKKKKKKKKKDD",
        "DDDDDDDDDDDDDDDD",
        "DDDDDDDDDDDDDDDD"
    ]
};

// Helper: Programmatic rendering of sprite grids
function drawSprite(ctx, spriteName, px, py, flipX = false, scaleX = 1, scaleY = 1) {
    const pixels = SPRITES[spriteName];
    if (!pixels) return;

    const sizeY = pixels.length;
    const sizeX = pixels[0].length;

    ctx.save();
    if (flipX) {
        ctx.translate(px + sizeX * scaleX, py);
        ctx.scale(-1, 1);
    } else {
        ctx.translate(px, py);
    }

    for (let y = 0; y < sizeY; y++) {
        const line = pixels[y];
        for (let x = 0; x < sizeX; x++) {
            const char = line[x];
            if (char !== '.' && PALETTE[char]) {
                ctx.fillStyle = PALETTE[char];
                ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
            }
        }
    }
    ctx.restore();
}

// --- GAME STATE VARIABLES ---
const CANVAS = document.getElementById('gameCanvas');
const CTX = CANVAS.getContext('2d');

const SCREEN_W = 256; // Logical retro resolution
const SCREEN_H = 224;
const TILE_SIZE = 16;

let gameState = 'START'; // START, PLAYING, DYING, GAME_OVER, GAME_CLEAR
let score = 0;
let coins = 0;
let timer = 400;
let timerInterval = null;

let cameraX = 0;
let maxCameraX = 0;

let keys = {};
let player = null;
let enemies = [];
let items = [];
let particles = [];
let fireballs = [];

// Storing original level structure to reset
let tileMap = [];
let levelHasFlag = false;
let levelUsesMarioSymbols = false;
let selectedWorld = '1-1';
const MAP_ROWS = 14;
let MAP_COLS = 180; // Updated to match the loaded level width.
const WORLD_ORDER = ['1-1', '1-2', '1-3'];
const LEVEL_FILES = {
    '1-1': 'mario-1-1.txt',
    '1-2': 'mario-1-2.txt',
    '1-3': 'mario-1-3.txt'
};

// --- DEFAULT ASCII LEVEL CONFIGURATION FALLBACKS ---
const DEFAULT_LEVELS = {
    '1-1': `............................................................................................................................................................................
............................................................................................................................................................................
............................................................................................................................................................................
............................................................................................................................................................................
..................o.o.o.............................Q.Q.....................................Q.Q........................B.P.B....................................................
............................................................................................................................................................................
............................................................................................................................................................................
............................................................................................................................................................................
............Q...B.P.B.Q.B...................BBBBB.P.BBBBB...................................B.Q.B.B.P.B.....................................................................
............................................................................................................................................................................
........................[]..........................[]..................................................................SSSSS.....SSSSS....................................C......
...............E........()..................E.......()........................[]................E........E...E..........SSSSSS.....SSSSSS......E...........................CCC.....
GGGGGGGGGGGGGGGGGGGGGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG..()............GGGGGGGGGGGGGGGGGGGGGGGGGGSSSSSSS.....SSSSSSS..................................CCCCC....
GGGGGGGGGGGGGGGGGGGGGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG..()............GGGGGGGGGGGGGGGGGGGGGGGGGGSSSSSSS.....SSSSSSS..................................CCCCC....`,
    '1-2': `............................................................................................................................................................................
SSSSSSSSSSSSSSSSSS....SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS....SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS....SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
............................................................................................................................................................................
............................................................................................................................................................................
................................o..o..o.....................................................................................................................................
............................................................................................................................................................................
....................................................P.....................B.Q.B.............................................................................................
............................................................................................................................................................[]..............
........Q.B.P.B.Q...............BBBBBBBBB.................................B...B....................................................................[]......()..............
..........................................................................................S........................................................()......()..............
................S...................................[]...................................SS.........................S......................[]......()......()..............
......E.........SS.........E........................()..............E......S......E.....SSS.....E.....E....o.o.o.o..SS..E...E..............()..E...()......()..............
GGGGGGGGGGGGGGGGGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGGG()..GGGGGGGGGGGGGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGSSS...GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGGG()..GGGGGGGGGGGGGGGGGGGGG...GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGSSS...GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG`
};

let levelData = {
    '1-1': DEFAULT_LEVELS['1-1'],
    '1-2': DEFAULT_LEVELS['1-2'],
    '1-3': DEFAULT_LEVELS['1-1']
};

async function loadLevels() {
    for (const [world, fileName] of Object.entries(LEVEL_FILES)) {
        try {
            const response = await fetch(fileName);
            if (response.ok) {
                levelData[world] = await response.text();
            }
        } catch(e) {
            console.warn(`Level fetch failed for ${fileName}, using internal fallback:`, e);
        }
    }
}

function initLevel() {
    const levelStr = levelData[selectedWorld] || DEFAULT_LEVELS[selectedWorld];
    parseLevelString(levelStr);
}

function parseLevelString(data) {
    enemies = []; // Goombas are loaded directly from the map file!
    levelHasFlag = false;
    levelUsesMarioSymbols = false;
    if (!data) return;

    const rawLines = data.split('\n');
    const mapLines = [];
    for (let line of rawLines) {
        let clean = line.replace('\r', '');
        // Ignore lines that start with '#' (comments)
        if (clean.startsWith('#') || clean.trim() === '') {
            continue;
        }
        mapLines.push(clean);
    }

    const usesMarioSymbols = mapLines.some(line => /[-X<>?]/.test(line));
    levelUsesMarioSymbols = usesMarioSymbols;
    MAP_COLS = Math.max(180, ...mapLines.map(line => line.length));
    tileMap = Array(MAP_ROWS).fill(null).map(() => Array(MAP_COLS).fill(0));

    for (let r = 0; r < MAP_ROWS; r++) {
        const line = mapLines[r] || '';
        for (let c = 0; c < MAP_COLS; c++) {
            const char = line[c] || '.';
            let tileType = 0;
            
            switch(char) {
                case '-': tileType = 0; break;  // Air (mario-1-1.txt)
                case 'X': tileType = 1; break;  // Ground / solid terrain (mario-1-1.txt)
                case 'G': tileType = 1; break;  // Ground
                case 'S': tileType = usesMarioSymbols ? 2 : 5; break;  // Brick in mario-1-1.txt, solid block in legacy levels
                case 'B': tileType = 2; break;  // Brick
                case 'Q': tileType = 3; break;  // Question Block Coin
                case '?': tileType = 4; break;  // Question Block Powerup (mario-1-1.txt)
                case 'P': tileType = 4; break;  // Question Block Powerup
                case 'U': tileType = 5; break;  // Used/solid block
                case '<': tileType = 6; break;  // Pipe Top L (mario-1-1.txt)
                case '>': tileType = 7; break;  // Pipe Top R (mario-1-1.txt)
                case '[': tileType = 6; break;  // Pipe Top L
                case ']': tileType = 7; break;  // Pipe Top R
                case '(': tileType = 8; break;  // Pipe Body L
                case ')': tileType = 9; break;  // Pipe Body R
                case 'o': tileType = 10; break; // Coin collectible
                case 'F':
                    levelHasFlag = true;
                    tileType = 11;
                    break; // Flagpole
                case 'C': tileType = 12; break; // Castle Block
                case 'E':
                    enemies.push(new Goomba(c * TILE_SIZE, r * TILE_SIZE));
                    tileType = 0; // Spawn Goomba, block itself is Air
                    break;
                default:
                    tileType = 0;
                    break;
            }
            tileMap[r][c] = tileType;
        }
    }
}

// --- ENTITIES CLASSES ---

class Player {
    constructor() {
        this.x = 40;
        this.y = 100;
        this.w = 12;
        this.h = 16;
        
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        
        // State: 0 = Small, 1 = Big, 2 = Fire
        this.powerState = 0;
        
        this.facingLeft = false;
        this.invincibilityFrames = 0;
        this.growthFrames = 0; // Transmute animation
        this.dead = false;

        this.animTimer = 0;
        this.walkFrame = 0;
        
        this.fireCooldown = 0;
    }

    update() {
        if (this.dead) {
            this.y += this.vy;
            this.vy += 0.25; // Dead fall gravity
            return;
        }

        if (this.growthFrames > 0) {
            this.growthFrames--;
            return; // Lock controls during powerup transform
        }

        if (this.invincibilityFrames > 0) this.invincibilityFrames--;
        if (this.fireCooldown > 0) this.fireCooldown--;

        // Controls input
        let moveLeft = keys['ArrowLeft'] || keys['KeyA'] || virtualKeys.left;
        let moveRight = keys['ArrowRight'] || keys['KeyD'] || virtualKeys.right;
        let jump = keys['ArrowUp'] || keys['KeyW'] || keys['Space'] || virtualKeys.jump;
        let action = keys['ShiftLeft'] || keys['ShiftRight'] || keys['KeyJ'] || keys['KeyZ'] || virtualKeys.action;

        // Apply Speed & Friction
        let accel = 0.15;
        let friction = 0.85;
        let maxSpeed = action ? 2.5 : 1.5; // B/Shift runs faster

        if (moveLeft) {
            this.vx -= accel;
            this.facingLeft = true;
        } else if (moveRight) {
            this.vx += accel;
            this.facingLeft = false;
        } else {
            this.vx *= friction;
            if (Math.abs(this.vx) < 0.05) this.vx = 0;
        }

        // Speed boundaries
        if (this.vx > maxSpeed) this.vx = maxSpeed;
        if (this.vx < -maxSpeed) this.vx = -maxSpeed;

        // Gravity
        this.vy += 0.28;
        if (this.vy > 6.0) this.vy = 6.0;

        // Jump physics (Hold key jump higher)
        if (jump && this.onGround) {
            this.vy = -6.2;
            this.onGround = false;
            audio.playJump();
        } else if (!jump && this.vy < -2.5) {
            this.vy = -2.5; // Cut off jump height if released early
        }

        // Fire action
        if (action && this.powerState === 2 && this.fireCooldown === 0) {
            fireballs.push(new Fireball(this.x + (this.facingLeft ? -4 : this.w), this.y + 4, this.facingLeft ? -3.5 : 3.5));
            this.fireCooldown = 20;
            audio.playFireball();
        }

        // Update animation
        if (Math.abs(this.vx) > 0.1 && this.onGround) {
            this.animTimer += Math.abs(this.vx) * 0.15;
            this.walkFrame = Math.floor(this.animTimer) % 2;
        } else {
            this.walkFrame = 0;
        }

        // Collision logic (independent horizontal/vertical checks)
        this.onGround = false;

        // X move & Collision
        this.x += this.vx;
        this.resolveMapCollision('horizontal');

        // Y move & Collision
        this.y += this.vy;
        this.resolveMapCollision('vertical');

        // Lock camera boundaries
        if (this.x < cameraX) {
            this.x = cameraX;
            this.vx = 0;
        }

        // Pit death check
        if (this.y > SCREEN_H + 32) {
            this.die();
        }

        // Goal flagpole collision check
        let tileCol = Math.floor((this.x + this.w/2) / TILE_SIZE);
        let tileRow = Math.floor((this.y + this.h/2) / TILE_SIZE);
        if (getTile(tileRow, tileCol) === 11) {
            triggerWin();
        }

        if (!levelHasFlag && this.x + this.w >= (MAP_COLS - 2) * TILE_SIZE) {
            triggerWin();
        }

        // Warp Pipe & Exit Pipe down-press win check (World 1-2)
        if (selectedWorld === '1-2' && !levelUsesMarioSymbols) {
            let keysDown = keys['ArrowDown'] || keys['KeyS'] || virtualKeys.down;
            if (keysDown && this.onGround) {
                let colLeft = Math.floor(this.x / TILE_SIZE);
                let colRight = Math.floor((this.x + this.w) / TILE_SIZE);
                let rowBelow = Math.floor((this.y + this.h + 2) / TILE_SIZE);
                
                let tileBelowL = getTile(rowBelow, colLeft);
                let tileBelowR = getTile(rowBelow, colRight);
                if (tileBelowL === 6 || tileBelowR === 6 || tileBelowL === 7 || tileBelowR === 7) {
                    triggerWin();
                }
            }
        }
    }

    resolveMapCollision(dir) {
        const checkTiles = this.getTileOverlaps();
        
        for (let tile of checkTiles) {
            if (isSolid(tile.type)) {
                if (dir === 'horizontal') {
                    if (this.vx > 0) { // Moving Right
                        this.x = tile.col * TILE_SIZE - this.w;
                        this.vx = 0;
                    } else if (this.vx < 0) { // Moving Left
                        this.x = (tile.col + 1) * TILE_SIZE;
                        this.vx = 0;
                    }
                } else if (dir === 'vertical') {
                    if (this.vy > 0) { // Falling Down
                        this.y = tile.row * TILE_SIZE - this.h;
                        this.vy = 0;
                        this.onGround = true;
                    } else if (this.vy < 0) { // Bumping Head
                        this.y = (tile.row + 1) * TILE_SIZE;
                        this.vy = 0;
                        this.hitBlock(tile.row, tile.col);
                    }
                }
            }
        }
    }

    hitBlock(r, c) {
        let type = getTile(r, c);
        if (type === 2) { // Brick block
            if (this.powerState > 0) { // Big / Fire breaks brick
                setTile(r, c, 0);
                audio.playBreakBlock();
                // Spawn debris particles
                particles.push(new Debris(c * TILE_SIZE + 4, r * TILE_SIZE + 4, -1, -3));
                particles.push(new Debris(c * TILE_SIZE + 12, r * TILE_SIZE + 4, 1, -3));
                particles.push(new Debris(c * TILE_SIZE + 4, r * TILE_SIZE + 12, -1, -1));
                particles.push(new Debris(c * TILE_SIZE + 12, r * TILE_SIZE + 12, 1, -1));
                score += 50;
            } else { // Small bumps brick
                audio.playBump();
                triggerBlockBumpAnim(r, c);
            }
        } else if (type === 3) { // Question block (Coin)
            setTile(r, c, 5); // Turn to used block
            audio.playCoin();
            coins++;
            score += 100;
            updateHUD();
            particles.push(new CoinParticle(c * TILE_SIZE + 4, r * TILE_SIZE - 8));
        } else if (type === 4) { // Question block (Powerup)
            setTile(r, c, 5);
            audio.playPowerupAppear();
            // Spawn Mushroom if small, Flower if big
            let itemType = (this.powerState === 0) ? 'mushroom' : 'flower';
            items.push(new Powerup(c * TILE_SIZE, r * TILE_SIZE, itemType));
        }
    }

    getTileOverlaps() {
        let left = Math.floor(this.x / TILE_SIZE);
        let right = Math.floor((this.x + this.w - 0.1) / TILE_SIZE);
        let top = Math.floor(this.y / TILE_SIZE);
        let bottom = Math.floor((this.y + this.h - 0.1) / TILE_SIZE);

        let list = [];
        for (let r = top; r <= bottom; r++) {
            for (let c = left; c <= right; c++) {
                let type = getTile(r, c);
                if (type !== 0) {
                    list.push({ row: r, col: c, type: type });
                }
            }
        }
        return list;
    }

    damage() {
        if (this.invincibilityFrames > 0 || this.dead) return;

        if (this.powerState > 0) {
            audio.playPowerdown();
            this.powerState = 0; // shrink to small
            this.h = 16;
            this.invincibilityFrames = 120; // 2 seconds flashing
        } else {
            this.die();
        }
    }

    die() {
        if (this.dead) return;
        this.dead = true;
        this.vy = -6.0;
        this.vx = 0;
        audio.playDie();
        clearInterval(timerInterval);
        
        // Restart after delay
        setTimeout(() => {
            triggerGameOver();
        }, 3000);
    }

    powerUp(type) {
        audio.playPowerupCollect();
        if (type === 'mushroom') {
            if (this.powerState === 0) {
                this.powerState = 1;
                this.h = 24;
                if (this.onGround) {
                    this.y -= 8; // Adjust position so no stuck in ground
                }
            }
            score += 1000;
        } else if (type === 'flower') {
            if (this.powerState === 0) {
                if (this.onGround) {
                    this.y -= 8;
                }
            }
            this.powerState = 2; // Fire state
            this.h = 24;
            score += 1000;
        }
        this.growthFrames = 30; // Pause logic for visual change effect
    }

    draw(ctx) {
        // Flash if invincible
        if (this.invincibilityFrames > 0 && Math.floor(this.invincibilityFrames / 4) % 2 === 0) {
            return;
        }

        let spriteName = '';
        const stateStr = this.powerState === 2 ? 'fire' : (this.powerState === 1 ? 'big' : 'small');
        
        if (this.dead) {
            spriteName = 'mario_small_die';
        } else if (!this.onGround) {
            spriteName = `mario_${stateStr}_jump`;
        } else if (Math.abs(this.vx) > 0.1) {
            spriteName = `mario_${stateStr}_run${this.walkFrame + 1}`;
        } else {
            spriteName = `mario_${stateStr}_stand`;
        }

        // Draw character sprites
        let scale = 1;
        let dy = this.y;
        
        // Align Sprite offsets (small is 12px wide, big is 16px wide)
        let dx = this.x;
        if (this.powerState === 0) {
            // small mario sprite is 12x16
            drawSprite(ctx, spriteName, dx, dy, this.facingLeft);
        } else {
            // big/fire sprite is 16x32, but actual character is in the top 24px,
            // and hitbox height is 24px, so we draw it at dy directly.
            drawSprite(ctx, spriteName, dx - 2, dy, this.facingLeft);
        }
    }
}

// --- GOOMBA ENEMY CLASS ---
class Goomba {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 16;
        this.h = 16;
        this.vx = -0.5;
        this.vy = 0;
        this.dead = false;
        this.deadTimer = 0;

        this.animTimer = 0;
        this.walkFrame = 0;
    }

    update() {
        if (this.dead) {
            this.deadTimer--;
            return;
        }

        this.vy += 0.25; // gravity
        if (this.vy > 6.0) this.vy = 6.0;

        // Horiz movement
        this.x += this.vx;
        this.resolveCollisions('horizontal');

        // Vert movement
        this.y += this.vy;
        this.resolveCollisions('vertical');

        // Walk anim
        this.animTimer += 0.1;
        this.walkFrame = Math.floor(this.animTimer) % 2;
    }

    resolveCollisions(dir) {
        let left = Math.floor(this.x / TILE_SIZE);
        let right = Math.floor((this.x + this.w - 0.1) / TILE_SIZE);
        let top = Math.floor(this.y / TILE_SIZE);
        let bottom = Math.floor((this.y + this.h - 0.1) / TILE_SIZE);

        for (let r = top; r <= bottom; r++) {
            for (let c = left; c <= right; c++) {
                if (isSolid(getTile(r, c))) {
                    if (dir === 'horizontal') {
                        if (this.vx > 0) {
                            this.x = c * TILE_SIZE - this.w;
                            this.vx = -this.vx;
                        } else if (this.vx < 0) {
                            this.x = (c + 1) * TILE_SIZE;
                            this.vx = -this.vx;
                        }
                    } else if (dir === 'vertical') {
                        if (this.vy > 0) {
                            this.y = r * TILE_SIZE - this.h;
                            this.vy = 0;
                        }
                    }
                }
            }
        }
    }

    stomp() {
        this.dead = true;
        this.deadTimer = 30; // Show squashed goomba for 30 frames
        this.vx = 0;
        this.vy = 0;
        audio.playStomp();
        score += 100;
        updateHUD();
        // Add score pop particle
        particles.push(new ScorePop(this.x, this.y, '100'));
    }

    dieByFire() {
        this.dead = true;
        this.deadTimer = 1; // Instant erase or small spark
        audio.playStomp();
        score += 100;
        updateHUD();
        particles.push(new ScorePop(this.x, this.y, '100'));
    }

    draw(ctx) {
        if (this.dead) {
            drawSprite(ctx, 'goomba_flat', this.x, this.y);
        } else {
            drawSprite(ctx, `goomba_walk${this.walkFrame + 1}`, this.x, this.y);
        }
    }
}

// --- POWERUP ITEMS CLASS ---
class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.w = 16;
        this.h = 16;
        this.type = type; // mushroom or flower
        
        this.vy = 0;
        this.vx = (type === 'mushroom') ? 1.0 : 0;
        this.spawnY = y - 16;
        this.spawning = true;
        this.spawnProgress = 0;
    }

    update() {
        if (this.spawning) {
            this.y -= 0.5;
            this.spawnProgress += 0.5;
            if (this.spawnProgress >= 16) {
                this.spawning = false;
            }
            return;
        }

        if (this.type === 'flower') return; // Flowers stay in place

        // Mushroom horizontal + gravity physics
        this.vy += 0.25;
        this.x += this.vx;
        this.resolveCollisions('horizontal');

        this.y += this.vy;
        this.resolveCollisions('vertical');
    }

    resolveCollisions(dir) {
        let left = Math.floor(this.x / TILE_SIZE);
        let right = Math.floor((this.x + this.w - 0.1) / TILE_SIZE);
        let top = Math.floor(this.y / TILE_SIZE);
        let bottom = Math.floor((this.y + this.h - 0.1) / TILE_SIZE);

        for (let r = top; r <= bottom; r++) {
            for (let c = left; c <= right; c++) {
                if (isSolid(getTile(r, c))) {
                    if (dir === 'horizontal') {
                        if (this.vx > 0) {
                            this.x = c * TILE_SIZE - this.w;
                            this.vx = -this.vx;
                        } else if (this.vx < 0) {
                            this.x = (c + 1) * TILE_SIZE;
                            this.vx = -this.vx;
                        }
                    } else if (dir === 'vertical') {
                        if (this.vy > 0) {
                            this.y = r * TILE_SIZE - this.h;
                            this.vy = 0;
                        }
                    }
                }
            }
        }
    }

    draw(ctx) {
        let name = this.type === 'mushroom' ? 'item_mushroom' : 'item_flower';
        drawSprite(ctx, name, this.x, this.y);
    }
}

// --- BOUNCING FIREBALL CLASS ---
class Fireball {
    constructor(x, y, vx) {
        this.x = x;
        this.y = y;
        this.w = 8;
        this.h = 8;
        this.vx = vx;
        this.vy = 1;
        this.life = 180; // 3 seconds max life
    }

    update() {
        this.life--;
        this.vy += 0.25; // gravity

        this.x += this.vx;
        this.resolveCollisions('horizontal');

        this.y += this.vy;
        this.resolveCollisions('vertical');
    }

    resolveCollisions(dir) {
        let left = Math.floor(this.x / TILE_SIZE);
        let right = Math.floor((this.x + this.w - 0.1) / TILE_SIZE);
        let top = Math.floor(this.y / TILE_SIZE);
        let bottom = Math.floor((this.y + this.h - 0.1) / TILE_SIZE);

        for (let r = top; r <= bottom; r++) {
            for (let c = left; c <= right; c++) {
                if (isSolid(getTile(r, c))) {
                    if (dir === 'horizontal') {
                        this.life = 0; // explode
                    } else if (dir === 'vertical') {
                        if (this.vy > 0) {
                            this.y = r * TILE_SIZE - this.h;
                            this.vy = -3.5; // bounce up
                        } else {
                            this.life = 0; // bump ceiling explosion
                        }
                    }
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff6c00';
        ctx.beginPath();
        ctx.arc(this.x + 4, this.y + 4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffff66';
        ctx.beginPath();
        ctx.arc(this.x + 4, this.y + 4, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- RETRO PARTICLES (Debris, coin animations, score text popup) ---
class Debris {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 40;
    }
    update() {
        this.vy += 0.25;
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }
    draw(ctx) {
        ctx.fillStyle = '#b83c00';
        ctx.fillRect(this.x, this.y, 4, 4);
    }
}

class CoinParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vy = -4.0;
        this.life = 25;
    }
    update() {
        this.y += this.vy;
        this.vy += 0.25;
        this.life--;
    }
    draw(ctx) {
        drawSprite(ctx, 'item_coin', this.x, this.y);
    }
}

class ScorePop {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.life = 35;
    }
    update() {
        this.y -= 0.5;
        this.life--;
    }
    draw(ctx) {
        ctx.font = "8px 'Press Start 2P'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Block bump bounce logic simulation
let bumpedBlocks = [];
function triggerBlockBumpAnim(r, c) {
    bumpedBlocks.push({ r: r, c: c, progress: 0 });
}
function updateBumpedBlocks() {
    for (let i = bumpedBlocks.length - 1; i >= 0; i--) {
        let b = bumpedBlocks[i];
        b.progress += 0.5;
        if (b.progress >= Math.PI) {
            bumpedBlocks.splice(i, 1);
        }
    }
}

// --- TILEMAP HELPER UTILITIES ---
function getTile(r, c) {
    if (r < 0 || r >= MAP_ROWS || c < 0 || c >= MAP_COLS) return 0;
    if (!tileMap || !tileMap[r]) return 0;
    return tileMap[r][c];
}

function setTile(r, c, val) {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS) {
        if (tileMap && tileMap[r]) {
            tileMap[r][c] = val;
        }
    }
}

function isSolid(type) {
    // 0=Air, 10=FloatingCoin, 11=Flagpole are NOT solid
    return (type !== 0 && type !== 10 && type !== 11);
}

// --- GAME LOGIC FLOWS ---

function applyWorldTheme() {
    const hudWorld = document.getElementById('hud-world');
    if (selectedWorld === '1-2') {
        PALETTE['D'] = '#0044a8'; // Blue-grey dark
        PALETTE['O'] = '#0088fc'; // Blue-grey light
    } else {
        PALETTE['D'] = '#b83c00'; // Brown
        PALETTE['O'] = '#f85800'; // Orange
    }
    if (hudWorld) {
        hudWorld.textContent = selectedWorld;
    }
}

function startGame() {
    audio.init();
    loadLevels().then(() => {
        document.getElementById('startScreen').classList.remove('active');
        document.getElementById('gameOverScreen').classList.remove('active');
        document.getElementById('gameClearScreen').classList.remove('active');
        
        // Reset status variables
        score = 0;
        coins = 0;
        timer = 400;
        cameraX = 0;
        maxCameraX = 0;
        
        applyWorldTheme();

        player = new Player();
        enemies = [];
        items = [];
        particles = [];
        fireballs = [];
        
        initLevel();
        spawnInitialEnemies();
        
        updateHUD();
        gameState = 'PLAYING';

        // Start timer interval
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (gameState === 'PLAYING') {
                timer--;
                updateHUD();
                if (timer <= 0) {
                    player.die();
                }
            }
        }, 1000);
    });
}

function spawnInitialEnemies() {
    // Enemies are parsed and spawned directly from the visual ASCII stage text files!
}

function updateHUD() {
    document.getElementById('hud-score').textContent = String(score).padStart(6, '0');
    document.getElementById('hud-coins').textContent = `🪙x${String(coins).padStart(2, '0')}`;
    document.getElementById('hud-time').textContent = String(Math.max(0, timer)).padStart(3, '0');
}

function triggerGameOver() {
    gameState = 'GAME_OVER';
    document.getElementById('gameOverScreen').classList.add('active');
}

function triggerWin() {
    gameState = 'GAME_CLEAR';
    clearInterval(timerInterval);
    audio.playClear();
    
    const timeBonus = timer * 10;
    score += timeBonus;
    updateHUD();

    document.getElementById('finalScore').textContent = String(score).padStart(6, '0');
    document.getElementById('timeBonus').textContent = String(timeBonus);
    document.getElementById('gameClearScreen').classList.add('active');
}

// --- UPDATE & RENDER MAIN LOOP ---

function update() {
    if (gameState !== 'PLAYING' && gameState !== 'DYING') return;

    player.update();

    if (gameState === 'PLAYING') {
        // Scroll Camera horizontally
        if (player.x > cameraX + SCREEN_W / 2) {
            cameraX = Math.floor(player.x - SCREEN_W / 2);
            // Limit right scrolling camera
            if (cameraX > (MAP_COLS * TILE_SIZE) - SCREEN_W) {
                cameraX = (MAP_COLS * TILE_SIZE) - SCREEN_W;
            }
        }

        // Fireballs logic
        for (let i = fireballs.length - 1; i >= 0; i--) {
            let f = fireballs[i];
            f.update();
            if (f.life <= 0) {
                fireballs.splice(i, 1);
            }
        }

        // Update items (Powerups)
        for (let i = items.length - 1; i >= 0; i--) {
            let item = items[i];
            item.update();

            // Collision item with player
            if (checkCollision(player, item)) {
                player.powerUp(item.type);
                items.splice(i, 1);
                continue;
            }
        }

        // Update enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            let e = enemies[i];
            e.update();

            if (e.dead && e.deadTimer <= 0) {
                enemies.splice(i, 1);
                continue;
            }

            if (!e.dead) {
                // Fireball stomp check
                for (let fi = fireballs.length - 1; fi >= 0; fi--) {
                    let fb = fireballs[fi];
                    if (checkCollision(e, fb)) {
                        e.dieByFire();
                        fireballs.splice(fi, 1);
                        break;
                    }
                }

                if (e.dead) continue;

                // Player interaction
                if (checkCollision(player, e)) {
                    // Check if player is falling down on enemy top (stomp)
                    if (player.vy > 0 && player.y + player.h - player.vy <= e.y + 4) {
                        e.stomp();
                        player.vy = -3.5; // bounce player
                    } else {
                        // Player takes damage
                        player.damage();
                    }
                }
            }
        }

        // Collect coins from tile overlaps
        let playerOverlaps = player.getTileOverlaps();
        playerOverlaps.forEach(tile => {
            if (tile.type === 10) { // Coin tile
                setTile(tile.row, tile.col, 0);
                audio.playCoin();
                coins++;
                score += 100;
                updateHUD();
            }
        });
    }

    // Update particles (always update)
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.update();
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    updateBumpedBlocks();
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w &&
           rect1.x + rect1.w > rect2.x &&
           rect1.y < rect2.y + rect2.h &&
           rect1.y + rect1.h > rect2.y;
}

function draw() {
    CTX.clearRect(0, 0, SCREEN_W, SCREEN_H);

    // Save context for camera translation
    CTX.save();
    CTX.translate(-cameraX, 0);

    // Draw background sky (solid NES color)
    CTX.fillStyle = (selectedWorld === '1-2') ? '#000000' : '#5c94fc';
    CTX.fillRect(cameraX, 0, SCREEN_W, SCREEN_H);

    // Draw tile grid
    let startCol = Math.floor(cameraX / TILE_SIZE);
    let endCol = Math.ceil((cameraX + SCREEN_W) / TILE_SIZE);

    for (let r = 0; r < MAP_ROWS; r++) {
        for (let c = startCol; c <= endCol; c++) {
            let type = getTile(r, c);
            if (type === 0) continue;

            let bx = c * TILE_SIZE;
            let by = r * TILE_SIZE;

            // Apply block bump animation displacement offset
            let bumped = bumpedBlocks.find(b => b.r === r && b.c === c);
            if (bumped) {
                by -= Math.sin(bumped.progress) * 5;
            }

            switch(type) {
                case 1: // Ground
                    drawSprite(CTX, 'tile_ground', bx, by);
                    break;
                case 2: // Brick
                    drawSprite(CTX, 'tile_brick', bx, by);
                    break;
                case 3: // Question coin
                case 4: // Question powerup
                    drawSprite(CTX, 'tile_question', bx, by);
                    break;
                case 5: // Used Block
                    drawSprite(CTX, 'tile_used', bx, by);
                    break;
                case 6: // Pipe Top Left
                    CTX.fillStyle = '#00a800';
                    CTX.fillRect(bx, by, TILE_SIZE, TILE_SIZE);
                    CTX.fillStyle = '#ffffff';
                    CTX.fillRect(bx + 2, by, 2, TILE_SIZE); // shiny highlights
                    CTX.strokeStyle = '#000000';
                    CTX.lineWidth = 1;
                    CTX.strokeRect(bx, by, TILE_SIZE, TILE_SIZE);
                    break;
                case 7: // Pipe Top Right
                    CTX.fillStyle = '#00a800';
                    CTX.fillRect(bx, by, TILE_SIZE, TILE_SIZE);
                    CTX.strokeStyle = '#000000';
                    CTX.lineWidth = 1;
                    CTX.strokeRect(bx, by, TILE_SIZE, TILE_SIZE);
                    break;
                case 8: // Pipe Body Left
                    CTX.fillStyle = '#008800';
                    CTX.fillRect(bx + 2, by, TILE_SIZE - 2, TILE_SIZE);
                    CTX.fillStyle = '#ffffff';
                    CTX.fillRect(bx + 4, by, 2, TILE_SIZE);
                    CTX.strokeStyle = '#000000';
                    CTX.lineWidth = 1;
                    CTX.strokeRect(bx + 2, by, TILE_SIZE - 2, TILE_SIZE);
                    break;
                case 9: // Pipe Body Right
                    CTX.fillStyle = '#008800';
                    CTX.fillRect(bx, by, TILE_SIZE - 2, TILE_SIZE);
                    CTX.strokeStyle = '#000000';
                    CTX.lineWidth = 1;
                    CTX.strokeRect(bx, by, TILE_SIZE - 2, TILE_SIZE);
                    break;
                case 10: // Coin floating
                    drawSprite(CTX, 'item_coin', bx, by);
                    break;
                case 11: // Flagpole green line
                    CTX.fillStyle = '#34c759';
                    CTX.fillRect(bx + 6, by, 4, TILE_SIZE);
                    // Draw pole knob at very top row
                    if (r === 2) {
                        CTX.fillStyle = '#ffcc00';
                        CTX.beginPath();
                        CTX.arc(bx + 8, by - 4, 6, 0, Math.PI*2);
                        CTX.fill();
                    }
                    // Simple white flag with green ball icon at top-middle of pole
                    if (r === 3) {
                        CTX.fillStyle = '#ffffff';
                        CTX.fillRect(bx - 12, by + 2, 18, 12);
                        CTX.fillStyle = '#00a800';
                        CTX.fillRect(bx - 6, by + 5, 6, 6);
                    }
                    break;
                case 12: // Castle blocks (solid brick gray/dark)
                    CTX.fillStyle = '#7a7a7a';
                    CTX.fillRect(bx, by, TILE_SIZE, TILE_SIZE);
                    CTX.strokeStyle = '#222222';
                    CTX.lineWidth = 1;
                    CTX.strokeRect(bx, by, TILE_SIZE, TILE_SIZE);
                    break;
            }
        }
    }

    // Draw Items
    items.forEach(item => item.draw(CTX));

    // Draw Enemies
    enemies.forEach(enemy => enemy.draw(CTX));

    // Draw Fireballs
    fireballs.forEach(fb => fb.draw(CTX));

    // Draw Player
    if (player) {
        player.draw(CTX);
    }

    // Draw Particles
    particles.forEach(p => p.draw(CTX));

    // Draw Warp Zone text in World 1-2
    if (selectedWorld === '1-2' && cameraX > 2000) {
        CTX.fillStyle = '#ffffff';
        CTX.font = "6px 'Press Start 2P'";
        CTX.fillText("WELCOME TO WARP ZONE !", 2250, 50);
        CTX.fillText("2", 2376, 134);
        CTX.fillText("3", 2472, 118);
        CTX.fillText("4", 2568, 134);
    }

    CTX.restore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// --- INPUT HANDLERS SETUP ---

window.addEventListener('keydown', e => {
    keys[e.code] = true;
    
    if (gameState === 'START') {
        if (e.code === 'ArrowDown' || e.code === 'KeyS' || e.code === 'ArrowUp' || e.code === 'KeyW') {
            audio.init();
            const direction = (e.code === 'ArrowDown' || e.code === 'KeyS') ? 1 : -1;
            const currentIndex = WORLD_ORDER.indexOf(selectedWorld);
            const nextIndex = (currentIndex + direction + WORLD_ORDER.length) % WORLD_ORDER.length;
            selectWorld(WORLD_ORDER[nextIndex]);
            audio.playJump();
        } else if (e.code === 'Digit1' || e.code === 'Numpad1') {
            audio.init();
            selectWorld('1-1');
            audio.playJump();
        } else if (e.code === 'Digit2' || e.code === 'Numpad2') {
            audio.init();
            selectWorld('1-2');
            audio.playJump();
        } else if (e.code === 'Digit3' || e.code === 'Numpad3') {
            audio.init();
            selectWorld('1-3');
            audio.playJump();
        }
    }
    
    // Prevent scrolling default browser action keys
    if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }
});

window.addEventListener('keyup', e => {
    keys[e.code] = false;
});

// VIRTUAL GAMEPAD SUPPORT FOR TOUCH
const virtualKeys = { left: false, right: false, down: false, jump: false, action: false };

function setupGamepad() {
    const bindTouch = (elemId, keyName) => {
        const btn = document.getElementById(elemId);
        if (!btn) return;
        
        btn.addEventListener('touchstart', e => {
            e.preventDefault();
            virtualKeys[keyName] = true;
        });
        
        btn.addEventListener('touchend', e => {
            e.preventDefault();
            virtualKeys[keyName] = false;
        });

        // Mouse fallbacks for testing console layouts
        btn.addEventListener('mousedown', () => { virtualKeys[keyName] = true; });
        btn.addEventListener('mouseup', () => { virtualKeys[keyName] = false; });
        btn.addEventListener('mouseleave', () => { virtualKeys[keyName] = false; });
    };

    bindTouch('btn-left', 'left');
    bindTouch('btn-right', 'right');
    bindTouch('btn-down', 'down');
    bindTouch('btn-a', 'jump');
    bindTouch('btn-b', 'action');
}

// UI Buttons Setup
document.getElementById('startBtn').addEventListener('click', () => {
    startGame();
});

document.getElementById('retryBtn').addEventListener('click', () => {
    startGame();
});

document.getElementById('clearBtn').addEventListener('click', () => {
    startGame();
});

function selectWorld(world) {
    selectedWorld = world;
    WORLD_ORDER.forEach(worldId => {
        const option = document.getElementById(`opt-${worldId.replace('-', '')}`);
        if (!option) return;
        const pointer = option.querySelector('.pointer');
        const isActive = worldId === world;
        option.classList.toggle('active', isActive);
        if (pointer) {
            pointer.style.visibility = isActive ? 'visible' : 'hidden';
        }
    });

    applyWorldTheme();
    
    cameraX = 0;
    loadLevels().then(() => {
        initLevel();
        player = new Player();
        enemies = [];
        spawnInitialEnemies();
        updateHUD();
    });
}

function setupStartScreenEvents() {
    WORLD_ORDER.forEach(worldId => {
        const option = document.getElementById(`opt-${worldId.replace('-', '')}`);
        if (!option) return;

        const selectOption = () => {
            audio.init();
            selectWorld(worldId);
            audio.playJump();
        };

        option.addEventListener('click', () => selectOption());
        option.addEventListener('touchstart', (e) => {
            e.preventDefault();
            selectOption();
        }, { passive: false });
    });
}

// Init Canvas Setup
CTX.scale(2, 2); // Scales logical 256x224 coordinates to visual 512x448
loadLevels().then(() => {
    initLevel();
    player = new Player();
    spawnInitialEnemies();
    updateHUD();
    setupGamepad();
    setupStartScreenEvents();
    gameLoop();
});
