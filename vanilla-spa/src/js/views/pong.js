export default function pong() {
    const html = `
    <div class="board">
        <div class="divider-container">
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
            <div class="divider"></div>
        </div>
        <div class='ball'></div>
        <div class="paddle_1 paddle"></div>
        <div class="paddle_2 paddle"></div>
        <h1 class="player_1_score">0</h1>
        <h1 class="player_2_score">0</h1>
        <h1 class="message">
            Press Enter to Play Pong
        </h1>
    </div>
    `;
    setTimeout(() => {}, 0);
    return html;
}