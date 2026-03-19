export function init(context) {
    const style = document.createElement('style');
    style.textContent = `
        .menu_item_navbar_competitive,
        .main-navigation-menu-item[class*="Demacia"], 
        .main-navigation-menu-item[class*="Hỗn Loạn"] {
            display: none !important;
        }

        .rcp-fe-viewport-sidebar {
            background: rgba(1, 10, 19, 0.95) !important; 
            box-shadow: none !important;
        }
        
        .rcp-fe-lol-home {
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);

    const killVideos = () => {
        const videos = document.getElementsByTagName('video');
        if (videos.length === 0) return; 
        
        for (let i = videos.length - 1; i >= 0; i--) {
            const video = videos[i];
            video.pause();
            video.removeAttribute('src');
            video.load(); 
            video.remove(); 
        }
    };

    killVideos();

    const observer = new MutationObserver((mutations) => {
        let hasNewNodes = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                hasNewNodes = true;
                break;
            }
        }
        
        if (hasNewNodes) {
            killVideos();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
