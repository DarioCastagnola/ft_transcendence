// export default () => /*html*/`
//     <h1>About</h1>
//     <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
// `;

export default function about() {
    // HTML content
    const html = `
    <h1>About</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    `;
    
    // Execute page-specific JavaScript here
    setTimeout(() => {
        console.log("This runs only on the About page!");
        // Page-specific script can go here, e.g., event listeners, animations, etc.
    }, 0);
    
    return html;
}