document.getElementById("spinner").style.display = "none";
document.getElementById("alert").style.display = "none";

if (!localStorage.getItem('headlinesai')) {
    localStorage.setItem('headlinesai', JSON.stringify([]))
}
let output = {
    platform: "youtube",
    toGenerate: "headline"
}
function platform(data) {
    document.getElementById("youtube").classList.remove("border-2")
    document.getElementById("reddit").classList.remove("border-2")
    document.getElementById("medium").classList.remove("border-2")
    document.getElementById("blog").classList.remove("border-2")
    document.getElementById("indie").classList.remove("border-2")
    document.getElementById(data).classList.add("border-2", "border-gray-200", "border-dashed")
    output.platform = data
    if (data == "youtube") {
        document.getElementById("decription").style.display = null
        document.getElementById("hashtags").style.display = null
        document.getElementById("cta").style.display = "none"
    } else {
        document.getElementById("decription").style.display = "none"
        document.getElementById("hashtags").style.display = "none"
        document.getElementById("cta").style.display = null
    }
}

function toGenerate(data) {
    document.getElementById("headline").classList.remove("border-2")
    document.getElementById("cta").classList.remove("border-2")
    document.getElementById("hashtags").classList.remove("border-2")
    document.getElementById("decription").classList.remove("border-2")
    document.getElementById(data == "hash tags" ? "hashtags" : data).classList.add("border-2", "border-gray-200", "border-dashed")
    output.toGenerate = data
}

async function copy(id) {
    document.getElementById(`copy-bef-${id}`).style.display = "none"
    document.getElementById(`copy-aft-${id}`).style.display = null
    const text = document.getElementById(`result-${id}`).innerText
    await navigator.clipboard.writeText(text)
    setTimeout(() => {
        document.getElementById(`copy-aft-${id}`).style.display = "none"
        document.getElementById(`copy-bef-${id}`).style.display = null
    }, 2000);
}
function disableAlert() {
    document.getElementById("alert").style.display = "none";
}
function alert(msg) {
    document.getElementById("alert").style.display = null;
    document.getElementById("alert").innerHTML = `<div class="flex justify-between items-center">
    <div class="flex justify-between items-center bg-gray-100 px-3 py-2 pb-3 rounded-md text-red-900">
        <span style="margin-right: 10px;">
            ${msg}
        </span>
       <svg onclick="disableAlert()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-x-circle mt-1 cursor-pointer" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
    </div>
</div>`;
    document.getElementById("spinner").style.display = "none";
    document.getElementById("generate").style.display = null;
    document.getElementById("output").innerHTML = `
    <li data-tooltip-target="tooltip-spinner"
                            class="text-white px-4 my-4 hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md border-2 border-gray-200 border-dashed">
                            <span>Nothing to show.</span>
                            <div id="tooltip-spinner" role="tooltip"
                                class="absolute z-10 invisible inline-block px-3 py-2 pb-3 text-sm font-medium text-black transition-opacity duration-300 bg-white rounded-lg shadow-sm opacity-0 tooltip">
                                select options and click on generate.
                            </div>
                        </li>`

}
function reset() {
    document.getElementById("alert").style.display = "none";
    document.getElementById("spinner").style.display = "none";
    document.getElementById("generate").style.display = null;
    document.getElementById("text").value = ""
    platform("youtube")
    toGenerate("headline")
    document.getElementById("output").innerHTML = `
    <li data-tooltip-target="tooltip-spinner"
                            class="text-white px-4 my-4 hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md border-2 border-gray-200 border-dashed">
                            <span>Nothing to show.</span>
                            <div id="tooltip-spinner" role="tooltip"
                                class="absolute z-10 invisible inline-block px-3 py-2 pb-3 text-sm font-medium text-black transition-opacity duration-300 bg-white rounded-lg shadow-sm opacity-0 tooltip">
                                select options and click on generate.
                            </div>
                        </li>
    `

}


function decodeAndFormatText(input) {
    const lines = input.split('\n').map(line => line.trim());
    let result = '';
    lines.forEach(line => {
        if (line.startsWith('##')) {
            // Format as a heading
            result += `<h2 class="text-2xl font-bold mb-2 text-white group-hover:text-gray-900">${line.slice(3)}</h2>`;
        } else if (line.startsWith('* **')) {
            // Format as a list item
            result += `<p class="list-disc ml-5 text-white group-hover:text-gray-900"><strong>${line.slice(5, -2)}</strong></p>`;
        } else if (line.startsWith('**')) {
            // Format as bold text
            result += `<p class="font-bold mb-2 text-white group-hover:text-gray-900">${line.slice(2, -2)}</p>`;
        } else {
            // Format as a regular paragraph
            result += `<p class="mb-2 text-white group-hover:text-gray-900">${line}</p>`;
        }
    });
    document.getElementById("output").innerHTML = `
                        <li onclick='copy("res")'
                            class="group px-4 mt-4 mb-4 flex justify-between text-white hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md border-2 border-gray-200 border-dashed">
                            <div id="result-res">${result}</div>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            id="copy-bef-res"    
                            class="bi bi-clipboard2 ml-4 text-" viewBox="0 0 16 16">
                                <path
                                    d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
                                <path
                                    d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="currentColor"
                            id="copy-aft-res" style="display:none;"        
                            class="bi bi-clipboard2-check-fill ml-4" viewBox="0 0 16 16">
                                    <path
                                        d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                    <path
                                        d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                </svg>
                        </li>
    
    `
    return String(result)
}


function generate() {
    document.getElementById("spinner").style.display = null;
    document.getElementById("generate").style.display = "none";
    document.getElementById("output").innerHTML = ""
    const text = document.getElementById("text").value
    if (text.length !== 0) {
        fetch("/generate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, platform: output.platform, toGenerate: output.toGenerate })
        }).then(res => {
            return res.json()
        }).then(({ res }) => {
            if (res !== "Something went wrong!") {
                let store = { title: text, output: [], GeneratedFor: output.toGenerate, platform: output.platform }
                if (output.toGenerate == "headline" || output.toGenerate == "hash tags") {
                    res = String(res).split("**")
                    res.map(async (e, i) => {
                        try {
                            if (e.match(/\d+\./g)) {
                                if (res[i + 1]) {
                                    store.output.push(res[i + 1])
                                    document.getElementById("output").innerHTML += `
                            
                            <li onclick='copy("${i}")'
                            class="text-white px-4 mt-4 flex justify-between items-center hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md">
                            <span id="result-${i}">${res[i + 1]}</span>
                            <svg id="copy-bef-${i}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-clipboard2" viewBox="0 0 16 16">
                                <path
                                    d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
                                <path
                                    d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                            </svg>
                            <svg id="copy-aft-${i}" style="display:none;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                    <path
                                        d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                </svg>
                        </li>
                            
                            
                            `
                                }
                            }

                        }
                        catch (error) { alert("Something went wrong!") }
                    })

                }
                else {
                    store.output.push(decodeAndFormatText(res))
                }
                let storePush = JSON.parse(localStorage.getItem('headlinesai'))
                storePush.push(store)
                localStorage.setItem('headlinesai', JSON.stringify(storePush))
                document.getElementById("spinner").style.display = "none";
                document.getElementById("generate").style.display = null;
            }
            else { alert("Something went wrong!") }
        }).catch(e => alert("Something went wrong!"))

    } else { alert("Please type the relavent content to generate.") }
}
