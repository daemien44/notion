:root {
    --bg-color: #F3E5F5;
    --card-bg: #FFFFFF;
    --text-color: #4A148C;
    --bunny-color: #EEEEEE;
    --bunny-shadow: #BDBDBD;
    --ear-pink: #F8BBD0;
    --accent-color: #AB47BC;
    --break-color: #EF5350;
    --shadow-color: #212121;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: transparent;
    font-family: 'Nunito', sans-serif;
    color: var(--text-color);
    user-select: none;
}

#widget {
    width: 280px;
    background: var(--bg-color);
    border: 3px solid var(--shadow-color);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 8px 8px 0 var(--shadow-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    box-sizing: border-box;
}

.hidden { display: none !important; }

/* SETUP LAYER */
#setup-layer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
}
.setup-title { margin: 0; font-family: 'Fredoka One', cursive; font-size: 20px; }
input[type="text"] {
    width: 100%; padding: 12px;
    border: 3px solid var(--shadow-color); border-radius: 10px;
    font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 16px;
    text-align: center; box-sizing: border-box;
}
input:focus { outline: none; background: #fff; }

/* ACTIVE LAYER */
#active-layer { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 15px; }

.goal-header {
    width: 100%; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 2px dashed #BDBDBD; padding-bottom: 5px;
}
#display-goal { font-weight: 800; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; color: #7B1FA2; }
.btn-reset { background: none; border: none; font-size: 10px; text-decoration: underline; cursor: pointer; color: #e74c3c; font-weight: bold; }

/* BUNNY ART */
.stage { width: 140px; height: 120px; position: relative; margin-top: 20px; }

.head {
    width: 100px; height: 90px;
    background: var(--bunny-color);
    border: 3px solid var(--shadow-color);
    border-radius: 50% 50% 40% 40%;
    position: absolute; bottom: 0; left: 20px;
    z-index: 10;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ear {
    width: 25px; height: 70px;
    background: var(--bunny-color);
    border: 3px solid var(--shadow-color);
    border-radius: 20px 20px 0 0;
    position: absolute; top: -50px; z-index: 1; overflow: hidden;
}
.ear::after {
    content: ''; position: absolute; top: 10px; left: 5px;
    width: 15px; height: 50px; background: var(--ear-pink);
    border-radius: 15px 15px 0 0; opacity: 0.8;
}
.ear.left { left: 25px; transform: rotate(-10deg); transform-origin: bottom; }
.ear.right { right: 25px; transform: rotate(10deg); transform-origin: bottom; }

.eyes { position: absolute; top: 35px; left: 50%; transform: translateX(-50%); width: 60px; height: 20px; display: flex; justify-content: space-between; }
.eye { width: 12px; height: 12px; background: var(--shadow-color); border-radius: 50%; position: relative; overflow: hidden; transition: all 0.3s; }
.eyelid { position: absolute; top: -5px; left: -2px; width: 16px; height: 16px; background: var(--bunny-color); transition: transform 0.3s; transform-origin: top; transform: scaleY(0); }

.nose { width: 10px; height: 8px; background: pink; border-radius: 50%; position: absolute; top: 55px; left: 45px; }
.mouth { width: 20px; height: 10px; border-bottom: 2px solid var(--shadow-color); border-radius: 50%; position: absolute; top: 60px; left: 40px; transition: all 0.3s; }
.teeth { position: absolute; top: 72px; left: 46px; width: 8px; height: 6px; background: #fff; border: 1px solid #ccc; display: none; }

.whiskers { position: absolute; top: 58px; width: 100%; pointer-events: none; }
.whisker { width: 30px; height: 2px; background: #ccc; position: absolute; }
.w-left { left: -10px; transform: rotate(5deg); }
.w-right { right: -10px; transform: rotate(-5deg); }
.w-left-2 { left: -10px; top: 8px; transform: rotate(-5deg); }
.w-right-2 { right: -10px; top: 8px; transform: rotate(5deg); }

/* MOODS */
.mood-bored .eyelid { transform: scaleY(0.65); }
.mood-bored .mouth { width: 10px; height: 2px; border: none; background: #000; top: 65px; left: 45px; }
.mood-bored .ear.left { transform: rotate(-25deg); } 
.mood-bored .ear.right { transform: rotate(25deg); }

.mood-sus .eye.left .eyelid { transform: scaleY(0.2); } 
.mood-sus .eye.right .eyelid { transform: scaleY(0); }
.mood-sus .mouth { width: 12px; height: 2px; border: none; background: #000; transform: rotate(-10deg); top: 64px;}
.mood-sus .ear.left { transform: rotate(0deg); }

.mood-happy .eye { height: 14px; width: 14px; }
.mood-happy .mouth { border-bottom: 4px solid #000; height: 12px; width: 24px; left: 38px; }
.mood-happy .teeth { display: block; }
.mood-happy .ear { top: -55px; } 

.mood-shocked .eye { height: 16px; width: 16px; background: #fff; border: 4px solid #000; }
.mood-shocked .mouth { width: 10px; height: 10px; border-radius: 50%; background: #000; border: none; top: 65px; left: 45px; }

.mood-love .eye { background: transparent; border-radius: 0; width: 16px; height: 16px; }
.mood-love .eye::before, .mood-love .eye::after { content: ''; position: absolute; width: 8px; height: 13px; background: #E91E63; border-radius: 50px 50px 0 0; }
.mood-love .eye::before { left: 8px; transform: rotate(-45deg); transform-origin: 0 100%; }
.mood-love .eye::after { left: 0; transform: rotate(45deg); transform-origin: 100% 100%; }

.mood-angry .eye { height: 4px; width: 15px; border-radius: 0; transform: rotate(20deg); background: #000;}
.mood-angry .eye.right { transform: rotate(-20deg); }
.mood-angry .mouth { width: 16px; height: 8px; background: #000; border-radius: 10px 10px 0 0; top: 64px; left: 42px;}
.mood-angry .ear { transform: rotate(45deg); top: -40px; }

/* UI */
.speech-bubble {
    background: var(--shadow-color); color: #fff;
    padding: 10px 15px; border-radius: 12px;
    font-size: 13px; font-weight: 700; text-align: center;
    position: relative; min-height: 40px; width: 100%;
    display: flex; align-items: center; justify-content: center;
    box-sizing: border-box;
}
.speech-bubble::after {
    content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
    border-width: 8px 8px 0; border-style: solid; border-color: var(--shadow-color) transparent;
}

.streak-container { text-align: center; }
.streak-num { font-family: 'Fredoka One', cursive; font-size: 48px; line-height: 1; color: var(--text-color); }
.streak-label { font-size: 12px; font-weight: 800; color: #9E9E9E; letter-spacing: 1px; }

/* BUTTONS */
.controls { width: 100%; display: flex; flex-direction: column; gap: 8px; }

.btn-main {
    width: 100%; background: var(--accent-color); color: #fff;
    border: 3px solid var(--shadow-color); border-radius: 12px;
    padding: 12px; font-family: 'Fredoka One', cursive; font-size: 18px;
    cursor: pointer; box-shadow: 4px 4px 0 var(--shadow-color);
    transition: transform 0.1s, box-shadow 0.1s;
    box-sizing: border-box;
}
.btn-main:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--shadow-color); }

.btn-break {
    width: 100%; background: var(--break-color); color: white;
    border: 3px solid var(--shadow-color); border-radius: 12px;
    padding: 10px; font-family: 'Fredoka One', cursive; font-size: 14px;
    cursor: pointer; box-shadow: 4px 4px 0 var(--shadow-color);
    box-sizing: border-box;
}
.btn-break:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--shadow-color); }

/* ANIMATIONS */
@keyframes jump-flip { 
    0% { transform: scale(1) translateY(0) rotate(0); }
    40% { transform: scale(0.9) translateY(10px); }
    50% { transform: scale(1.2) translateY(-30px) rotate(180deg); }
    100% { transform: scale(1) translateY(0) rotate(360deg); }
}
.anim-flip { animation: jump-flip 0.6s ease; }

@keyframes wiggle { 
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
}
.anim-wiggle { animation: wiggle 0.3s ease infinite; }

@keyframes zoom-pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); }
    100% { transform: scale(1); }
}
.anim-pop { animation: zoom-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

.anim-shake { animation: shake 0.4s ease-in-out; }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
