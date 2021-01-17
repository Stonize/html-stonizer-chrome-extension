// const overlayScript = `
function blockchainOverlayOff() {
    console.log("Turn off overlay")
    document.getElementById("blockchain_overlay_id").style.display = "none";
}

const overlayDiv = `
<div onclick="blockchainOverlayOff()">  
  	<img width="100%" height="100%" src="https://i.pinimg.com/originals/7e/a3/36/7ea33694179a3fcbf7dbbf5850336e83.gif"/>
</div>
`

const overlayLoadingDiv = `
<div>  
  	<img width="100%" height="100%" src="https://media0.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif"/>
</div>
`

document.addEventListener("DOMContentLoaded", () => {
    var url = window.location.href

    var loadingDiv = document.createElement("div");
    loadingDiv.id = 'blockchain_overlay_loading_id';
    loadingDiv.innerHTML = overlayLoadingDiv;
    document.body.appendChild(loadingDiv);

    fetch('https://html-stonizer.stonize.com/verify', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: url
        })
    }).then(r => r.json()).then(result => {
        if (result.status && result.status == 200) {
            loadingDiv.parentNode.removeChild(loadingDiv)

            var div = document.createElement("div");
            div.id = 'blockchain_overlay_id';
            div.innerHTML = overlayDiv;
            document.body.appendChild(div);
        }
        else {
            loadingDiv.parentNode.removeChild(loadingDiv)
            console.log(result)
        }
    }).catch(function (error) {
        loadingDiv.parentNode.removeChild(loadingDiv)
        console.log(error)
    })
});
