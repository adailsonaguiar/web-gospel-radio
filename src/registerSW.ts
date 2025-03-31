export function registerSW() {
    window.addEventListener('load', () => {
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (){ console.log('Service Worker registred')})
            .catch(error => {console.warn('Error when register service worker' + error)})

            navigator.serviceWorker.ready.then(function(registration){
                console.log('Service Worker ready.')
                registration.update()
            })
        }
    })
}