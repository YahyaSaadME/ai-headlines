if (localStorage.getItem("headlinesai-extention") !== null) {
    document.getElementById("extention").style.display = "none"
}
document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('loader');
    var content = document.getElementById('content');
    loader.style.display = 'none';
    content.style.display = 'block';
});

if (!localStorage.getItem('headlinesai')) {
    localStorage.setItem('headlinesai', JSON.stringify([]))
}
let output = {
    platform: "youtube",
    toGenerate: "headline"
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
function reset() {
    localStorage.setItem("headlinesai", JSON.stringify([]))
    all()
}


function ViewOutput(i) {
    document.getElementById("output").innerHTML = ""
    const data = JSON.parse(localStorage.getItem("headlinesai"))
    const output = data[Number(i)]
    if (output) {
        if (output.GeneratedFor == "headline" || output.GeneratedFor == "hash tags") {
            output.output.map(async (e, i) => {
                if (output.output[i + 1]) {
                    document.getElementById("output").innerHTML += `

                            <li onclick='copy("${i}")'
                            class="text-white px-4 mt-4 flex justify-between items-center hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md">
                            <span id="result-${i}">${output.output[i + 1]}</span>
                            <div style="width:20px;height:20px;">
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
                                </div>
                        </li>


                            `
                }
            })

        } else {
            document.getElementById("output").innerHTML = `
        <li onclick='copy("${i}")'
                            class="group text-white px-4 mt-4 flex justify-between hover:text-black cursor-pointer hover:bg-white py-2 rounded-md border-2 border-gray-200 border-dashed">
                            <span id="result-${i}">${output.output}</span>
                            <div style="width:20px;height:20px;">
                            <svg id="copy-bef-${i}" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                class="bi bi-clipboard2 group-hover:text-gray-900" style="width:30px;height:20px" viewBox="0 0 16 16">
                                <path
                                    d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
                                <path
                                    d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                            </svg>
                            <svg id="copy-aft-${i}" style="display:none;width:30px;height:20px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-clipboard2-check-fill group-hover:text-gray-900" viewBox="0 0 16 16">
                                    <path
                                        d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                    <path
                                        d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                </svg>
                                </div>
                        </li>`
        }
    }

}

function removeData(id) {
    var data = JSON.parse(localStorage.getItem("headlinesai"))
    data.splice(id, 1)
    localStorage.setItem("headlinesai", JSON.stringify(data))
    all()
}

function all() {
    document.getElementById("inputs").innerHTML = ""
    const data = JSON.parse(localStorage.getItem("headlinesai"))
    if (data.length == 0) {
        document.getElementById("inputs").innerHTML = `
        <li data-tooltip-target="tooltip-spinner1"
        class="text-white px-4 my-4 hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md border-2 border-gray-200 border-dashed">
        <span>Nothing to display here.</span>
        <div id="tooltip-spinner1" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 pb-3 text-sm font-medium text-black transition-opacity duration-300 bg-white rounded-lg shadow-sm opacity-0 tooltip">
            Go to dashboard and gennerate.
        </div>
    </li>
`
    } else {

        data.map((output, i) => {
            document.getElementById("inputs").innerHTML += `
                             <li onclick="ViewOutput('${i}')" class="text-white px-4 mt-4 flex justify-between items-center hover:text-gray-900 cursor-pointer hover:bg-white py-2 rounded-md">
                            <span>${output.title}</span>
                            <svg onclick="removeData('${i}')" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                class="bi bi-trash3-fill group-hover:text-gray-900" style="width:30px;height:20px" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                            </li>
        `
        })
    }

}

all()