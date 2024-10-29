import "../components/counter.js";

export default function home() {
    const html = `
        <h1>Home</h1>
        <p>Simple click counter</p>
        <click-counter></click-counter>
        `;
    return html;
}
